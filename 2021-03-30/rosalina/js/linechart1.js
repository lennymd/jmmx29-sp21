function linechart1() {
  // set the dimensions and margins of the graph
  var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 950 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select('#linechart_1')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
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

    // lines
    // .append("text")
    // .attr("class", "line_text")
    // .attr('x', function(d) {
    //   return x(d.year) +5;
    // })
    // .attr('y', function(d) {
    //   return y(d.number);
    // })
    // .attr('fill', 'black')
    // .text("test")

    //Add series labels as text annotation to each line
    svg
      .append('text')
      .attr('x', x(2018))
      .attr('y', y(1400000))
      .text('State Prisons')
      .attr('text-anchor', 'end')
      .attr('font-size', 14);

    svg
      .append('text')
      .attr('x', x(2018))
      .attr('y', y(800000))
      .text('Local Jails')
      .attr('text-anchor', 'end')
      .attr('font-size', 14);

    svg
      .append('text')
      .attr('x', x(2018))
      .attr('y', y(250000))
      .text('Federal Prisons')
      .attr('text-anchor', 'end')
      .attr('font-size', 14);
  });
}
linechart1();
