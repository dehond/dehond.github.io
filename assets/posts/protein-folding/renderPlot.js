class aa {
  constructor(location, type) {
    this.location = location;
    this.type = type;
    this.status = "stationary";
  }
}

// Colors
let mred = "#d62728";
let mblue = "#1f77b4";

let animatedAAs = drawEnergyLevelPlot();
renderGrid();

function drawEnergyLevelPlot() {
  let height = 400;
  let width = Math.min(window.innerWidth-50, 430);
  let padding = 50;

  let xax = d3.scaleLinear()
    .domain([0, 1])
    .range([padding, width - padding]);
  let yax = d3.scaleLinear()
    .domain([10, -2])
    .range([padding, height - padding]);

  let svg = d3.select("#energiesPlot")
    .attr("width", width)
    .attr("height", height)

  svg.append("clipPath")
    .attr("id", "plotClip")
    .append("rect")
    .attr("width", width - 2*padding)
    .attr("height", height - 2*padding)
    .attr("transform", `translate(${padding}, ${padding})`)
    .attr("fill", mred)

  let axis = d3.axisBottom(xax)
    .ticks(2)
  svg.append("g")
    .attr("transform", `translate(0, ${height - padding})`)
    .call(axis)

  axis = d3.axisLeft(yax)
    .ticks(0)
  svg.append("g")
    .attr("transform", `translate(${padding}, 0)`)
    .call(axis)

  svg.append("text")
    .attr("x", width/2)
    .attr("y", height - padding)
    .attr("dy", "2em")
    .text("Time (τ)")
    .attr("fill", "black")
    .attr("text-anchor", "middle")
    .attr("font-size", "20")
    .attr("font-family", "sans-serif")

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height/2)
    .attr("y", padding)
    .attr("dy", "-1.5em")
    .text("Energy")
    .attr("fill", "black")
    .attr("dominant-baseline", "hanging")
    .attr("text-anchor", "middle")
    .attr("font-size", "20")
    .attr("font-family", "sans-serif")

  d3.csv("/assets/posts/protein-folding/energies.csv")
    .then((data) => plotData(data, svg, xax, yax));

  svg_grid = d3.select("#energiesPlotLattice")
    .attr("width", 300)
    .attr("height", 300)
  let xax2 = d3.scaleLinear()
    .range([0, 300])
    .domain([-1, 4]);
  let yax2 = d3.scaleLinear()
    .range([300-50, 0])
    .domain([-1, 4]);
  let latticeSites = drawLattice(svg_grid, xax2, yax2);

  // Define amino acids on all sites, then add functions that determine opacity
  let aas = latticeSites.map(d => new aa(d, (((d[0] == 1) | (d[0] == 2)) && (d[1] == 1)) ? "P" : "H"));
  for (let i = 0; i < aas.length; i++) {
    let a = aas[i];
    if (a.type == "H") {
      if (((a.location[0] == 1) | (a.location[0] == 2)) && ((a.location[1] == 0) | (a.location[1] == 2))) {
        a.colorfun = (t) => 0.4 + 0.3*t;
      } else {
        a.colorfun = (t) => 0.4 * (1 - t);
      }
    } else {
      a.colorfun = (t) => 1;
    }
  }
  
  svg_grid.append("g")
  .attr("id", "animatedAminoAcids")
  .selectAll("circle")
  .data(aas)
  .join("circle")
    .attr("r", 12)
    .attr("cx", d => xax2(d.location[0]))
    .attr("cy", d => yax2(d.location[1]))
    .attr("fill", d => (d.type == 'P') ? mblue : mred)
    .attr("fill-opacity", d => d.colorfun(0));

  return aas;
}

function plotData(data, svg, xax, yax) {
  let line = d3.line()
      .x((d, i) => xax(i/39))
      .y(d => yax(d));
  svg.append("g")
    .attr("id", "lineGroup")
    .attr("clip-path", "url(#plotClip)")
    .selectAll("path")
    .data(data)
    .enter()
      .append("path")
      .attr("d", d => line(Object.values(d).map(parseFloat)) )
      .attr("stroke-width", 2)
      .attr("stroke", "gray")
      .attr("fill", "none")
      .attr("stroke-opacity", 0.1);
    
  svg.append("path")
    .attr("id", "groundStateLine")
    .attr("d", line(Object.values(data[0]).map(parseFloat)) )
    .attr("stroke-width", 2)
    .attr("stroke", mred)
    .attr("fill", "none");

  let interp_gs = d3.interpolateBasis(Object.values(data[0]).map(parseFloat));
  let drag = d3.drag()
    .on("drag", function(event, d) {
    d3.select(this).attr("cx", Math.max(Math.min(xax(1), event.x), xax(0)));
    d3.select(this).attr("cy", yax(interp_gs(xax.invert(event.x))));
    updateLattice(  Math.max(0, xax.invert(event.x)) );
  })

  svg.append("circle")
    .attr("class", "draggable")
    .attr("cx", xax(0))
    .attr("cy", yax(0))
    .attr("r", 10)
    .attr("fill", mred)
    .attr("fill-opacity", 0.7)
    .attr("stroke", mred)
    .attr("stroke-width", 5)
    .call(drag);

}

