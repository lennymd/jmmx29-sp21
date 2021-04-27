function heatmap() {
  // set the dimensions and margins of the graph
  var margin = {top: 60, right: 25, bottom: 1, left: 200},
    width = 1540 - margin.left - margin.right,
    height = 575 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select('#pose-benefits')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  //Read the data
  d3.csv('./data/yoga-benefits-heat-map.csv', function (data) {
    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    var myGroups = d3
      .map(data, function (d) {
        return d['Sub-group'];
      })
      .keys();
    var myVars = d3
      .map(data, function (d) {
        return d['Yoga Pose'];
      })
      .keys();

    // Build X scales and axis:
    var x = d3.scaleBand().range([0, width]).domain(myGroups).padding(0.1);
    svg
      .append('g')
      .style('font-size', 14)
      .attr('class', 'heatmap_x_axis')
      // .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisTop(x).tickSize(0))
      .select('.domain')
      .remove();

    const xAxisText = d3.select('.heatmap_x_axis').selectAll('text');
    console.log(xAxisText);
    // TODO fix extra wide labels

    // Build Y scales and axis:
    var y = d3.scaleBand().range([0, height]).domain(myVars).padding(0.25);
    svg.append('g').style('font-size', 15).call(d3.axisLeft(y).tickSize(0)).select('.domain').remove();

    // Build color scale
    var myColor = d3.scaleOrdinal().domain([0, 1, 2, 3]).range(['#ffffff', '#f27d90', '#de1f6f', '#106ea1']);

    // #dfdfdf
    // // create a tooltip
    // var tooltip = d3
    //   .select('#pose-benefits')
    //   .append('div')
    //   .style('opacity', 0)
    //   .attr('class', 'tooltip')
    //   .style('background-color', 'white')
    //   .style('border', 'solid')
    //   .style('border-width', '2px')
    //   .style('border-radius', '5px')
    //   .style('padding', '5px');

    // // Three function that change the tooltip when user hover / move / leave a cell
    // var mouseover = function (d) {
    //   tooltip.style('opacity', 1);
    //   d3.select(this).style('stroke', 'black').style('opacity', 1);
    // };
    // var mousemove = function (d) {
    //   tooltip
    //     .html('The exact value of<br>this cell is: ' + d.value)
    //     .style('left', d3.mouse(this)[0] + 70 + 'px')
    //     .style('top', d3.mouse(this)[1] + 'px');
    // };
    // var mouseleave = function (d) {
    //   tooltip.style('opacity', 0);
    //   d3.select(this).style('stroke', 'none').style('opacity', 0.8);
    // };

    // add the squares
    svg
      .selectAll()
      .data(data, function (d) {
        return d['Sub-group'] + ':' + d['Yoga Pose'];
      })
      .enter()
      .append('rect')
      .attr('x', function (d) {
        return x(d['Sub-group']);
      })
      .attr('y', function (d) {
        return y(d['Yoga Pose']);
      })
      .attr('rx', 10)
      .attr('ry', 20)
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .style('fill', function (d) {
        return myColor(d['yes-no color value']);
      })
      .style('stroke-width', 2)
      .style('stroke', function (d) {
        if (d['yes-no color value'] == 0) {
          return '#dfdfdf';
        } else {
          return myColor(d['yes-no color value']);
        }
      })
      .style('opacity', 0.8);
    // .on('mouseover', mouseover)
    // .on('mousemove', mousemove)
    // .on('mouseleave', mouseleave);
  });

  // Add title to graph
  // svg.append('text').attr('x', 0).attr('y', -50).attr('text-anchor', 'left').style('font-size', '22px');
  // .text('A d3.js heatmap');

  // Add subtitle to graph
  // svg
  //   .append('text')
  //   .attr('x', 0)
  //   .attr('y', -20)
  //   .attr('text-anchor', 'left')
  //   .style('font-size', '14px')
  //   .style('fill', 'grey')
  //   .style('max-width', 400);
  // .text('A short description of the take-away message of this chart.');
}
heatmap();
