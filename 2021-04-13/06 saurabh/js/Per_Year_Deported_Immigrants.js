function Per_Year_Deported_Immigrants() {
  // set the dimensions and margins of the graph
  var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 860 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select('#Per_Year_Deported_Immigrants')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  //Read the data
  d3.csv('./data/Per_Year_Deported_Immigrants.csv', function (data) {
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
      .attr('class', 'x_axis')
      // .style('fill', 'cornflowerblue')
      .attr('transform', 'translate(0,' + height + ')')
      .call(
        d3
          .axisBottom(x)
          .tickSize(-width)
          .tickFormat(function (d) {
            return d;
          })
      );

    // Add Y axis
    var y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function (d) {
          return +d.Removals;
        }),
      ])
      .range([height, 0]);
    svg
      .append('g')
      .attr('class', 'y_axis')
      .call(
        d3
          .axisLeft(y)
          .tickSize(-width)
          .ticks(7)
          .tickFormat(function (d) {
            return +d;
          })
      );

    // Add the line
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        d3
          .line()
          .x(function (d) {
            return x(d.Year);
          })
          .y(function (d) {
            return y(d.Removals);
          })
      );

    // Add dots to specific years.
    const dots = svg
      .selectAll('specialYears')
      .data(data)
      .enter()
      .append('circle')
      .attr('fill', function (d) {
        if (d.Special == 1) {
          return '#f9423a';
        } else {
          return 'transparent';
        }
      })
      .attr('cx', function (d) {
        return x(d.Year);
      })
      .attr('cy', function (d) {
        return y(d.Removals);
      })
      .attr('r', 5);

    svg
      .append('text')
      .attr('x', x(1986))
      .attr('y', y(35))
      .text('IRCA')
      .attr('text-anchor', 'middle').attr('font-size', '12px');
  });
}

Per_Year_Deported_Immigrants();
