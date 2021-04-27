function barchart1() {
  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 60, bottom: 40, left: 150},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select('#barchart_1')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Parse the Data
  d3.csv('./data/barchart1.csv', function (data) {
    // Add X axis
    var x = d3.scaleLinear().domain([0, 35]).range([0, width]);
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      //.call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(0,0)')
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
      .padding(0.3);

    const yAxis = svg
      .append('g')
      .attr('class', 'barchart_y_axis')
      .call(d3.axisLeft(y));

    const yAxisText = yAxis
      .selectAll('text')
      .attr('class', 'barchart_y_axis_text');

    //Bars
    const bars = svg.selectAll('barchart1_bar').data(data).enter();

    bars
      .append('rect')
      .attr('class', 'barchart1_bar')
      .attr('x', x(0))
      .attr('y', function (d) {
        return y(d.Country);
      })
      .attr('width', function (d) {
        return x(d.Value);
      })
      .attr('height', y.bandwidth())
      .attr('fill', '#00557e');

    bars
      .append('text')
      .attr('class', 'barchart1_bar_text')
      .attr('x', function (d) {
        return x(d.Value) - 20;
      })
      .attr('y', function (d) {
        return y(d.Country) + y.bandwidth() / 2 + 5;
      })
      .attr('fill', 'white')
      .text(function (d) {
        return d.Value + '%';
      })
      .attr('text-anchor', 'middle');
  });
}

barchart1();
