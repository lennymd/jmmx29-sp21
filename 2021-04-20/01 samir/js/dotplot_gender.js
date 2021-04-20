function dotplot_gender() {
  // set the dimensions and margins of the graph
  var margin = {top: 10, right: 30, bottom: 40, left: 100},
    width = 760 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select('#dotplot_gender')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Parse the Data
  d3.csv('./data/gender.csv', function (data) {
    // Add X axis
    var x = d3.scaleLinear().domain([0, 15]).range([0, width]);
    svg
      .append('g')
      .attr('class', 'x_axis_dotplot')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x).ticks(4))
      .selectAll('text')
      .style('text-anchor', 'middle');

    // Y axis
    var y = d3
      .scaleBand()
      .range([0, height])
      .domain(
        data.map(function (d) {
          return d.Country;
        })
      )
      .padding(1);
    svg
      .append('g')
      .attr('class', 'dotplot_y_axis')
      .call(d3.axisLeft(y).tickSize(-width))
      .selectAll('text');

    // Lines
    svg
      .selectAll('myline')
      .data(data)
      .enter()
      .append('line')
      // .attr("x1", function (d) { return x(15); })
      .attr('x2', x(0))
      .attr('y1', function (d) {
        return y(d.Country);
      })
      .attr('y2', function (d) {
        return y(d.Country);
      })
      .attr('stroke', 'grey');

    // Circles
    svg
      .selectAll('mycircle')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'fas camera')
      .attr('x', function (d) {
        return x(d.Value);
      })
      .attr('y', function (d) {
        return y(d.Country);
      })
      .attr('text-anchor', 'middle')
      .text('text')
      .attr('font-size', '29px')
      .attr('fill', 'cornflowerblue')
      .attr('stroke', 'black')
      .attr('dy', '10');
  });
}
dotplot_gender();
