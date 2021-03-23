function dotplot_gender() {
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 40, left: 100 },
      width = 460 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
  
    // append the svg object to the body of the page
    var svg = d3.select("#dotplot_gender")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
  
    // Parse the Data
    d3.csv("./data/gender.csv", function (data) {
  
      // Add X axis
      var x = d3.scaleLinear()
        .domain([0, 15])
        .range([0, width]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(4))
        .selectAll("text")
        .attr("class", "dotplot_x_axis_text")
        .style("text-anchor", "middle");
  
      // Y axis
      var y = d3.scaleBand()
        .range([0, height])
        .domain(data.map(function (d) { return d.Country; }))
        .padding(1);
        svg.append("g")
        .call(d3.axisLeft(y).tickSizeOuter([0]))
        .selectAll("text")
        .attr("class", "dotplot_y_axis_text")
  
  
      // Lines
      svg.selectAll("myline")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", function (d) { return x(15); })
        .attr("x2", x(0))
        .attr("y1", function (d) { return y(d.Country); })
        .attr("y2", function (d) { return y(d.Country); })
        .attr("stroke", "grey")
  
      // Circles
      svg.selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.Value); })
        .attr("cy", function (d) { return y(d.Country); })
        .attr("r", "4")
        .style("fill", "#69b3a2")
        .attr("stroke", "black")
    })
  }
  dotplot_gender();