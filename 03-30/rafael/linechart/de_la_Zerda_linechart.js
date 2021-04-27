drawLineChart = metric => {
  // set the dimensions and margins of the graph
  var margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = 600 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#my_dataviz")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  //Read the data
  d3.csv("dlz_linechart.csv", function(data) {

    // group the data: I want to draw one line per group
    var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
      .key(function(d) { return d.status;})
      .entries(data.filter(d => d.gender == metric));

    // Add X axis --> it is a date format
    var x = d3.scaleBand()
      .domain(data.map(function(d) { return d.range; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("stroke-width", 0.5)
      .call(d3.axisBottom(x).ticks(5))

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, 40])
      .range([ height, 0 ]);
    svg.append("g")
      .attr("stroke-width", 0.5)
      .call(d3.axisLeft(y));

    // gridlines in x axis function
    function make_x_gridlines() {		
      return d3.axisBottom(x).ticks(10)
    }

    // gridlines in y axis function
    function make_y_gridlines() {		
      return d3.axisLeft(y).ticks(10)
    }

    // add the X gridlines
    svg.append("g")			
    .attr("class", "grid")
    .attr("transform", "translate(0," + height + ")")
    .attr("stroke-width", 0.5)
    .call(make_x_gridlines()
        .tickSize(-height)
        .tickFormat("")
    )

    // add the Y gridlines
    svg.append("g")			
    .attr("class", "grid")
    .attr("stroke-width", 0.5)
    .call(make_y_gridlines()
        .tickSize(-width)
        .tickFormat("")
    )

    // color palette
    var res = sumstat.map(function(d){ return d.key }) // list of group names
    var color = d3.scaleOrdinal()
      .domain(res)
      .range(['#154718','#40a340','#b8deb8'])

    // Draw the line
    svg.selectAll(".line")
        .data(sumstat)
        .enter()
        .append("path")
        .attr("fill", "none")
        .attr("stroke", function(d){ return color(d.key) })
        .attr("stroke-width", 2.0)
        .attr("d", function(d){
          return d3.line()
            .curve(d3.curveBasis)
            .x(function(d) { return x(d.range); })
            .y(function(d) { return y(+d.percent); })
            (d.values)
        })

  })

}

var metrics = [
  "M",
  "F",
]
metrics.forEach(drawLineChart)
