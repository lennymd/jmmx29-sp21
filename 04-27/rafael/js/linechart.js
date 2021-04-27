function linechart() {
  // set the dimensions and margins of the graph
  var margin = {top: 100, right: 10, bottom: 30, left: 20},
    width = 1200 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select('#linechart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', 380 + height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  //Read the data
  d3.csv('./data/data_linechart.csv', function (data) {
    // group the data: I want to draw one line per group
    var sumstat = d3
      .nest() // nest function allows to group the calculation per level of a factor
      .key(function (d) {
        return d.status;
      })
      .entries(data);

    // color palette
    var res = sumstat.map(function (d) {
      return d.key;
    }); // list of group names
    var color = d3
      .scaleOrdinal()
      .domain(res)
      .range(['#154718', '#40a340', '#b8deb8']);

    drawLineChart = metric => {
      var trans = 370 * metrics.indexOf(metric);

      sumstat = d3
        .nest()
        .key(function (d) {
          return d.status;
        })
        .entries(data.filter(d => d.gender == metric));

      // Add X axis --> it is a date format
      var x = d3
        .scaleBand()
        .domain(
          data.map(function (d) {
            return d.range;
          })
        )
        .range([0, width]);
      svg
        .append('g')
        .attr('transform', 'translate(0,' + (trans + height) + ')')
        .attr('stroke-width', 0.5)
        .call(d3.axisBottom(x).ticks(5))
        .style('font-family', 'MS UI Gothic');

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 40]).range([height, 0]);
      svg
        .append('g')
        .attr('transform', 'translate(0,' + trans + ')')
        .attr('stroke-width', 0.5)
        .call(d3.axisLeft(y))
        .style('font-family', 'MS UI Gothic');

      // gridlines in x axis function
      function make_x_gridlines() {
        return d3.axisBottom(x).ticks(10);
      }

      // gridlines in y axis function
      function make_y_gridlines() {
        return d3.axisLeft(y).ticks(10);
      }

      // add the X gridlines
      svg
        .append('g')
        .attr('class', 'grid')
        .attr('transform', 'translate(0,' + (trans + height) + ')')
        .attr('stroke-width', 0.5)
        .call(make_x_gridlines().tickSize(-height).tickFormat(''));

      // add the Y gridlines
      svg
        .append('g')
        .attr('transform', 'translate(0,' + trans + ')')
        .attr('class', 'grid')
        .attr('stroke-width', 0.5)
        .call(make_y_gridlines().tickSize(-width).tickFormat(''));

      // Draw the line
      svg
        .selectAll('.line')
        .data(sumstat)
        .enter()
        .append('path')
        .attr('transform', 'translate(0,' + trans + ')')
        .attr('fill', 'none')
        .attr('stroke', function (d) {
          return color(d.key);
        })
        .attr('stroke-width', 2.0)
        .attr('d', function (d) {
          return d3
            .line()
            .curve(d3.curveBasis)
            .x(function (d) {
              return x(d.range);
            })
            .y(function (d) {
              return y(+d.percent);
            })(d.values);
        });

      var gender = d3
        .nest()
        .key(function (d) {
          return d.gender;
        })
        .entries(data.filter(d => d.gender == metric))
        .map(function (d) {
          return d.key;
        });

      svg
        .selectAll('mylabels')
        .data(gender)
        .enter()
        .append('text')
        .attr('x', 0)
        .attr('y', -20 + 365 * metrics.indexOf(metric))
        .text(function (d) {
          return d;
        })
        .style('font-family', 'MS UI Gothic')
        .style('font-size', '26px')
        .style('fill', '#154718');
    };

    // Add one dot in the legend for each name.
    var size = 25;
    svg
      .selectAll('mydots')
      .data(res)
      .enter()
      .append('rect')
      .attr('x', function (d, i) {
        return -20 + 200 * i;
      })
      .attr('y', -95)
      .attr('width', size)
      .attr('height', size)
      .style('fill', function (d) {
        return color(d);
      });

    // Add one dot in the legend for each name.
    svg
      .selectAll('mylabels')
      .data(res)
      .enter()
      .append('text')
      .attr('x', function (d, i) {
        return 16 + 200 * i;
      })
      .attr('y', -80)
      .text(function (d) {
        return d;
      })
      .style('alignment-baseline', 'middle');

    var metrics = ['Men', 'Women'];
    metrics.forEach(drawLineChart);
  });
}
linechart();
