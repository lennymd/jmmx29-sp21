function Avg_Complaint_Facility_Type() {
  // set the dimensions and margins of the graph
  let margin = {top: 30, right: 40, bottom: 50, left: 40},
    width = 550 - margin.left - margin.right,
    height = 375 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  // Find the div on the page with id="my_dataviz" and add a svg element to it. Do some math to set the width and height. And also add a grouping element inside. And move that grouping element a little to the right and down.
  var svg = d3
    .select('#Avg_Complaint_Facility_Type')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Parse the Data
  d3.csv(
    './data/FY2015_ImmiDetain_Pvt_Gov_Prison_Tot_Complains.csv',
    function (dataset) {
      console.log(dataset.map(d => d.Facility));
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          dataset.map(function (d) {
            // If you change the name of the first variable in your data, you should change the thing after the . here as well.
            return d.Facility;
          })
        )
        .padding(0.2);

      // This following chunk: start from where we left off in the svg variable. Create a group element that we'll use for our xAxis. Move it down by the height of the graphic. Then create the axis using d3. Once it's made, select all the text elements, and rotate and translate them.them.
      svg
        .append('g')
        .attr('class', 'x_axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x))
        .selectAll('text')
        .style('text-anchor', 'middle');

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 700]).range([height, 0]);
      // svg.append('g').call(d3.axisLeft(y));

      // this removes the default lines on the x & y axes
      d3.selectAll('.y_axis').select('.domain').remove();
      d3.selectAll('.x_axis').select('.domain').remove();

      // Bars
      // This code add the bars: Start from svg. Let d3 know you're going to be making things called 'mybar'.
      svg
        .selectAll('mybar')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('class', 'mybar')
        .attr('x', function (d) {
          return x(d.Facility);
        })
        .attr('y', function (d) {
          return y(d.Number_of_Grivances);
        })
        .attr('width', x.bandwidth())
        .attr('height', function (d) {
          return height - y(d.Number_of_Grivances);
        })
        .attr('fill', '#46344E');

      svg
        .selectAll('mytext')
        .data(dataset)
        .enter()
        .append('text')
        .attr('class', 'mytext')
        .attr('x', function (d) {
          return x(d.Facility) + x.bandwidth() * 0.5;
        })
        .attr('y', function (d) {
          return y(d.Number_of_Grivances) - 5;
        })
        .text(function (d) {
          return d.Number_of_Grivances;
        })
        .attr('fill', 'goldenrod')
        .attr('font-size', '13pt')
        .attr('font-weight', 'bold')
        .attr('text-anchor', 'middle');
    }
  );
}

Avg_Complaint_Facility_Type();
