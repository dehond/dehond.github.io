let height2 = 400;
let svg2 = d3.select("#svg2")
  .attr("width", width)
  .attr("height", height2);
  
let plotbox = svg2.append("g");
let left = 100, right = 80, top_sp = 20, bottom = 70;

let xax2 = d3.scaleLinear()
  .domain([0, 0.5])
  .range([left, width - right]);
//Axis for using interpolator to plot dynamic indicator
let xax3 = d3.scaleLinear()
  .domain([0, 0.5])
  .range([0, 1]);
let tscale = d3.scaleLinear()
  .domain([0, 1])
  .range([0.5, 0]);
  
let yax2 = d3.scaleLinear()
  .domain([0.0, 0.7])
          .range([height2 - bottom, top_sp]);
  
let parsedat = [];
let plotdatInterpolator = [];
d3.csv("/assets/posts/sf-to-mi/var_n_vs_t.csv")
  .then(
    function(d){
      svg2.append("clipPath")
        .attr("id", "innerAxes")
        .append("rect")
        .attr("transform", `translate(${left}, ${top_sp})`)
        .attr("width", width - left - right)
        .attr("height", height2 - top_sp - bottom)
    
      //Convert strings to numbers
      parsedat = d.map(d => {return {u: +d.u, stdn: +d.stdn}});
      let plotline = d3.line()
        .x(d => xax2(d.u))
        .y(d => yax2(d.stdn))
        .curve(d3.curveBasis)
        (parsedat)
      plotdatInterpolator = d3.interpolateBasis(parsedat.map(d => d.stdn))

      svg2.append("path")
        .attr("d", plotline)
        .attr("stroke-width", 3)
        .attr("stroke", "black")
        .attr("fill", "none")
        .attr("clip-path", "url(#innerAxes)")

      svg2.append("circle")
        .attr("id", "dynamicIndicator")
        .attr("r", 10)
        .attr("fill", "#636363")
        .attr("stroke-width", 4)
        .attr("stroke", "black")
        .attr("clip-path", "url(#innerAxes)");
      updateMarker(initDepth);

      let xax_draw = d3.axisBottom()
        .scale(xax2)
        .ticks(6);
      svg2.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${height2 - bottom})`)
        .call(xax_draw);

      svg2.append("text")
        .text("⟨σn⟩")
        .attr("text-anchor", "middle")
        .attr("transform", `rotate(-90, ${left/2}, ${top_sp + (height2 - top_sp - bottom)/2}), translate(${left/2}, ${top_sp + (height2 - top_sp - bottom)/2})`)
        .attr("font-size", 24)
        .attr("font-style", "italic")

      let yax_draw = d3.axisLeft()
        .scale(yax2)
        .ticks(3);
      svg2.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${left}, 0)`)
        .call(yax_draw);
      svg2.append("text")
        .text("t/U")
        .attr("transform", `translate(${left + (width - left - right)/2}, ${height2 - bottom/2})`)
        .attr("text-anchor", "middle")
        .attr("font-size", 24)
        .attr("font-style", "italic");

      d3.selectAll(".axis>.tick>text")
        .each(function(d, i){
          d3.select(this).style("font-size", "18px");
        });
      svg2.append("rect")
        .attr("transform", `translate(${left}, ${top_sp})`)
        .attr("width", width - left - right)
        .attr("height", height2 - top_sp - bottom)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("stroke-location", "outside")
    }
  )

function updateMarker(depth) {
  let t = 1-depth;
  d3.select("#dynamicIndicator")
    .attr("cx", xax2(xax3.invert(t)))
    .attr("cy", yax2(plotdatInterpolator(t)));
}
