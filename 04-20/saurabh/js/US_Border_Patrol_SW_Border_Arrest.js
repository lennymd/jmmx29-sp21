function US_Border_Patrol_SW_Border_Arrest() {
  // set the dimensions and margins of the graph
  let margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 590 - margin.left - margin.right,
    height = 520 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  // Find the div on the page with id="my_dataviz" and add a svg element to it. Do some math to set the width and height. And also add a grouping element inside. And move that grouping element a little to the right and down.
  var svg = d3
    .select('#SW_Border_Arrest')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Parse the Data
  d3.csv('./data/US_Border_Patrol_SW_Border_Arrest.csv', function (dataset) {
    console.log(dataset.map(d => d.Year));
    // X axis
    var x = d3
      .scaleBand()
      .range([0, width])
      .domain(
        dataset.map(function (d) {
          // If you change the name of the first variable in your data, you should change the thing after the . here as well.
          return d.Year;
        })
      )
      .padding(0.2);

    // This following chunk: start from where we left off in the svg variable. Create a group element that we'll use for our xAxis. Move it down by the height of the graphic. Then create the axis using d3. Once it's made, select all the text elements, and rotate and translate them.them.
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      // .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'middle');

    // Add Y axis
    var y = d3.scaleLinear().domain([0, 1000]).range([height, 0]);
    svg.append('g').call(d3.axisLeft(y));

    // Bars
    // This code add the bars: Start from svg. Let d3 know you're going to be making things called 'mybar'.
    svg
      .selectAll('mybar')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('class', 'mybar')
      .attr('x', function (d) {
        return x(d.Year);
      })
      .attr('y', function (d) {
        return y(d.Arrest);
      })
      .attr('width', x.bandwidth())
      .attr('height', function (d) {
        return height - y(d.Arrest);
      })
      .attr('fill', '#333399');
  });
}

US_Border_Patrol_SW_Border_Arrest();
