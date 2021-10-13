drawHeadAnim();

function drawHeadAnim() {
    let width = parseInt(d3.select('#headerContainer').style('width'));
    let height = 300;
    let svg = d3.select("#headerAnim")
    svg.attr("width", width)
        .attr("height", height);

    let mballs = [];
    for (let i = 0; i < 100; i++){
        mballs.push( new Ball([width, height], [(Math.random() - 0.5)/10, (Math.random() - 0.5)/10]) );
        mballs.hasPartition = false;
    }
    
    drawWall(svg);
    let ballgroup = svg.append("g");
    drawBalls(mballs, ballgroup);

    ballgroup.selectAll("circle")
            .attr("fill", d => speedscale( d.speed*10 )),

    d3.interval( 
        function() {
            drawBalls(mballs, ballgroup);
        }, 16 );
}