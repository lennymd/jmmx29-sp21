function Num_Type_Facility_Complaints() {
  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 30, bottom: 40, left: 290},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select('#Num_Type_Facility_Complaints')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Parse the Data
  d3.csv('./data/FY2015_Detain_Immi_Complains.csv', function (data) {
    // Add X axis
    var x = d3.scaleLinear().domain([0, 35000]).range([0, width]);
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')

      .style('text-anchor', 'middle');

    // Y axis
    var y = d3
      .scaleBand()
      .range([0, height])
      .domain(
        data.map(function (d) {
          return d.Abuse;
        })
      )
      .padding(0.1);
    svg.append('g').call(d3.axisLeft(y));

    //Bars
    svg
      .selectAll('myRect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', x(0))
      .attr('y', function (d) {
        return y(d.Abuse);
      })
      .attr('width', function (d) {
        return x(d.Count);
      })
      .attr('height', y.bandwidth())
      .attr('fill', '#993333');

    // .attr("x", function(d) { return x(d.Country); })
    // .attr("y", function(d) { return y(d.Value); })
    // .attr("width", x.bandwidth())
    // .attr("height", function(d) { return height - y(d.Value); })
    // .attr("fill", "#69b3a2")
  });
}

Num_Type_Facility_Complaints();
