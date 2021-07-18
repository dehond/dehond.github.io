let width = parseInt(d3.select('#container1').style('width'));
let height = 300;
let border = 10;
let nwells = 6;
let nmax = 3;
let atoms = [];
let initDepth = 0.575;
for (let i = 0; i < nmax; i++) {
  atoms.push(...[...Array(nwells).keys()].map(d => createAtom((d+0.5)/nwells, 0, i) ));
}
let popdat = [];

let svg1 = d3.select('#svg1')
  .attr('width', width)
  .attr('height', height);
  
let atomsGroup = svg1.append("g");
let latticePath = svg1.append("path")
  .attr('stroke-width', 3)
  .attr('stroke', 'black')
  .attr('fill', 'none');

let xax = d3.scaleLinear()
  .domain([0, 1])
  .range([border, width - border])
  
let yax = d3.scaleLinear()
  .domain([0, 1])
  .range([height - border, border])

d3.json("/assets/posts/sf-to-mi/occupation_data.json")
  .then( d => main(d["data"]) );

function main(dat) {
  popdat = dat;
  updateAtomMagnitudes(initDepth);
  drawLattice(nwells, initDepth);
  drawAtoms(atoms, initDepth, atomsGroup);
}

function drawLattice(nwells, depth = 1, grp = latticePath) {
  let sinline = d3.line()
    .x(d => xax(d[0]))
    .y(d => yax(d[1]))
    .curve(d3.curveBasis)
    (sinpoints(nwells, depth));
  grp
    .attr('d', sinline);
}

function drawAtoms(atoms, depth, grp) {
  grp
    .selectAll('circle')
    .data(atoms)
      .join(
        enter => enter.append("circle")
          .attr('cx', d => xax(d.x))
          .attr('cy', d => yax(d.number * 0.1 + 0.62 - depth/2))
          .attr('r', 12)
          .attr('fill', 'black')
          .attr('fill-opacity', d => d.mag),
        update => update.attr('cy', d => yax(d.number * 0.1 + 0.62 - depth/2))
          .attr('fill-opacity', d => d.mag),
        exit => exit.remove()
      )     
}
  
function sinpoints(nwells, depth = 1) {
  let npts = 100;
  let x = [...Array(npts).keys()].map(x => x/(npts-1));
  let output = x.map( x => [x, depth * Math.cos(2*Math.PI * x * nwells/2)**2 + 0.5 - depth/2 ] );
  return output
}

function createAtom(x, mag, n) {
  /* Retun atom object including x & y position in relative units, the magnitude of the wave function in its state, and the index it's populating */
  return {x: x, mag: mag, number: n}
}

function updateLattice(depth) {
  updateAtomMagnitudes(depth);
  drawLattice(nwells, depth*0.9 + 0.1);
  drawAtoms(atoms, depth*0.9 + 0.1, atomsGroup);
  updateMarker(depth);
}

function updateAtomMagnitudes(depth) {
  let minindex = d3.minIndex(popdat.map(d => Math.abs((tscale(depth) - d["t/U"]))));
  for (let i = 0; i < nmax; i++){
    for (let j = 0; j < nwells; j++){
      atoms[i*nwells + j].mag = (3*i + 1) * popdat[minindex].sitepops[j].pops[i + 1];
    }
  }
}