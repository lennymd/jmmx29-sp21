function annualIncome() {
  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 30, bottom: 40, left: 130},
    width = 450 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select('#annual_income')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Parse the Data
  d3.csv('./data/income.csv', function (data) {
    // Add X axis
    var x = d3.scaleLinear().domain([0, 100]).range([0, width]);
    // svg
    //   .append('g')
    //   .attr('transform', 'translate(0,' + height + ')')
    //   .call(d3.axisBottom(x))
    //   .selectAll('text')
    //   .attr('transform', 'translate(-10,0)rotate(-45)')
    //   .style('text-anchor', 'end');

    // Y axis
    var y = d3
      .scaleBand()
      .range([0, height])
      .domain(
        data.map(function (d) {
          return d.Race;
        })
      )
      .padding(0.1);
    const yAxis = svg
      .append('g')
      .attr('class', 'bar_y_axis')
      .call(d3.axisLeft(y));

    const yAxisText = yAxis.selectAll('text').attr('class', 'bar_y_axis_text');
    //Bars
    const bars = svg.selectAll('annual_income').data(data).enter();

    bars
      .append('rect')
      .attr('class', 'bar annual_income')
      .attr('x', x(0))
      .attr('y', function (d) {
        return y(d.Race);
      })
      .attr('width', function (d) {
        return x(d.Value);
      })
      .attr('height', y.bandwidth())
      .attr('fill', function (d) {
        console.log(d);
        let color;
        if (d.Race === 'Asian American') {
          color = '#f9423a';
        } else {
          color = '#6bcfc5';
        }
        return color;
      });

    bars
      .append('text')
      .attr('class', 'bar_text')
      .attr('x', function (d) {
        // Get the right corner for the rectangle and move it in 50 pixels
        return x(d.Value) - 20;
      })
      .attr('y', function (d) {
        // Start off at the top line of the bar. Move it halfway so the bottom part of the text is at the halfway mark. Then add a little to make the text centered.
        return y(d.Race) + y.bandwidth() / 2 + 5;
      })
      .attr('fill', '#000')
      .text(function (d) {
        return d.Value;
      })
      .attr('text-anchor', 'middle');
  });
}

annualIncome();
