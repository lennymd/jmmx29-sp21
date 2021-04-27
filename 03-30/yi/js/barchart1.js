// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
  width = 460 - margin.left - margin.right,
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
d3.csv('./data/myData.csv', function (data) {
  // X axis
  var x = d3
    .scaleBand()
    .range([0, width])
    .domain(
      data.map(function (d) {
        return d.Country;
      })
    )
    .padding(0.2);

  // svg
  //   .append('g')
  //   .attr('transform', 'translate(0,' + height + ')')
  //   .call(d3.axisBottom(x))
  //   .selectAll('text')
  //   .style('text-anchor', 'middle');

  // Add Y axis
  var y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function (d) {
        return +d.Value;
      }),
    ])
    .range([height, 0]);
  svg.append('g').call(d3.axisLeft(y));

  var colorScale = d3
    .scaleOrdinal()
    .domain(['Unsaturated fat', 'Protein', 'Sugar', 'Fiber'])
    .range(['brown', 'red', 'blue', 'green']);
  // Bars
  svg
    .selectAll('mybar')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', function (d) {
      return x(d.Country);
    })
    .attr('y', function (d) {
      return y(d.Value);
    })
    .attr('width', x.bandwidth())
    .attr('height', function (d) {
      return height - y(d.Value);
    })
    .attr('fill', function (d) {
      return colorScale(d.Country);
    });
});
