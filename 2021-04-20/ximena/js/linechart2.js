function linechart2() {
// set the dimensions and margins of the graph
var margin = {top: 10, right: 100, bottom: 30, left: 50},
  width = 600 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
//find the div on the page and add svg element to it. Do some math to set the width and height. Also add grouping element inside. and move that grouping element a little to the right and down.
  var svg = d3
    .select('#secondlinechart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

//Read the data
d3.csv('./data/data2.csv', function (data) {
  // List of groups (here I have one group per column)
  var allGroup = ['Japan', 'Taiwan', 'South Korea', 'China'];

  // Reformat the data: we need an array of arrays of {x, y} tuples
  var dataReady = allGroup.map(function (grpName) {
    // .map allows to do something for each element of the list
    return {
      name: grpName,
      values: data.map(function (d) {
        return {time: d.time, value: +d[grpName]};
      }),
    };
  });
  // I strongly advise to have a look to dataReady with
  // console.log(dataReady)

  // A color scale: one color for each group
  var myColor = d3.scaleOrdinal().domain(allGroup).range(d3.schemeSet2);

  // Add X axis --> it is a date format
  var x = d3.scaleLinear().domain([1970, 2010]).range([0, width]);

  svg
    .append('g')
    .attr('class', 'x_axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x).tickFormat(d3.format('.0f')));

  // Add Y axis
  var y = d3.scaleLinear().domain([0, 35000]).range([height, 0]);

  svg.append('g').attr('class', 'y_axis').call(d3.axisLeft(y).ticks(6).tickSize(-width));

  // this removes the line
  d3.selectAll('.y_axis').select('.domain').remove();
  d3.selectAll('.x_axis').select('.domain').remove();

  // Add the lines
    var line = d3
      .line()
      .x(function (d) {
        return x(+d.time);
      })
      .y(function (d) {
        return y(+d.value);
      });

    svg
      .selectAll('myLines')
      .data(dataReady)
      .enter()
      .append('path')
      .attr('d', function (d) {
        return line(d.values);
      })
      .attr('stroke', function (d) {
        return myColor(d.name);
      })
      .style('stroke-width', 3)
      .style('fill', 'none');

  // Add the points
  svg
    // First we need to enter in a group
    .selectAll('myDots')
    .data(dataReady)
    .enter()
    .append('g')
    .style('fill', function (d) {
      return myColor(d.name);
    })
    // Second we need to enter in the 'values' part of this group
    .selectAll('myPoints')
    .data(function (d) {
      return d.values;
    })
    .enter()
    .append('circle')
    .attr('cx', function (d) {
      return x(d.time);
    })
    .attr('cy', function (d) {
      return y(d.value);
    })
    .attr('r', 4)
    .attr('stroke', 'white');

  // Add a legend at the end of each line
  svg
    .selectAll('myLabels')
    .data(dataReady)
    .enter()
    .append('g')
    .append('text')
    .datum(function (d) {
      return {name: d.name, value: d.values[d.values.length - 1]};
    })
    // keep only the last value of each time series
    .attr('transform', function (d) {
      return 'translate(' + x(d.value.time) + ',' + y(d.value.value) + ')';
    }) // Put the text at the position of the last point
    .attr('x', 12) // shift the text a bit more right
    .text(function (d) {
      return d.name;
    })
    .style('fill', function (d) {
      return myColor(d.name);
    })
    .style('font-size', 15);
});
}

linechart2();
