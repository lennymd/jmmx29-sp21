function accuracy() {
  // set the dimensions and margins of the graph
  var margin = {top: 10, right: 30, bottom: 20, left: 50},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select('#chart_accuracy')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Parse the Data
  d3.csv('./data/accuracy.csv', function (data) {
    // X axis
    var x = d3
      .scaleBand()
      .range([0, width])
      .domain(
        data.map(function (d) {
          return d.Method;
        })
      )
      .padding(0.2);
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(0,0)rotate(0)')
      .style('text-anchor', 'center');

    // Add Y axis
    var y = d3.scaleLinear().domain([0, 100]).range([height, 0]);
    svg.append('g').call(d3.axisLeft(y));

    // Bars
    svg
      .selectAll('mybar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', function (d) {
        return x(d.Method);
      })
      .attr('y', function (d) {
        return y(d.Value);
      })
      .attr('width', x.bandwidth())
      .attr('height', function (d) {
        return height - y(d.Value);
      })
      .attr('fill', '#ec5e3e');
  });
}
accuracy();
