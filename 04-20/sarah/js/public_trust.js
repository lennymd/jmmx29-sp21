function public_trust() {
  // set the dimensions and margins of the graph
  var margin = {top: 10, right: 30, bottom: 20, left: 50},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select('#chart_public_trust')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Parse the Data
  d3.csv('./data/public_trust.csv').then(function (data) {
    // List of subgroups = header of the csv files = soil condition here
    var subgroups = data.columns.slice(1);

    // List of groups = Age here = value of the first column called group -> I show them on the X axis
    var groups = d3
      .map(data, function (d) {
        return d.Age;
      })
      .keys();

    // Add X axis
    var x = d3.scaleBand().domain(groups).range([0, width]).padding([0.2]);
    svg
      .append('g')
      .attr('class', 'x_axis_trust')
      .attr('transform', 'translate(0,' + height + ')')
      .style('stroke-color', '#a7a9ac')
      .call(d3.axisBottom(x).tickSizeOuter(0));

    // Add Y axis
    var y = d3.scaleLinear().domain([0, 70]).range([height, 0]);
    svg.append('g').attr('class', 'y_axis_trust').call(d3.axisLeft(y).ticks(7));

    // d3.select('.y_axis_trust').selectAll('text').attr('dx', '5px');
    // d3.select('.y_axis_trust').selectAll('line').attr('dx', '5px');
    // color palette = one color per subgroup
    var color = d3
      .scaleOrdinal()
      .domain(subgroups)
      .range(['#c63554', '#ec5e3e']);

    //stack the data? --> stack per subgroup
    var stackedData = d3.stack().keys(subgroups)(data);

    // Show the bars
    svg
      .append('g')
      .selectAll('g')
      // Enter in the stack data = loop key per key = group per group
      .data(stackedData)
      .enter()
      .append('g')
      .attr('fill', function (d) {
        return color(d.key);
      })
      .selectAll('rect')
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data(function (d) {
        return d;
      })
      .enter()
      .append('rect')
      .attr('class', 'my_bars')
      .attr('x', function (d) {
        return x(d.data.Age);
      })
      .attr('y', function (d) {
        return y(d[1]);
      })
      .attr('height', function (d) {
        return y(d[0]) - y(d[1]);
      })
      .attr('width', x.bandwidth());

    svg
      .append('line')
      .attr('x1', -6)
      .attr('y1', height)
      .attr('x2', width + 1)
      .attr('y2', height)
      .attr('stroke', 'white')
      .attr('stroke-width', 2);
  });
}

public_trust();
