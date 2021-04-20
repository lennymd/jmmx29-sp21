function Immi_Type_Detained_2019(){
// set the dimensions and margins of the graph
let width = 500;
let height = 500;
let margin = 50;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin;

// append the svg object to the div called 'my_dataviz'
var svg = d3
  .select('#Immi_TypImmi_Type_Detained_2019')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

// Create data
var data = {Single_Adults: 301806, Child_Family_Units: 473682, Unaccompanied_Child: 76020};

// set the color scale
var color = d3
  .scaleOrdinal()
  .domain(data)
  .range(['#333399', '#FF9933', '#FF3333']);

// Compute the position of each group on the pie:
var pie = d3.pie().value(function (d) {
  return d.value;
});
var data_ready = pie(d3.entries(data));

// shape helper to build arcs:
var arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
  .selectAll('pie_slice')
  .data(data_ready)
  .enter()
  .append('path')
  .attr('d', arcGenerator)
  .attr('class', 'pie_slice')
  .attr('fill', function (d) {
    return color(d.data.key);
  })
  .attr('stroke', 'black')
  .style('stroke-width', '2px');

// Now add the annotation. Use the centroid method to get the best coordinates
svg
  .selectAll('pie_slice')
  .data(data_ready)
  .enter()
  .append('text')
  .text(function(d){ return d.data.key + d.data.value })
  .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  .style("text-anchor", "middle")
  .style("font-size", 17)
  }

Immi_Type_Detained_2019();