function donutchart() {
  // set the dimensions and margins of the graph
  var width = 450;
  var height = 450;
  var margin = 40;

  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  var radius = Math.min(width, height) / 2 - margin;

  // append the svg object to the div called 'my_dataviz'
  var svg = d3
    .select('#donutchart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

  // Create dummy data
  var data = {a: 76, b: 14, c: 7, d: 3};

  // set the color scale
  var color = d3
    .scaleOrdinal()
    .domain(data)
    .range(['#E27884', '#C6E6D8', '#AD8FC3', '#AADFF9']);

  // Compute the position of each group on the pie:
  var pie = d3.pie().value(function (d) {
    return d.value;
  });
  var data_ready = pie(d3.entries(data));

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  svg
    .selectAll('whatever')
    .data(data_ready)
    .enter()
    .append('path')
    .attr(
      'd',
      d3
        .arc()
        .innerRadius(100) // This is the size of the donut hole
        .outerRadius(radius)
    )
    .attr('fill', function (d) {
      return color(d.data.key);
    })
    .attr('stroke', 'black')
    .style('stroke-width', '2px')
    .style('opacity', 0.7);
}
donutchart();