function updateLattice(t) {
  d3.select("#animatedAminoAcids")
    .selectAll("circle")
    .data(animatedAAs)
    .join("circle")
      .attr("fill-opacity", d => d.colorfun(t));
};

function renderGrid() {
  aas = [new aa([0, 0], 'H'), new aa([1, 1], 'P'), new aa([2, 1], 'P'), new aa([1, 0], 'H')];
  let height = 400;
  let width = 450;
  let svg = d3.select("#lattice")
    .attr('width', width)
    .attr('height', height)

  let xax = d3.scaleLinear()
    .range([0, width])
    .domain([-1, 4]);

  let yax = d3.scaleLinear()
    .range([height-50, 0])
    .domain([-1, 4]);

  drawLattice(svg, xax, yax);

  function dragHandler() {
    return d3.drag()
    .on("start", function(event, d) {
        d.status = "moving";
        d3.select("#aminocircles").append("circle")
        .attr("id", "dragshadow")
        .attr("cx", xax(d.location[0]))
        .attr("cy", yax(d.location[1]))
        .attr("r", 20)
        .attr("stroke-width", 10)
        .attr("fill", "none")
        .attr("stroke", (d.type == "P") ? mblue : mred)
        .attr("stroke-width", 3)
        .attr("stroke-opacity", 0.5)
        .attr("stroke-dasharray", "3, 3");
        updateBitstring(aas);
    })
    .on("drag", function(event, d) {
        let newx = Math.max(0, Math.min(3, Math.round(xax.invert(event.x))));
        let newy = Math.max(0, Math.min(3, Math.round(yax.invert(event.y))));
        d3.select("#dragshadow")
        .attr("cx", xax(newx))
        .attr("cy", yax(newy));
        d3.select(this).raise()
        .attr("cx", event.x)
        .attr("cy", event.y);
    })
        .on("end", function (event, d) {
        d3.select("#dragshadow").remove();
        let newx = Math.max(0, Math.min(3, Math.round(xax.invert(event.x))));
        let newy = Math.max(0, Math.min(3, Math.round(yax.invert(event.y))));
        d.location = [newx, newy];
        d.status = "stationary";
        updateBitstring(aas);
        d3.select(this)
            .attr("cx", xax(newx))
            .attr("cy", yax(newy));
        updateBitstring(aas);
        })
    }

  svg.append("g")
    .attr("id", "aminocircles")
    .selectAll("circle")
    .data(aas)
    .enter()
      .append("circle")
      .attr("class", "draggable")
      .attr("r", 20)
      .attr("cx", d => xax(d.location[0]))
      .attr("cy", d => yax(d.location[1]))
      .attr("fill", d => (d.type == 'P') ? mblue : mred)
      .on("mouseover", function() {d3.select(this).attr("fill-opacity", 0.5)})
      .on("mouseout", function() {d3.select(this).attr("fill-opacity", 1.0)})
      .call(dragHandler())

  updateBitstring(aas);
}

function updateBitstring() {
  let lookup = {0: '00', 1: '01', 2: '10', 3: '11'};
  d3.select("#qdisplay")
    .selectAll("span")
    .data(aas.slice().reverse())
    .join("span")
    .text(d => lookup[d.location[1]] + lookup[d.location[0]] + ' ')
    .style('color', d => (d.status == "stationary") ? "black" : "gray");
}

function drawLattice(svg, xax, yax) {
  let sites = [...Array(4).keys()].map( d => [...Array(4).keys()].map( h => [h, d])).flat();

  svg.append("g")
  .selectAll("circle")
  .data(sites)
  .enter()
    .append("circle")
    .attr("r", 3)
    .attr("cx", d => xax(d[0]))
    .attr("cy", d => yax(d[1]))
    .attr("fill", "gray");

let axlabels = ['00', '01', '10', '11'];
svg.append("g")
  .selectAll("text")
  .data(axlabels)
  .join("text")
    .style("font-family", "monospace")
    .text(d => d)
    .attr("x", (d, i) => xax(i))
    .attr("y", yax(-0.7))
    .attr("text-anchor", "middle");

svg.append("g")
  .selectAll("text")
  .data(axlabels)
  .join("text")
    .style("font-family", "monospace")
    .text(d => d)
    .attr("x", xax(-0.6))
    .attr("y", (d, i) => yax(i))
    .attr("dy", "0.3em")

  return sites
}