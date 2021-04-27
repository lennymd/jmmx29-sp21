function linechart() {
  // set the dimensions and margins of the graph
  var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select('#linechart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .style('margin', '0 auto')
    .style('display', 'block')
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  //Read the data
  d3.csv('./data/data_linechart.csv').then(function (data) {
    // group the data: I want to draw one line per group
    var sumstat = d3
      .nest() // nest function allows to group the calculation per level of a factor
      .key(function (d) {
        return d.Age_Group;
      })
      .entries(data);

    // Add X axis --> it is a date format
    var x = d3
      .scaleLinear()
      .domain(
        d3.extent(data, function (d) {
          return d.Year;
        })
      )
      .range([0, width]);
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x).ticks(5));

    // Add Y axis
    var y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function (d) {
          return +d.Percentage;
        }),
      ])
      .range([height, 0]);
    svg.append('g').call(d3.axisLeft(y));

    // color palette
    var res = sumstat.map(function (d) {
      return d.key;
    }); // list of group names
    var color = d3
      .scaleOrdinal()
      .domain(res)
      .range([
        '#e41a1c',
        '#377eb8',
        '#4daf4a',
        '#984ea3',
        '#ff7f00',
        '#ffff33',
        '#a65628',
        '#f781bf',
        '#999999',
      ]);

    // Draw the line
    svg
      .selectAll('.line')
      .data(sumstat)
      .enter()
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', function (d) {
        return color(d.key);
      })
      .attr('stroke-width', 1.5)
      .attr('d', function (d) {
        return d3
          .line()
          .x(function (d) {
            return x(d.Year);
          })
          .y(function (d) {
            return y(+d.Percentage);
          })(d.values);
      });
  });
}
linechart();