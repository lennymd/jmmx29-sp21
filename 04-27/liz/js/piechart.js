function piechart() {
  // set the dimensions and margins of the graph
  let width = 300;
  let height = 370;
  let margin = 50;

  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  var radius = Math.min(width, height) / 2 - margin;
  console.log(radius);
  // Create dummy data
  let pie_data = [
    {a: 54, b: 46},
    {a: 52, b: 48},
    {a: 51, b: 49},
    {a: 43, b: 57},
    {a: 41, b: 59},
    {a: 31, b: 69},
    {a: 30, b: 70},
    {a: 27, b: 73},
    {a: 21, b: 79},
    {a: 20, b: 80},
  ];

  let titles = [
    'Release Tension ',
    '<tspan dx="0" dy="0">Boost Mental and</tspan> <tspan dy="35" dx="-170">Physical Strength</tspan>',
    'Alleviate Stress',
    'Feel happier',
    'Get a Workout',
    'Relaxation',
    'Ease Physical Ailments',
    'Create Personal Time',
    'Feel Less Lonely',
    'Detach from Technology',
  ];

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
    var arcGenerator = d3.arc().innerRadius(50).outerRadius(radius);
    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 100)
      .attr('fill', 'none')
      .attr('stroke', '#93a0a8')
      .attr('stroke-width', 2);

    svg
      .selectAll('pie_slice')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arcGenerator)
      .attr('fill', function (d) {
        return color(d.data.key);
      })
      .style('opacity', 0.7);

    // svg.attr('transform', function (d) {
    //   if (d.data.key == 'a') {
    //     console.log(d);
    //     let percentage = d.value;
    //     if (percentage < 50) {
    //       console.log('smaller');
    //       return `scale(-1)`;
    //     } else {
    //       return `scale(0)`;
    //     }
    //   }
    // });

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
      // .attr('transform', function (d) {
      //   return 'translate(' + arcGenerator.centroid(d) + ')';
      // })
      .attr('dy', '15px')
      .attr('text-anchor', 'middle')
      .attr('font-size', 40)
      .attr('fill', '#106ea1')
      .attr('font-weight', 900);

    svg
      .append('text')
      .html(titles[i])
      .attr('class', 'piechart_title')
      .attr('x', 0)
      .attr('y', 140)
      .attr('fill', '#000')
      .attr('text-anchor', 'middle')
      .attr('font-size', 21);
  }
}
piechart();
