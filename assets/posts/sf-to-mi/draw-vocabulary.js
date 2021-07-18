let vwidth = parseInt(d3.select('#vocabcontainer').style('width'));
let vheight = 190;
let svgvocab = d3.select("#svgvocab")
    .attr("width", vwidth)
    .attr("height", vheight);
let vatomsGroup = svgvocab.append("g")
    .attr("transform", "translate(0, -60)");
let vlatticePath = svgvocab.append("path")
    .attr('stroke-width', 3)
    .attr('stroke', 'black')
    .attr('fill', 'none')
    .attr("transform", "translate(0, -60)");

vatoms = [];
for (let i = 0; i < 2; i++) {
    vatoms.push(...[...Array(3).keys()].map(d => createAtom((d+0.5)/3, 0, i) ));
}
vatoms[0].mag = 1;
vatoms[4].mag = 1;
vatoms[2].mag = 0.5;
vatoms[5].mag = 0.5;
drawAtoms(vatoms, 0.5, vatomsGroup);
drawLattice(3, 0.5, grp = vlatticePath);