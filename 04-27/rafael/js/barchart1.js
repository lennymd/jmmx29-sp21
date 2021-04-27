function barchart1() {
  // set the dimensions and margins of the graph
  var margin = {top: 110, right: 30, bottom: 10, left: 110},
    width = 800 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select('#barchart1')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', 120 + height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Parse the Data
  d3.csv('./data/data_barchart1.csv', function (data) {
    // List of subgroups = header of the csv files = soil condition here
    var subgroups = data.columns.slice(2);

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    var groups = d3
      .map(data, function (d) {
        return d.group;
      })
      .keys();

    // color palette = one color per subgroup
    var color = d3
      .scaleOrdinal()
      .domain(subgroups)
      .range(['#266a3e', '#67b05c', '#b5dba7']);

    drawBarChart = metric => {
      var trans = 120 * metrics.indexOf(metric);

      // Add X axis
      var x = d3.scaleBand().domain(groups).range([0, width]).padding([0]);
      svg
        .append('g')
        .attr('transform', 'translate(0,' + (trans + -80) + ')')
        .call(d3.axisBottom(x).tickSize(0))
        .call(g => g.select('.domain').remove())
        .style('text-anchor', 'left')
        .style('font-size', '14px')
        .selectAll('text')
        .filter(function () {
          return metrics.indexOf(metric) > 0;
        })
        .remove();

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 2000]).range([height, 0]);
      svg
        .append('g')
        .attr('transform', 'translate(0,' + trans + ')')
        .call(d3.axisLeft(y).ticks(2).tickSize(5))
        .call(g => g.select('.domain').remove())
        .style('font-family', 'MS UI Gothic')
        .style('font-size', '13px');

      // Another scale for subgroup position?
      var xSubgroup = d3
        .scaleBand()
        .domain(subgroups)
        .range([0, x.bandwidth()])
        .padding([0.1]);

      // Show the bars
      svg
        .append('g')
        .selectAll('g')
        // Enter in data = loop group per group
        .data(data.filter(d => d.gender == metric))
        .enter()
        .append('g')
        .attr('transform', function (d) {
          return 'translate(' + x(d.group) + ',' + trans + ')';
        })
        .selectAll('rect')
        .data(function (d) {
          return subgroups.map(function (key) {
            return {key: key, value: d[key]};
          });
        })
        .enter()
        .append('rect')
        .attr('x', function (d) {
          return xSubgroup(d.key);
        })
        .attr('y', function (d) {
          return y(d.value);
        })
        .attr('width', xSubgroup.bandwidth())
        .attr('height', function (d) {
          return height - y(d.value);
        })
        .attr('fill', function (d) {
          return color(d.key);
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
        .attr('x', -60)
        .attr('y', 140 * metrics.indexOf(metric))
        .text(function (d) {
          return d;
        })
        .attr('text-anchor', 'end')
        .style('font-family', 'MS UI Gothic')
        .style('font-size', '16px')
        .style('fill', '#154718');
    };

    // Add one dot in the legend for each name.
    var size = 25;
    svg
      .selectAll('mydots')
      .data(subgroups)
      .enter()
      .append('rect')
      .attr('x', function (d, i) {
        return 120 * i;
      })
      .attr('y', -110)
      .attr('width', size)
      .attr('height', size)
      .style('fill', function (d) {
        return color(d);
      });

    // Add one dot in the legend for each name.
    svg
      .selectAll('mylabels')
      .data(subgroups)
      .enter()
      .append('text')
      .attr('x', function (d, i) {
        return 40 + 120 * i;
      })
      .attr('y', -100)
      .style('fill', 'black')
      .text(function (d) {
        return d;
      })
      .attr('text-anchor', 'left')
      .style('alignment-baseline', 'middle');

    var metrics = ['Men', 'Women'];
    metrics.forEach(drawBarChart);
  });
}
barchart1();
