function Money_Paid_Pvt_Prison() {
  // set the dimensions and margins of the graph
  var margin = {top: 10, right: 40, bottom: 20, left: 30},
    width = 900 - margin.left - margin.right,
    height = 375 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select('#Money_Paid_Pvt_Prison')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Parse the Data
  d3.csv('./data/Money_Paid_Pvt_Prison.csv', function (data) {
    // List of subgroups = header of the csv files = soil condition here
    var subgroups = data.columns.slice(1);

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    var groups = d3
      .map(data, function (d) {
        return d.Year;
      })
      .keys();

    var x = d3.scaleLinear().domain([0, 450000000]).range([0, width]);
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    // Add Y axis

    var y = d3.scaleBand().range([0, height]).domain(groups).padding(0.1);
    svg.append('g').call(d3.axisLeft(y));

    // color palette = one color per subgroup
    var color = d3
      .scaleOrdinal()
      .domain(subgroups)
      .range(['#3399CC', '#FF9933', '#993333', '#333399', '#FF3333']);

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
      .attr('y', function (d) {
        return y(d.data.Year);
      })
      .attr('x', function (d) {
        return x(d[0]);
      })
      .attr('width', function (d) {
        return x(d[1]) - x(d[0]);
      })
      .attr('height', y.bandwidth());
  });
}

Money_Paid_Pvt_Prison();
