function barchart_stacked() {
  // set the dimensions and margins of the graph
  var margin = {top: 70, right: 30, bottom: 20, left: 10},
    width = 660 - margin.left - margin.right,
    height = 230 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select('#barchart_stacked')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', 260 + height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Parse the Data
  d3.csv('./data/data_barchart_stacked.csv', function (data) {
    // List of subgroups = header of the csv files = soil condition here
    var subgroups = data.columns.slice(2);

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    var groups = d3.map(data, function (d) {return d.group;}).keys();

    drawStackedBarChart = metric => {
      var trans = 260 * metrics.indexOf(metric);

      var x = d3.scaleLinear().domain([0, 100]).range([0, width]);
      svg.append('g')
        .attr('transform', 'translate(0,' + (trans + height) + ')')
        .call(d3.axisBottom(x).tickValues([0, 25, 50, 75, 100]))
        .style("stroke-width", 1.5)

      // Add Y axis

      var y = d3.scaleBand().range([0, height]).domain(groups).padding(0.1);
      svg.append('g').call(d3.axisLeft(y).tickSize(0))
        .call(g => g.select(".domain").remove())
        .selectAll('text')
        .attr('x', '0')
        .attr('y', -20 + trans)
        .style("text-anchor", "start")
      
      // color palette = one color per subgroup
      var color = d3
        .scaleOrdinal()
        .domain(subgroups)
        .range(['#266a3e', '#b5dba7']);

      //stack the data? --> stack per subgroup
      var stackedData = d3.stack().keys(subgroups)(data.filter(d => d.status == metric));
      // Show the bars
      svg.append('g')
        .selectAll('g')
        // Enter in the stack data = loop key per key = group per group
        .data(stackedData)
        .enter()
        .append('g')
        .attr('fill', function (d) {return color(d.key);})
        .selectAll('rect')
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data(function (d) {return d;})
        .enter()
        .append('rect')
        .attr('y', function (d) {return trans + y(d.data.group);})
        .attr('x', function (d) {return x(d[0]);})
        .attr('width', function (d) {return x(d[1]) - x(d[0]);})
        .attr('height', 15);

        svg.append('line')
        .style("stroke", "black")
        .style("stroke-width", 1.5)
        .attr("x1", width / 2)
        .attr("y1", trans)
        .attr("x2", width / 2)
        .attr("y2", trans + height)

        var status = d3.nest()
        .key(function(d) { return d.status;})
        .entries(data.filter(d => d.status == metric))
        .map(function(d){ return d.key });

      svg.selectAll("mylabels")
        .data(status)
        .enter()
        .append("text")
        .attr("x", 0)
        .attr("y", -40 + 260 * metrics.indexOf(metric))
        .text(function(d){ return d })
        .style("font-family", "MS UI Gothic")
        .style("font-size", "25px")
        .style("fill", "#154718")
    }

    var metrics = [
      "Formerly Incarcerated",
      "General Population",
    ]
    metrics.forEach(drawStackedBarChart)

  });
}
barchart_stacked();