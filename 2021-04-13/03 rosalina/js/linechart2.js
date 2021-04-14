function linechart2() {
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 600 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#linechart_2")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("./data/linechart2.csv", function(data) {

  // group the data: I want to draw one line per group
  var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
    .key(function(d) { return d.status;})
    .entries(data);

  // Add X axis --> it is a date format
  var x = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return d.year; }))
    .range([ 0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "linechart2_x_axis")
    .call(d3.axisBottom(x).tickSize (-height).tickFormat(d3.format("d")));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 500000])
    .range([ height, 0 ]);
  svg.append("g")
    .attr("class", "linechart2_y_axis")
    .call(d3.axisLeft(y).tickSize(-width).tickFormat(function(d) {
      return d/1000;
    }));

  // color palette
  var res = sumstat.map(function(d){ return d.key }) // list of group names
  var color = d3.scaleOrdinal()
    .domain(res)
    .range(['#00557e','#a25049'])

  // Draw the line
  svg.selectAll(".line")
      .data(sumstat)
      .enter()
      .append("path")
        .attr("fill", "none")
        .attr("stroke", function(d){ return color(d.key) })
        .attr("stroke-width", 1.5)
        .attr("d", function(d){
          return d3.line()
            .x(function(d) { return x(d.year); })
            .y(function(d) { return y(+d.number); })
            (d.values)
        })
        svg
        .append('line')
        .attr('x1', x(1996))
        .attr('y1', y(478192))
        .attr('x2', x(1996))
        .attr('y2', y(334139))
        .attr('stroke', 'gray')
        .attr('stroke-width', '1');

        svg
        .append('line')
        .attr('x1', x(1996))
        .attr('y1', y(478192))
        .attr('x2', x(2018))
        .attr('y2', y(478192))
        .attr('stroke', 'gray')
        .attr('stroke-width', '1')
        .attr('stroke-dasharray', '2px 4px');        

        svg
        .append('line')
        .attr('x1', x(1996))
        .attr('y1', y(334139))
        .attr('x2', x(1998))
        .attr('y2', y(334139))
        .attr('stroke', 'gray')
        .attr('stroke-width', '1')
        .attr('stroke-dasharray', '2px 4px');

        svg
        .append('text')
        .attr('class', 'linechart2_text1')
        .attr('x', x(1992))
        .attr('y', y(400000))
        .html(
          '<tspan dx="-35" dy="0">Pre-trial population grew by</tspan><tspan dx="-137" dy="15">43% from 1998 to 2018</tspan>'
        )
        .attr('text-anchor', 'middle');      

        svg
        .append('line')
        .attr('x1', x(1998))
        .attr('y1', y(258000))
        .attr('x2', x(2018))
        .attr('y2', y(258000))
        .attr('stroke', 'gray')
        .attr('stroke-width', '1')
        .attr('stroke-dasharray', '2px 4px');

        svg
        .append('text')
        .attr('class', 'linechart2_text2')
        .attr('x', x(1999))
        .attr('y', y(230000))
        .html(
          '<tspan dx="100" dy="0">Convicted population remained the same </tspan><tspan dx="-160" dy="15">from 1998 to 2018</tspan>'
        )
        .attr('text-anchor', 'middle');  

// Add series labels as text annotation to each line 
        svg
        .append('text')
        .attr('x', x(2018))
        .attr('y', y(485000))
        .text('Not Convicted (Pre-trial)')
        .attr('text-anchor', 'end')
        .attr('font-size', 14);

        svg
        .append('text')
        .attr('x', x(2018))
        .attr('y', y(305000))
        .text('Convicted')
        .attr('text-anchor', 'end')
        .attr('font-size', 14);
        

})


}


linechart2 ()