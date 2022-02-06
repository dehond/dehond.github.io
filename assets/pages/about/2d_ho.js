let width = 250;
let height = 250;

d3.json("/assets/pages/about/state_data.json")
  .then( parseData );

function parseData(dat) {
  let parsedData = dat.map(generateObject);

  window.data = parsedData;
  createHarmonicOscillator(parsedData);
  function generateObject(d) {
    return d.map(d => ( {x: d.x, y: d.y, psi: math.complex(d.psi)} ) )
  }
}

function createHarmonicOscillator(data) {
  let canvas = d3.select("#ho-container")
    .append("canvas")
    .attr("width", width)
    .attr("height", height);

  let clickstate = false;

  let ctx = canvas.node().getContext('2d');
  let fpos = [10, 10, width-10, height-10];
  let [xScale, yScale] = plotData(ctx, generateData(width/2, height/2, fpos), fpos);
  drawBilliardEdge(ctx, xScale, yScale);

  canvas.on("mousemove", updateBilliard);
  canvas.on("touchmove", updateBilliard);
}

function updateBilliard(event) {
  let ctx = event.srcElement.getContext('2d');
  ctx.clearRect(0, 0, width, height);

  let fpos = [10, 10, width-10, height-10];
  ctx.globalAlpha = 1;
  
  let rect = event.target.getBoundingClientRect();

  let xpos, ypos;
  if (event.touches) {
    [xpos, ypos] = [event.touches[0].clientX - rect.x, event.touches[0].clientY - rect.y];
  } else {
    [xpos, ypos] = [event.clientX - rect.x, event.clientY - rect.y];
  }

  let newdat = generateData(xpos, ypos, fpos);
  let [xScale, yScale] = plotData(ctx, newdat, fpos);
  drawBilliardEdge(ctx, xScale, yScale);
}

function generateData(xpos, ypos, fpos) {
  let axis = [...Array(41).keys()].map(d => (d - 20)/20);
  let xStep = Math.ceil(fpos[2] / axis.length);
  let yStep = Math.ceil(fpos[3] / axis.length);
  let xScale = d3.scaleLinear()
    .domain([-1, 1])
    .range([fpos[0], fpos[0] + fpos[2] - xStep])
  let yScale = d3.scaleLinear()
    .domain([-1, 1])
    .range([fpos[1] + fpos[3] - yStep, fpos[1]])
  let x0 = xScale.invert(xpos);
  let y0 = yScale.invert(ypos);
  
  let dat = [];
  for (let i = 0; i < axis.length; i++) {
    for (let j = 0; j < axis.length; j++) {
      let val = math.complex(math.exp(-1 * (4*((axis[i] - x0)**2) + 4*((axis[j]-y0)**2))), 0);
      dat.push({x: axis[i], y: axis[j], psi: val });
    }
  }
  return projectData(dat);
}

function projectData(dat) {
  let maxOrder = 10;
  let coeff = calculateCoefficient(dat, data[0]);
  let projdat = addPsis(data[0], data[0], coeff, 0); // To initialize, just add the first component
  for (let i = 1; i < maxOrder; i++){
    coeff = calculateCoefficient(dat, data[i]);
    projdat = addPsis(projdat, data[i], 1, coeff); // Add each projected order to array
  }
  return projdat 
}

function calculateCoefficient(psi0, psi1) {
  let psi0vals = psi0.map(d => d.psi);
  let psi1vals = psi1.map(d => d.psi);
  // Implement check whether array sizes are the same, if yes proceed.
  let prod = 0;
  for (let i = 0; i < psi0vals.length; i++) {
    prod += psi0vals[i] * psi1vals[i];
  }
  prod *= (math.round((data[0][1].y - data[0][0].y)*100)/100)**2 // Normalize
  return prod
}

function addPsis(psi0, psi1, coeff0, coeff1) {
  let psi2 = [];
  for (let i = 0; i < psi0.length; i++) {
    psi2.push({x: psi0[i].x, y: psi0[i].y, psi: math.complex( coeff0*psi0[i].psi + coeff1*psi1[i].psi )});
  }
  return psi2
}

function plotData(ctx, dat, fpos){
  let cScale = d3.scaleSequential( d => d3.interpolateBlues(3*d) )
                .domain([0, 2*Math.PI])
  let xStep = Math.round(fpos[2] / [...new Set(dat.map(d => d['x']))].length);
  let yStep = Math.round(fpos[3] / [...new Set(dat.map(d => d['y']))].length);
  let xScale = d3.scaleLinear()
    .domain([-1, 1])
    .range([fpos[0], fpos[0] + fpos[2] - xStep])
  let yScale = d3.scaleLinear()
    .domain([-1, 1])
    .range([fpos[1] + fpos[3] - yStep, fpos[1]])

  let normto = Math.max(...dat.map( d => d['psi'].abs()**2 ))
  for (let i = 0; i < dat.length; i++) {
    ctx.globalAlpha = dat[i]['psi'].abs()**2/normto;
    ctx.fillStyle = d3.rgb( cScale( math.mod(dat[i].psi.arg() + math.pi/2, 2*math.pi ) ) ).hex()
    ctx.fillRect(xScale(dat[i]['x']) - xStep/2, yScale(dat[i]['y']) - yStep/2, xStep, yStep)
  }
  return [xScale, yScale]
}

function drawBilliardEdge(ctx, xScale, yScale){
  ctx.globalAlpha = 1;
  ctx.beginPath();
  ctx.arc(xScale(0), yScale(0), xScale(1) - xScale(0), 0, 2*math.pi, true);
  ctx.strokeWidth = 10;
  ctx.strokeStyle = "black";
  ctx.stroke();
}