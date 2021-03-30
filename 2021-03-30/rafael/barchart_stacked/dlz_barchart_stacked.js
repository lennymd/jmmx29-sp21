// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 20, left: 130},
  width = 900 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select('#my_dataviz')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// Parse the Data
d3.csv('./dlz_barchart_stacked.csv', function (data) {
  // List of subgroups = header of the csv files = soil condition here
  var subgroups = data.columns.slice(1);

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  var groups = d3
    .map(data, function (d) {
      return d.group;
    })
    .keys();

  var x = d3.scaleLinear().domain([0, 100]).range([0, width]);
  svg
    .append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x).tickValues([0, 25, 50, 75, 100]))
    .style("stroke-width", 3)

  // Add Y axis

  var y = d3.scaleBand().range([0, height]).domain(groups).padding(0.1);
  svg.append('g').call(d3.axisLeft(y).tickSize(0))
    .call(g => g.select(".domain").remove())
    .selectAll('text')
    .attr('x', '20')
    .attr('y', '-50')
    .style("text-anchor", "start")

  
  // color palette = one color per subgroup
  var color = d3
    .scaleOrdinal()
    .domain(subgroups)
    .range(['#154718', '#b8deb8']);

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
      return y(d.data.group);
    })
    .attr('x', function (d) {
      return x(d[0]);
    })
    .attr('width', function (d) {
      return x(d[1]) - x(d[0]);
    })
    .attr('height', 30);

    svg.append('line')
    .style("stroke", "black")
    .style("stroke-width", 3)
    .attr("x1", height)
    .attr("y1", 0)
    .attr("x2", height)
    .attr("y2", height)
});
