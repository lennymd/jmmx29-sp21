function linechart1() {
  // set the dimensions and margins of the graph
  var margin = {top: 60, right: 30, bottom: 30, left: 60},
    width = 600 - margin.left - margin.right,
    height = 380 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select('#linechart_1')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .style('margin', '0 auto')
    .style('display', 'block')
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  //Read the data
  d3.csv('./data/linechart1.csv', function (data) {
    // group the data: I want to draw one line per group
    var sumstat = d3
      .nest() // nest function allows to group the calculation per level of a factor
      .key(function (d) {
        return d.type;
      })
      .entries(data);

    // Add X axis --> it is a date format
    var x = d3
      .scaleLinear()
      .domain(
        d3.extent(data, function (d) {
          return d.year;
        })
      )
      .range([0, width]);
    svg
      .append('g')
      .attr('class', 'x_axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x).tickSize(-height).tickFormat(d3.format('d')));
    
    d3.selectAll('.x_axis').selectAll('text')
      .attr('dy', '15px');
    // Add Y axis
    var y = d3.scaleLinear().domain([0, 1500000]).range([height, 0]).nice();
    svg
      .append('g')
      .attr('class', 'y_axis')
      .call(
        d3
          .axisLeft(y)
          .tickSize(-width)
          .tickFormat(function (d) {
            return d / 1000;
          })
      );
    d3.selectAll('.y_axis').selectAll('text')
      .attr('dx', '-5px');

    // color palette
    var res = sumstat.map(function (d) {
      return d.key;
    }); // list of group names
    var color = d3
      .scaleOrdinal()
      .domain(res)
      .range(['black', '#fbccb1', '#84abb3']);

    // Draw the line
    const lines = svg.selectAll('.line').data(sumstat).enter();

    lines
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', function (d) {
        return color(d.key);
      })
      .attr('stroke-width', 2.0)
      .attr('d', function (d) {
        return d3
          .line()
          .x(function (d) {
            return x(d.year);
          })
          .y(function (d) {
            return y(+d.number);
          })(d.values);
      });

    // Add Chart Title and Subtitle 
    svg
    .append('text')
    .attr('class', 'linechart1_title_text')
    .attr('x', -35)
    .attr('y', 0 - (margin.top / 2))
    .text('Prison Population Over Time, 1983-2018')

    svg
    .append('text')
    .attr('class', 'linechart1_subtitle_text')
    .attr('x', -35)
    .attr('y', 15 - (margin.top / 2))
    .text('(in thousands)')

    //Add series labels as text annotation to each line
    svg
      .append('text')
      .attr('x', x(2018))
      .attr('y', y(1350000))
      .text('State Prisons')
      .attr('text-anchor', 'end')
      .attr('font-size', 14)
      .attr('font-weight', 'bold');

    svg
      .append('text')
      .attr('x', x(2018))
      .attr('y', y(775000))
      .text('Local Jails')
      .attr('text-anchor', 'end')
      .attr('font-size', 14)
      .attr('font-weight', 'bold');

    svg
      .append('text')
      .attr('x', x(2018))
      .attr('y', y(225000))
      .text('Federal Prisons')
      .attr('text-anchor', 'end')
      .attr('font-size', 14)
      .attr('font-weight', 'bold');
  });
}
linechart1();
