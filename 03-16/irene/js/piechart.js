function piechart() {
  // set the dimensions and margins of the graph
  var width = 200;
  height = 200;
  margin = 40;

  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  var radius = Math.min(width, height) / 2 - margin;
  // Create dummy data
  let pie_data = [
    {a: 53, b: 47},
    {a: 33, b: 67},
    {a: 23, b: 77},
    {a: 16, b: 84},
  ];
  let titles = ['Asian American', 'White', 'Black', 'Hispanic'];
  console.log(pie_data.length);

  for (let i = 0; i < pie_data.length; i++) {
    var data = pie_data[i];
    // append the svg object to the div called 'multiple_degrees'
    var svg = d3
      .select('#multiple_degrees')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    // set the color scale
    var color = d3.scaleOrdinal().domain(data).range(['purple', 'green']);

    // Compute the position of each group on the pie:
    var pie = d3.pie().value(function (d) {
      return d.value;
    });
    var data_ready = pie(d3.entries(data));
    // Now I know that group A goes from 0 degrees to x degrees and so on.

    // shape helper to build arcs:
    var arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll('mySlices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arcGenerator)
      .attr('fill', function (d) {
        return color(d.data.key);
      })
      .attr('stroke', 'transparent')
      .style('stroke-width', '2px')
      .style('opacity', 0.7);

    // Now add the annotation. Use the centroid method to get the best coordinates
    svg
      .selectAll('mySlices')
      .data(data_ready)
      .enter()
      .append('text')
      .text(function (d, i) {
        if (i == 0) {
          return d.data.value + '%';
        }
      })
      .attr('transform', function (d) {
        return 'translate(' + arcGenerator.centroid(d) + ')';
      })
      .style('text-anchor', 'middle')
      .style('font-size', 17);

    svg
      .append('text')
      .text(titles[i])
      .attr('class', 'piechart_title')
      .attr('x', 0)
      .attr('y', 80)
      .attr('fill', '#000')
      .attr('text-anchor', 'middle');
  }
}
piechart();
