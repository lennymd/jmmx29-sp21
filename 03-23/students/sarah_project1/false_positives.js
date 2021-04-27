function false_positives() {
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 100, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#chart_false_positives")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("false_positives.csv", function(data) {

  // Add X axis
//   var x = d3.scaleLinear()
//     .domain([0, 4000])
//     .range([ 0, width ]);
//   svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x));

var x = d3.scaleBand()
  .range([0, width])
  .domain(data.map(function(d) { return d.algorithm; }))
  .padding(0.20);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-15,10)rotate(-90)")
    .style("text-anchor", "end")
    .style("font-size", "7px");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, .1])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.algorithm); } )
      .attr("cy", function (d) { return y(d.falsepositive); } )
      .attr("r", 3)
      .style("fill", "#c63554")
      .style("padding", "10px")

})
}
false_positives()