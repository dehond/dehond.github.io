let width = parseInt(d3.select('#lattice-container').style('width'));
let height = 150;
let border = 10;
let red = "#b8002e";
let blue = "#006bb8";

let xax = d3.scaleLinear()
.domain([0, 1])
.range([border, width - border])

let yax = d3.scaleLinear()
  .domain([0, 1])
  .range([height - border, border])

let svg = d3.select("#spin-dependent-lattice-demo")
  .attr("width", width)
  .attr("height", height);

let nwells = 4;
let [slA, slB] = drawLattice(nwells, svg, 0.025);
drawAtoms(slA, slB, 0.025, 0.2, [red, blue], nwells)

animateLattice();
// window.setInterval( animateLattice, 2000 );

// Hide the text info box when user hovers over svg
d3.select("#wannier-container")
  .on("touchstart", showInfoBox)
  .on("mouseover", showInfoBox);

function hideInfoBox() {
    d3.select("#latticeInfoBox")
      .style("visibility", "hidden");
};

function showInfoBox(){
  d3.select("#latticeInfoBox")
    .transition()
      .style("opacity", 1);
};

function drawInteractionScales() {
  let svg = d3.select("#interaction-scales")
    .attr("width", width)
    .attr("height", height);

  let nwells = 4;
  let [lA, lB] = drawLattice(nwells, svg, 0);
  lB.select("path").attr("stroke", "black");
  let atoms = drawAtoms(lA, lB, 0.02, 0.3, [red, blue], nwells);
  lA.selectAll("circle").filter( (_, i) => i < 6 || i > 8 ).remove();
  lB.selectAll("circle").filter( (_, i) => i < 6 || i > 8 ).remove();
  lA.select("circle").attr("fill", blue);
  lB.selectAll("circle").filter( (_, i) => i == 2 ).attr("fill", red);

  addLabel("U", 1/4); 
  addLabel("Uab", 1/2);
  addLabel("U", 3/4);

  function addLabel(label, xpos) {
    svg.append("text")
      .text(label)
      .attr("x", xax(xpos))
      .attr("y", yax(0.6))
      .attr("text-anchor", "middle")
      .attr("font-size", 20)
      .attr("font-style", "italic")
  }
}

drawInteractionScales();

// Draw lattice showing phase
svg_lat = d3.select("#lattice-phase")
  .attr("width", width)
  .attr("height", height);

nwells = 3;
let xsep = 0.02;
let ysep = 0.2;
let yoff = 0.1;

let [lA, lB] = drawLattice(nwells, svg_lat, 0);
lB.select("path").attr("stroke", "black");
ABs = drawAtoms(lA, lB, xsep, yoff + ysep, [red, blue], nwells);
AAs = drawAtoms(lA, lB, xsep, yoff + 2*ysep, [red, red], nwells);
BBs = drawAtoms(lA, lB, xsep, yoff + 3*ysep, [blue, blue], nwells);
let unpairedDoublons = AAs.concat(BBs);

function updateState(latticeSeparation) {
  Uab = d3.max([1 - Math.abs(latticeSeparation)/90, 0]);
  unpairedDoublons.forEach( (d) => {
    d.attr("fill-opacity", 0.4*Uab**4);
  });
}

// Draw lattice with Wannier functions
svg_wan = d3.select("#wannier")
  .attr("width", width/1.5)
  .attr("height", height)
  .attr("viewBox", `${width/4} 0 ${width/2} ${height}`);

svg_wan.append("ellipse")
  .attr("cx", width/2)
  .attr("cy", height/2)
  .attr("rx", width*0.3)
  .attr("ry", 0.48*height)
  .attr("id", "clipPathStroke")
  .attr("fill", "none")
  .attr("stroke", "black")
  .attr("stroke-width", "2px");

svg_wan.append("defs").append("clipPath")
  .attr("id", "zoomEllipse")
  .append("use")
  .attr("xlink:href", "#clipPathStroke");
  

svg_wan_g = svg_wan.append("g")
  .attr("clip-path", "url(#zoomEllipse)");

[slA, slB] = drawLattice(2, svg_wan_g, 0.0);
let latticeSeparation = 40;
drawWannier(slA, slB, latticeSeparation);
updateState(latticeSeparation);
slA.call(dragHandler());
slB.call(dragHandler());

function dragHandler() {
  return d3.drag()
    .on("drag", function (event, d)  {
      hideInfoBox(); // Hide if not already hidden
      d3.select(this).raise().select(".wannier").attr("stroke-width", 4);
      let newpos = event.x - width/2;
      updateState(newpos);
      let edge = width/8.3; // Stop drag at this position, works for different screen sizes
      d3.select(this).attr("transform", `translate( ${ d3.min([d3.max([newpos, -edge]), edge]) } 0 )`);
      let other = "";
      if (this.id == "sublatA") {
        other = "#sublatB"
      } else {
        other = "#sublatA"
      };
      d3.select("#wannier").select(other).attr("transform", `translate( ${ d3.max([d3.min([-newpos, edge]), -edge])} 0 )`);
    })
    .on("end", function() {d3.select(this).select(".wannier").attr("stroke-width", 0)});
}

