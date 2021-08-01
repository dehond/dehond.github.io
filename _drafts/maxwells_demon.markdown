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
                this.vel = [0.3*Math.random() - 0.15, 0.3*Math.random() - 0.15];
            }
            else {
                this.vel = [1.5*Math.random() - 0.75, 1.5*Math.random() - 0.75];
            }
        }
        makestep() {
            collide(this.pos, this.vel);
            this.pos[0] += this.dt * this.vel[0];
            this.pos[1] += this.dt * this.vel[1];
        }
    }

    function collide(pos, vel) {
        if ( ((pos[0] <= boxMargin) && vel[0] < 0) || ((pos[0] >= (width - boxMargin) && vel[0] > 0)) || partitionCollide(pos, vel, partitionPoints) ) {
            vel[0] *= -1;
        }
        if ( ((pos[1] <= boxMargin) && vel[1] < 0 ) || ((pos[1] >= height - boxMargin) && (vel[1] > 0) ) ) {
            vel[1] *= -1;
        }
    }

    let mballs = [];
    for (let i = 0; i < 100; i++){
        mballs.push( new Ball([width, height], [Math.random() - 0.5, Math.random() - 0.5]) );
    }

    let wall = drawWall(svg);

    let partitionUpper = [...Array(55).keys()].map(d => [width/2, d*0.6875*height/54]);
    let partitionLower = [...Array(25).keys()].map(d=> [width/2, 0.6875*height + d*0.3125*height/24])
    let partitionPoints = [partitionUpper, partitionLower];
    let partition = svg.append("g");
    let partitionOpen = false;
    let partitionTransition = false;
    let timeSpentOpenOrg = 25;
    let timeSpentOpen = timeSpentOpenOrg;

    drawPartition(partition, partitionPoints);

    let ballgroup = svg.append("g");
    drawBalls(mballs, ballgroup);

    d3.interval( 
        function() {
            drawBalls(mballs, ballgroup);
            if (openDoor(mballs) && !partitionTransition) {
                partitionTransition = true;
            }
            drawPartition(partition, partitionPoints);
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

    function drawPartition(partition, partitionPoints) {
        partition.selectAll("path")
            .data(partitionPoints)
            .join(
                enter => enter.append("path")
                    .attr("d", d3.line())
                    .attr("fill", "none")
                    .attr("stroke", "black")
                    .attr("stroke-width", 5),
                update => update.attr("d", d3.line()),
                exit => exit.remove()
            );
        if (!partitionOpen && partitionTransition) {
            timeSpentOpen = timeSpentOpenOrg;
            if (partitionPoints[0].length > 25) {
                partitionPoints[0].pop();
                partitionPoints[0].pop();
                partitionPoints[0].pop();
                partitionPoints[0].pop();
            }
            else {
                partitionTransition = true;
                partitionOpen = true;
            }
        }
        else if (timeSpentOpen > 0) {
            timeSpentOpen += -1;
        }
        else if (partitionOpen && partitionTransition) {
            let ptslen = partitionPoints[0].length;
            if (ptslen < 80) {
                partitionPoints[0].push( [ partitionPoints[0][ptslen - 2][0], partitionPoints[0][ptslen - 2][1] + height/20 ] );
                partitionPoints[0].push( [ partitionPoints[0][ptslen - 2][0], partitionPoints[0][ptslen - 2][1] + height/20 ] );
                partitionPoints[0].push( [ partitionPoints[0][ptslen - 2][0], partitionPoints[0][ptslen - 2][1] + height/20 ] );
                partitionPoints[0].push( [ partitionPoints[0][ptslen - 2][0], partitionPoints[0][ptslen - 2][1] + height/20 ] );
                partitionPoints[0].push( [ partitionPoints[0][ptslen - 2][0], partitionPoints[0][ptslen - 2][1] + height/20 ] );
            }
            else {
                partitionTransition = false;
                partitionOpen = false;
            }
        }
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

    function partitionCollide(pos, vel, partitionPoints) {
        let dist = d3.min( partitionPoints.flat().map( d => Math.sqrt( (pos[0] - d[0])**2 + (pos[1] - d[1])**2 ) ) );
        let whichSide = Math.sign(pos[0] - partitionPoints[0][0][0]);
        if ( (dist < 10) && ( (vel[0] > 0 && whichSide < 0) || (vel[0] < 0 && whichSide > 0) )) {
            return true;
        }
        else {
            return false;
        }
    }

    function openDoor(balls) {
        // Check if any ball that needs to transition is close to the center
        let answer = false;
        for (let i = 0; i < balls.length; i++) {
            if ( Math.abs( balls[i].pos[0] - width/2 ) < 20 && Math.abs( balls[i].pos[1] - height/2 ) < 100 && Math.abs(balls[i].vel[0]) > Math.abs(balls[i].vel[1]) ) {
            //if ( Math.sqrt( (balls[i].pos[0] - width/2)**2 + (balls[i].pos[1] - height/2)**2 ) < 100 ) {
                if (balls[i].partition == "left" && balls[i].pos[0] > width/2) {
                    answer = true;
                }
                else if (balls[i].partition == "right" && balls[i].pos[1] < width/2) {
                    answer = true;
                }
            }
        }
        return answer
    }

    let reducer = (accumulator, currentValue) => accumulator + currentValue;
    console.log(mballs.map(d => (d.partition == "right" ? 1 : -1)).reduce(reducer));

</script>>