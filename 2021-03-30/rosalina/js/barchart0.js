function barchart0(location, dataset, useDollarSign) {
  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 60, bottom: 40, left: 150},
    width = 460 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select(location)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Parse the Data
  d3.csv(dataset, function (data) {
    // Add X axis
    var x = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function (d) {
          return d.Value;
        }),
      ])
      .range([0, width])
      .nice();
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

    var formatComma = d3.format(',');
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
        if (useDollarSign == true) {
          return '$' + formatComma(d.Value);
        } else {
          return d.Value + '%';
        }
      })
      .attr('text-anchor', 'middle');
  });
}

barchart0('#barchart_1', './data/barchart1.csv', false);
barchart0('#barchart_2', './data/barchart2.csv', true);
