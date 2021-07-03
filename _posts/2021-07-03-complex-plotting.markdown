---
layout: 	post
title: 		Plotting complex functions on a sphere using d3
date:   	2021-07-03 8:00:00 -0400
categories:	tutorial
---

<script src='https://d3js.org/d3.v7.min.js'></script>
<script src='https://cdn.jsdelivr.net/npm/d3-geo-projection@4'></script>
<script src='https://unpkg.com/d3-geo-voronoi@1.6.0/dist/d3-geo-voronoi.min.js'></script>

A while ago, I wanted to plot a complex function that was defined on a sphere (i.e. $f(\vartheta, \varphi) = r e^{i\phi}$), and do it in such a way that both the magnitude and phase ($r$ and $\phi$, respectively) of said function would be made visible. Perhaps the most straightforward way of doing that is to use a (cyclic) colormap in which the phase is encoded, while the transparency reflects the magnitude. (This makes it harder to read off the numerical value of the magnitude, but we'll have to stomach for now.)

<!--more-->

While it's fairly straightforward to achieve this using Matplotlib (see [StackExchange post](https://stackoverflow.com/questions/32177718/use-a-variable-to-set-alpha-opacity-in-a-colormap) for instance), we're in the browser now, so let's see how far we can get with the tools we have at our disposal here. Specifically let's use the [d3 plotting library](https://d3js.org/) that allows us to draw svg-based figures in the browser. We'll also use the extensions [d3-geo-voronoi](https://github.com/Fil/d3-geo-voronoi) for generating polygons we can fill with a color, and [d3-geo-projection](https://github.com/d3/d3-geo-projection) to access a nonstandard geographical projection.

We'll set things up by defining an `<svg>` element,

{%  highlight html %}
<div id = 'container1'>
  <svg id = 'svg1'></svg>
</div>
{% endhighlight %}

where we add the graticule of the sphere we want to plot on according to the [Hammer projection](https://en.wikipedia.org/wiki/Hammer_projection) using the following piece of Javascript:

{% highlight javascript %}
let width = parseInt(d3.select('#container1').style('width'));
let height = 400;
let svg = d3.select('#svg1')
  .attr('width', width)
  .attr('height', height);
drawGraticule(svg);

function drawGraticule(svg) {
  let projection = d3.geoHammer();
  /* Move the projection origin to the center,
  960 is d3's default projection width. */
  projection.translate([width/2, height/2])
    .scale(width/960 * projection.scale());
  let path = d3.geoPath().projection(projection);

  svg.append('path')
    .attr('d', path(d3.geoGraticule10()))
    .attr('stroke', '#AAAAAA')
    .attr('stroke-width', 0.5)
    .attr('fill', 'none');
  svg.append('path').datum({type: 'Sphere'})
    .attr('d', path)
    .attr('stroke', '#777')
    .attr('stroke-width', 0.5)
    .attr('fill', 'none');
}
{% endhighlight %}

<div markdown = '0' id = 'container1'>
  <svg id = 'svg1'>
  </svg>
    <script>
	  let width = parseInt(d3.select('#container1').style('width'));
	  let height = 400;
	  let svg = d3.select('#svg1')
	    .attr('width', width)
		  .attr('height', height);
	  let path = drawGraticule(svg);
	
	  function drawGraticule(svg) {
	    let projection = d3.geoHammer();
	    projection.translate([width/2, height/2])
	      .scale(width/960 * projection.scale());
	    let path = d3.geoPath().projection(projection);
	  
	    svg.append('path')
	      .attr('d', path(d3.geoGraticule10()))
		  .attr('stroke', '#777')
		  .attr('stroke-width', 0.5)
		  .attr('fill', 'none');
		  
		svg.append('path').datum({type: 'Sphere'})
		  .attr('d', path)
		  .attr('stroke', '#777')
		  .attr('stroke-width', 0.5)
		  .attr('fill', 'none');
    
    return path;
	  }
	</script>
</div>
To plot a function on this sphere we'll define a grid of points where we evaluate the function. Then we'll color in a small region around our points according to the function's value. In a Cartesian coordinate system we can simply draw a box around each point, but on a sphere things are more complicated (looking at the graticule drawn above this becomes apparent: a surface element $\Delta\vartheta\Delta\varphi$ doesn't have the same surface area everywhere). Fortunately [Voronoi diagrams](https://en.wikipedia.org/wiki/Voronoi_diagram) (the collection of polygons that is constructed by drawing the equidistant lines between pairs of points) solve this problem, and they're baked into d3 for this very purpose.

Let's define an array of points in a JSON format that can be used by d3-geo,

{% highlight javascript %}
let sampling = 20;
let points = generatePoints(sampling);  

function generatePoints() {
  let xcoords = d3.range(-180, 180, sampling);
  let ycoords = d3.range(-90, 90 + sampling, sampling);
  let pointarray = [];
  for (let m = 0; m < ycoords.length; m++) {
    for (let n = 0; n < xcoords.length; n++) {
      /* Add small random offset to prevent aliasing at dense sampling. */
      pointarray.push( [xcoords[n], ycoords[m] + Math.random() * 0.001] );
      }
  } 
  let points = {
    type: 'FeatureCollection',
    features: pointarray.map(function(d) {
      return {
        type: 'Point',
        coordinates: [ d[0], d[1] ]
        }
    })
  }
  return points
}
{% endhighlight %}

and use this to draw the Voronoi diagram (where we use random polygon colors):

{% highlight javascript %}
let vor = drawVoronoi(svg, points, path);

function drawVoronoi(svg, points, path) {
  let vor = d3.geoVoronoi(points);
  svg.append('g')
    .selectAll('path')
    .data(vor.polygons().features)
    .enter()
      .append('path')
      .attr('d', path)
      .attr('fill', () => d3.interpolateTurbo(Math.random()));
  svg.append('g')
    .selectAll('path')
    .data(points.features)
    .enter()
      .append('path')
      .attr('d', path)
      .attr('opacity', 0.5);
  return vor
}
{% endhighlight %}  

<div markdown = '0' id = 'container2'>
  <svg id = 'svg2'>
  </svg>
    <script>
	  svg = d3.select('#svg2')
	    .attr('width', width)
      .attr('height', height);
	  drawGraticule(svg);
    let sampling = 20;
    let points = generatePoints(sampling);
    let vor = drawVoronoi(svg, points, path);        
	  
	  function generatePoints(sampling) {
      let xcoords = d3.range(-180, 180, sampling);
      let ycoords = d3.range(-90, 90 + sampling, sampling);
      let pointarray = [];
      for (let m = 0; m < ycoords.length; m++) {
        for (let n = 0; n < xcoords.length; n++) {
          pointarray.push( [xcoords[n], ycoords[m] + Math.random() * 0.001] );
          }
      } 
      let points = {
        type: 'FeatureCollection',
        features: pointarray.map(function(d) {
          return {
            type: 'Point',
            coordinates: [ d[0], d[1] ]
            }
        })
      }
      return points
    }
	  
    function drawVoronoi(svg, points, path) {
      let vor = d3.geoVoronoi(points);
      svg.append('g')
        .selectAll('path')
        .data(vor.polygons().features)
        .enter()
          .append('path')
          .attr('d', path)
          .attr('fill', () => d3.interpolateTurbo(Math.random()));
      svg.append('g')
        .selectAll('path')
        .data(points.features)
        .enter()
          .append('path')
          .attr('d', path)
          .attr('opacity', 0.5);
      return vor;
    }
	  
	</script>
</div>