// set the dimensions and margins of the graph
let width = 500;
let height = 500;
let margin = 50;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin;

// append the svg object to the div called 'my_dataviz'
var svg = d3
  .select('#my_dataviz')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

// Create dummy data
var data = {a: 301806, b: 473682, c: 76020};

// set the color scale
var color = d3
  .scaleOrdinal()
  .domain(data)
  .range(['cornflowerblue', 'goldenrod', 'maroon']);

// Compute the position of each group on the pie:
var pie = d3.pie().value(function (d) {
  return d.value;
});
var data_ready = pie(d3.entries(data));
// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
  .selectAll('pie_slice')
  .data(data_ready)
  .enter()
  .append('path')
  .attr('d', d3.arc().innerRadius(100).outerRadius(radius))
  .attr('class', 'pie_slice')
  .attr('fill', function (d) {
    return color(d.data.key);
  })
  .attr('stroke', 'black')
  .style('stroke-width', '2px')
  .style('opacity', 0.7);
