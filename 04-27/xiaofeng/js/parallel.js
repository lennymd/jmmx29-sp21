// set the dimensions and margins of the graph
var margin = {top: 40, right: 10, bottom: 40, left: 0},
  width = 900 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select('#education')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// Parse the Data
d3.csv('./data/data_parallel.csv', function (data) {
  // Extract the list of dimensions we want to keep in the plot. Here I keep all except the column called Species
  let dimensions = d3.keys(data[0]).filter(function (d) {
    return d != 'Species';
  });

  // For each dimension, I build a linear scale. I store all in a y object
  var y = {};
  for (i in dimensions) {
    const year = dimensions[i];
    y[year] = d3
      .scaleLinear()
      .domain(
        // d3.extent(data, function (d) {
        //   return +d[name];
        // })
        [0.7, 1.15]
      )
      .range([height, 0])
      .nice();
  }

  // Build the X scale -> it find the best position for each Y axis
  x = d3.scalePoint().range([0, width]).padding(1).domain(dimensions);

  // This creates a color scale to turn the Species column into a color for the lines, the dots, etc.
  const colorScale = d3
    .scaleOrdinal()
    .domain([
      'primary_world',
      'primary_china',
      'secondary_world',
      'secondary_china',
      'tertiary_world',
      'tertiary_china',
    ])
    .range(['#ed1765', '#e55925', '#0465ab', '#178ece', '#f3cf2d', '#cacc2c']);

  // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
  function path(d) {
    return d3.line()(
      dimensions.map(function (p) {
        return [x(p), y[p](d[p])];
      })
    );
  }

  // Draw the lines
  svg
    .selectAll('myPath')
    .data(data)
    .enter()
    .append('path')
    .attr('d', path)
    .style('fill', 'none')
    .style('opacity', 0.75)
    .style('stroke-width', 3)
    .style('stroke', function (d) {
      return colorScale(d.Species);
    });

  // Draw the axis:
  svg
    .selectAll('myAxis')
    // For each dimension of the dataset I add a 'g' element:
    .data(dimensions)
    .enter()
    .append('g')
    // I translate this element to its right position on the x axis
    .attr('transform', function (d) {
      return 'translate(' + x(d) + ')';
    })
    // And I build the axis with the call function
    .each(function (d, i) {
      if (i == 0) {
        d3.select(this).call(d3.axisLeft().scale(y[d]));
      } else {
        d3.select(this).call(d3.axisRight().scale(y[d]));
      }
    })
    // Add axis title
    .append('text')
    .style('text-anchor', 'middle')
    .attr('y', -9)
    .text(function (d) {
      return d;
    })
    .style('fill', 'black');
});
