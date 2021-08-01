---
layout: post
title: "Maxwell's demon"
category: tutorial
excerpt: ""
---

<script src="/assets/d3.v7.min.js"></script>

<style>
    #boxContainerContainer {
        width: 100%;
    }
    #boxContainer {
        width: calc(100vw - 50px);
        position: sticky;
        position: -webkit-sticky;
        top: 20px;
        margin-left: calc(50% - 50vw + 25px);
        z-index: 1;
    }
</style>

<div id = "boxContainerContainer">
    <div id = "boxContainer">
        <svg id = "maxwellbox"></svg> 
    </div>
</div>

<script>
    let width = parseInt(d3.select('#boxContainer').style('width'));
    let height = 500;
    let boxMargin = 0;
    let svg = d3.select("#maxwellbox")
        .attr("width", width)
        .attr("height", height);

    let partitionVelocity = 0.4;

    class Ball {
        constructor(pos, vel) {
            this.pos = [pos[0] * (Math.random()), pos[1] * Math.random()];
            this.vel = [0, 0];
            this.dt = 10;
            this.collided = false;
            this.partition = (Math.random() < 0.5 ? "left" : "right")
            if (this.partition == "left") {
                this.vel = [0.5*Math.random() - 0.25, 0.5*Math.random() - 0.25];
            }
            else {
                this.vel = [Math.random() - 0.5, Math.random() - 0.5];
            }
            this.speed = Math.sqrt(this.vel[0]**2 + this.vel[1]**2);
        }
        makestep() {
            collide(this.pos, this.vel);
            this.pos[0] += this.dt * this.vel[0];
            this.pos[1] += this.dt * this.vel[1];
        }
    }

    class Partition {
        constructor(parent) {
            this.points = [...Array(100).keys()].map( d => [width/2, d*height/99] );
            this.links = this.points.slice(0, this.points.length - 1).map( (d, i) => ({"coords": [d, this.points[i + 1]], "active": true }) );
            this.parent = parent;
            this.group = parent.append("g");
            this.open = false;
            this.transitioning = false;
            this.passingBallIndex = 0;
        }
        drawPartition(mballs) {
            this.operateDoor(mballs);
            this.group.selectAll("path")
                .data(this.links.filter( d => d.active ))
                .join(
                    enter => enter.append("path")
                        .attr("d", d => d3.line()(d.coords))
                        .attr("fill", "none")
                        .attr("stroke", "black")
                        .attr("stroke-width", 5),
                    update => update.attr("d", d => d3.line()(d.coords)),
                    exit => exit.remove()
                );
        }
        checkCollision(pos, vel) {
            // Select active links, pick first link coordinate, then calculate the shortest distance to pos.
            let dist = d3.min( this.links.filter( d => d.active ).map( d => d.coords[0]).map( d => Math.sqrt( (pos[0] - d[0])**2 + (pos[1] - d[1])**2 ) ) ) 
            let whichSide = Math.sign(pos[0] - width/2);
            if ( (dist < 10) && ( (vel[0] > 0 && whichSide < 0) || (vel[0] < 0 && whichSide > 0) )) {
                return true;
            }
            else {
                return false;
            }
        }
        operateDoor(balls) {
            if (!this.open) {
                for (let i = 0; i < balls.length; i++) {
                    if ( ( Math.abs(balls[i].pos[0] - width/2) < 10) && (( balls[i].vel[0] > 0 && balls[i].pos[0] < width/2 && balls[i].partition == "right") || ( balls[i].vel[0] < 0 && balls[i].pos[0] > width/2 && balls[i].partition == "left" ) ) ) {
                        this.passingBallIndex = i;
                        for (let j = 0; j < this.links.length; j++) {
                            if ( Math.sqrt( (this.links[j].coords[0][0] - balls[i].pos[0])**2 + (this.links[j].coords[0][1] - balls[i].pos[1])**2 ) < 50) {
                                this.links[j].active = false;
                            }
                        }
                        this.open = true;
                        break;
                    }
                }
            }
            else {
                for (let j = 0; j < this.links.length; j++) {
                    if ( Math.sqrt( (this.links[j].coords[0][0] - balls[this.passingBallIndex].pos[0])**2 + (this.links[j].coords[0][1] - balls[this.passingBallIndex].pos[1])**2 ) > 50) {
                        this.links[j].active = true;
                    }
                }
                (this.links.map( d => d.active).filter( d => !d ).length == 0) ? (this.open = false) : null;
            }
        }
    }

    let mballs = [];
    for (let i = 0; i < 50; i++){
        mballs.push( new Ball([width, height], [Math.random() - 0.5, Math.random() - 0.5]) );
    }

    let wall = drawWall(svg);
    let partition = new Partition(svg);
    partition.drawPartition(mballs)

    let ballgroup = svg.append("g");
    drawBalls(mballs, ballgroup);

    d3.interval( 
        function() {
            drawBalls(mballs, ballgroup);
            partition.drawPartition(mballs);
        }, 16 );

    function drawBalls(balls, ballgroup) {
        ballgroup.selectAll("circle")
            .data(balls)
            .join(
                enter => enter.append("circle")
                    .attr("cx", d => d.pos[0])
                    .attr("cy", d => d.pos[1])
                    .attr("r", 12)
                    .attr("fill", d => (d.partition == "left") ? "blue" : "red"),
                update => update.attr("cx", d => d.pos[0])
                    .attr("cy", d => d.pos[1]),
                exit => exit.remove()
            );
        balls.forEach(d => d.makestep());
    }

    function drawWall(svg) {
        let wallWidth = 10;
        let wall = svg.append("g")
            .append("rect")
            .attr("width", width)
            .attr("height", height)
            .attr("fill", "#cedff2")
            .attr("stroke", "black")
            .attr("stroke-width", wallWidth);
        return wall
    }

    function collide(pos, vel) {
        if ( ((pos[0] <= boxMargin) && vel[0] < 0) || ((pos[0] >= (width - boxMargin) && vel[0] > 0)) || partition.checkCollision(pos, vel) ) {
            vel[0] *= -1;
        }
        if ( ((pos[1] <= boxMargin) && vel[1] < 0 ) || ((pos[1] >= height - boxMargin) && (vel[1] > 0) ) ) {
            vel[1] *= -1;
        }
    }

</script>>