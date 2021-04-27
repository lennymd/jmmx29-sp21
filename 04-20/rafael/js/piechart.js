var drawPieChart = metric => {

  // set the dimensions and margins of the graph
  var width = 300
      height = 300
      margin = 50

  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  var radius = Math.min(width, height) / 2 - margin

  d3.csv("./data/data_piechart.csv", function(data) {

    var percents = d3.map(data, function(d){return(d.percent)}).keys()
    var texts = d3.map(data, function(d){return(d.text)}).keys()

    // append the svg object to the div called 'my_dataviz'
    var svg = d3.select("#piechart")
      .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Create dummy data
    var p = percents[metric]
    var data = {a: p, b: 1-p}

    // set the color scale
    colors = metric < 2 ? ['#40a340','#b8deb8'] : ['#154718','#40a340']
    var color = d3.scaleOrdinal()
      .domain(data)
      .range(colors)

    // Compute the position of each group on the pie:
    var pie = d3.pie()
      .value(function(d) {return d.value })
    var data_ready = pie(d3.entries(data))

    // shape helper to build arcs:
    var arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
      .endAngle(function(d) { return -d.endAngle })

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll('mySlices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arcGenerator)
      .attr('fill', function(d){ return(color(d.data.key)) })

    // Now add the annotation. Use the centroid method to get the best coordinates
    svg.append("text")
      .attr("x", radius * Math.sin(Math.PI * p) / 2)
      .attr("y", radius * -Math.cos(Math.PI * p) / 2)
      .attr('text-anchor', 'middle')
      .text(`${p * 100}%`)
      .style("font-size", 26)
      .style("fill", "white")

    svg.append("text")
      .attr("x", 0)
      .attr("y", 130)
      .attr('text-anchor', 'middle')
      .text(texts[metric])
      .style("font-size", 10)
      .style("fill", "black")

  })
}

var metrics = [
  0,
  1,
  2,
  3
]
metrics.forEach(drawPieChart)