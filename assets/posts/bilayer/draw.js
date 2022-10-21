let height = 300;
let width = document.getElementById("bilayer").clientWidth;
width = 740;

let svg = d3.select("#bilayer")
  .attr("width", "100%")
  .attr("viewBox", "0 0 740 300")
  .attr("preserveAspectRatio", "xMidYMid meet");

let xax = d3.scaleLinear()
  .range([0, width])
  .domain([-3, 3]);

let yax = d3.scaleLinear()
  .range([height, 0])
  .domain([-20000, 0]);

let a;
d3.csv("/assets/posts/bilayer/output/coupled_potentials_tensor.csv", function(d) {
    temp = {
        x: Object.keys(d).map(parseFloat),
        y: Object.values(d).map(parseFloat)
    };
    return temp.x.map( (d, i) => [d, temp.y[i]]);
})
  .then( function(d) {
      a = d;
      drawPotentials(a);
  });


let linegen = d3.line()
    .x(d => xax(d[0]))
    .y(d => yax(d[1]));

function drawPotentials(lines) {
    svg.append("g")
      .attr("id", "curves")
      .selectAll("path")
      .data(lines)
      .join("path")
        .attr("d", d => linegen(d) )
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("fill", "none");
}
