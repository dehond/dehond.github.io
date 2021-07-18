let iwidth = parseInt(d3.select('#vocabcontainer').style('width'));
let iheight = 100;
let svgillus = d3.select("#headIllustration")
    .attr("width", iwidth)
    .attr("height", iheight);
let iatomsGroup = svgillus.append("g")
    .attr("transform", "translate(0, -100)");
let ilatticePath = svgillus.append("path")
    .attr('stroke-width', 3)
    .attr('stroke', 'black')
    .attr('fill', 'none')
    .attr("transform", "translate(0, -100)");

iatoms = [];
for (let i = 0; i < 2; i++) {
    iatoms.push(...[...Array(5).keys()].map(d => createAtom((d+0.5)/5, 0, i) ));
}

drawLattice(5, 0.3, grp = ilatticePath);
randomizeAtoms(iatoms, 3);

let intervalID = window.setInterval( () => randomizeAtoms(iatoms, 3), 1500 );

function randomizeAtoms(atoms, npop) {
    for (let i = 0; i < atoms.length; i++) {
        atoms[i].mag = 0;
    }
    for (let i = 0; i < npop; i++) {
        let crindex = Math.round(Math.random() * (atoms.length - 1));
        atoms[crindex].mag = Math.random();
    }
    drawAtoms(atoms, 0.3, iatomsGroup)
}