function drawWannier(slA, slB, offset) {
  slA.append("path")
    .attr("class", "wannier")
    .attr("d", pmwannier(1/2))
    .attr("fill", red)
    .attr("fill-opacity", 0.4)
    .attr("stroke-width", 0)
    .attr("stroke", red)
    .on("mouseover", function() {d3.select(this).attr("stroke-width", 4)})
    .on("mouseout", function() {d3.select(this).attr("stroke-width", 0)});

  slB.append("path")
    .attr("class", "wannier")
    .attr("d", pmwannier(1/2))
    .attr("fill", blue)
    .attr("fill-opacity", 0.4)
    .attr("stroke", blue)
    .attr("stroke-width", 0)
    .on("mouseover", function() {d3.select(this).attr("stroke-width", 4)})
    .on("mouseout", function() {d3.select(this).attr("stroke-width", 0)});

  slA.attr("transform", `translate(${offset} 0)`);
  slB.attr("transform", `translate(${-offset} 0)`);

  function pmwannier(x0) {
    let npts = 400;
    let x = [...Array(npts).keys()].map( d => 0.3*d/(npts - 1) + 0.7/2 );
    let pts = x.map( d => [xax(d), yax(Math.exp( -1 * (d - x0)**2/0.003 ))] );
    return d3.line()(pts)
  }
  return pmwannier(0)
}

function drawLattice(nwells, svg, phase, depth = 1) {
  let slA = svg.append("g").attr("id", "sublatA");
  let slB = svg.append("g").attr("id", "sublatB");
  slA.append("path")
    .attr('stroke-width', 3)
    .attr('stroke-opacity', 0.8)
    .attr('stroke', red)
    .attr('fill', 'none')
    .attr('d', sinline(phase));

  slB.append("path")
    .attr('stroke-width', 3)
    .attr('stroke-opacity', 0.8)
    .attr('stroke', blue)
    .attr('fill', 'none')
    .attr('d', sinline(-phase));

  function sinpoints(nwells, phase, depth = 1) {
    let npts = 400;
    let x = [...Array(npts).keys()].map(x => 4*x/(npts-1) - 1.5);
    let output = x.map( x => [x, depth * Math.sin(2*Math.PI * (x + phase) * nwells/2)**2 + 0.5 - depth/2 ] );
    return output
  }

  function sinline(phase) {
    return d3.line()
      .x(d => xax(d[0]))
      .y(d => yax(d[1]))
      .curve(d3.curveBasis)
      (sinpoints(nwells, phase, depth));
  }

  return [slA, slB]
}

function drawAtoms(slA, slB, phase, height, colors, nwells) {
  xposA = [...Array(nwells + 10).keys()].map( d => (d-5)/nwells - phase);
  xposB = [...Array(nwells + 10).keys()].map( d => (d-5)/nwells + phase);
  aAtoms = slA.append("g").selectAll("circle")
    .data(xposA)
    .enter()
      .append("circle")
      .attr("cx", d => xax( d ))
      .attr("cy", yax(height))
      .attr("r", 12)
      .attr("fill", colors[0]);

  bAtoms = slB.append("g").selectAll("circle")
    .data(xposB)
    .enter()
      .append("circle")
      .attr("cx", d => xax( d ))
      .attr("cy", yax(height))
      .attr("r", 12)
      .attr("fill", colors[1]);

  return [aAtoms, bAtoms];
}

function animateLattice() {
  d3.select("#sublatA")
    .transition()
    .duration(2000)
    .attrTween("transform", () => {
      return (t) => {
        return `translate( ${ xax(2*t/nwells) - border } 0)`
      }
    })
    .on('end', () => { d3.select("#sublatA").transition()
      .duration(2000)
      .attrTween("transform", () => {
        return (t) => {
          return `translate( ${ xax(2/nwells - 2*t/nwells) - border } 0)`
        }
      })}
    );

    d3.select("#sublatB")
    .transition()
    .duration(2000)
    .attrTween("transform", () => {
      return (t) => {
        return `translate( ${ xax(-2*t/nwells) - border } 0)`
      }
    })
    .on('end', () => { d3.select("#sublatB").transition()
      .duration(2000)
      .attrTween("transform", () => {
        return (t) => {
          return `translate( ${ xax(-2/nwells + 2*t/nwells) - border } 0)`
        }
      })}
    );
}