function barchart() { 
 
 
 // set the dimensions and margins of the graph
 var margin = {top: 20, right: 20, bottom: 40, left: 200},
 width = 560 - margin.left - margin.right,
 height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#causes_of_death")
.append("svg")
 .attr("width", width + margin.left + margin.right)
 .attr("height", height + margin.top + margin.bottom)
.append("g")
 .attr("transform",
       "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv('./data/data_barchart.csv', function(data) {

// Add X axis
var x = d3.scaleLinear()
 .domain([0, 10])
 .range([ 0, width]);

//svg.append("g")
// .attr("transform", "translate(0," + height + ")")
// .call(d3.axisBottom(x))//


// Y axis
var y = d3.scaleBand()
 .range([ 0, height ])
 .domain(data.map(function(d) { return d.Country; }))
 .padding(.1);
svg.append("g")
 .call(d3.axisLeft(y))
 .selectAll("text")
 .attr("transform", "rotate(0)") //translate(-20, 0)
   .style("text-anchor", "end");


//Bars
svg.selectAll("myRect")
 .data(data)
 .enter()
 .append("rect")
 .attr("x", x(0) )
 .attr("y", function(d) { return y(d.Country); })
 .attr("width", function(d) { return x(d.Value); })
 .attr("height", y.bandwidth() )
 .attr("fill", "#E38288")


 // .attr("x", function(d) { return x(d.Country); })
 // .attr("y", function(d) { return y(d.Value); })
 // .attr("width", x.bandwidth())
 // .attr("height", function(d) { return height - y(d.Value); })
 // .attr("fill", "#69b3a2")

})

}
barchart()