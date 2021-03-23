function piechart() {
  // set the dimensions and margins of the graph
  let width = 200;
  let height = 200;
  let margin = 50;

  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  var radius = Math.min(width, height) / 2 - margin;

  // Create dummy data
  let pie_data = [
    {a: 54, b: 46},
    {a: 52, b: 48},
    {a: 51, b: 49},
    {a: 43, b: 57},
    {a: 41, b: 59},
    {a: 30, b: 70},
    {a: 21, b: 79},
    {a: 20, b: 80},
  ];

  let titles = [
    'Release Tension ',
    'Boost Mental and Physical Strength',
    'Alleviate Stress',
    'Feel happier',
    'Get a Workout',
    'Ease Physical AilmentsEase Physical Ailments',
    'Feel Less Lonely',
    'Detach from Technology',
  ];
  console.log(pie_data.length);

  for (let i = 0; i < pie_data.length; i++) {
    var data = pie_data[i];
    // append the svg object to the div called 'trends-pie'
    var svg = d3
      .select('#trends-pie')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    // set the color scale
    var color = d3.scaleOrdinal().domain(data).range(['#f27d90', 'white']);

    // Compute the position of each group on the pie:
    var pie = d3.pie().value(function (d) {
      return d.value;
    });
    var data_ready = pie(d3.entries(data));
    // Now I know that group A goes from 0 degrees to x degrees and so on.

    // shape helper to build arcs:
    var arcGenerator = d3.arc().innerRadius(100).outerRadius(radius);
    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll('pie_slice')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arcGenerator)
      .attr('fill', function (d) {
        return color(d.data.key);
      })
      .attr('stroke', '#93a0a8')
      .style('stroke-width', '2px')
      .style('opacity', 0.7);

    // Now add the annotation. Use the centroid method to get the best coordinates
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
