function piechart() {
  // set the dimensions and margins of the graph
  var width = 140;
  height = 300;
  margin = 20;

  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  var radius = Math.min(width, height) / 2 - margin;

  // append the svg object to the div called 'my_dataviz'
  var svg = d3
    .select('#piechart')
    .append('svg')
    .attr('width', 200 + width + 2 * margin)
    .attr('height', height + 2 * margin)
    .append('g');

  d3.csv('./data/data_piechart.csv', function (data) {
    var percents = d3
      .map(data, function (d) {
        return d.percent;
      })
      .keys();
    var texts = d3
      .map(data, function (d) {
        return d.text;
      })
      .keys();

    var drawPieChart = metric => {
      var xTrans = 220 * (metric % 2);
      var yTrans = 176 * Math.floor(metric / 2);

      // Create dummy data
      var p = percents[metric];
      var data = {a: p, b: 1 - p};

      // set the color scale
      colors = metric < 2 ? ['#67b05c', '#b5dba7'] : ['#266a3e', '#67b05c'];
      var color = d3.scaleOrdinal().domain(data).range(colors);

      // Compute the position of each group on the pie:
      var pie = d3.pie().value(function (d) {
        return d.value;
      });
      var data_ready = pie(d3.entries(data));

      // shape helper to build arcs:
      var arcGenerator = d3
        .arc()
        .innerRadius(0)
        .outerRadius(radius)
        .endAngle(function (d) {
          return -d.endAngle;
        });

      // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
      svg
        .append('svg')
        .attr('width', 380)
        .attr('height', 310)
        .append('g')
        .attr(
          'transform',
          'translate(' + (xTrans + 110) + ',' + (yTrans + 75) + ')'
        )
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arcGenerator)
        .attr('fill', function (d) {
          return color(d.data.key);
        });

      // Now add the annotation. Use the centroid method to get the best coordinates
      svg
        .append('text')
        .attr('x', xTrans + 110 + (radius * Math.sin(Math.PI * p)) / 2)
        .attr('y', yTrans + 80 + (radius * -Math.cos(Math.PI * p)) / 2)
        .attr('text-anchor', 'middle')
        .text(`${p * 100}%`)
        .style('font-size', 15)
        .style('fill', 'white');

      svg
        .append('text')
        .attr('x', xTrans)
        .attr('y', yTrans + 150)
        .attr('text-anchor', 'middle')
        .text(texts[metric])
        .style('font-size', 10)
        .style('fill', 'black');
    };

    var metrics = [0, 1, 2, 3];
    metrics.forEach(drawPieChart);
  });
}
piechart();
