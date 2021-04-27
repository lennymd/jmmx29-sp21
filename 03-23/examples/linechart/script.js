function linechart() {
  // set the dimensions and margins of the graph
  var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 1200 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select('#my_dataviz')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  //Read the data
  d3.csv(
    'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv',

    // When reading the csv, I must format variables:
    function (d) {
      return {date: d3.timeParse('%Y-%m-%d')(d.date), value: d.value};
    },

    // Now I can use this dataset:
    function (data) {
      // Add X axis --> it is a date format
      // LMD -- THIS DEFINES THE X Scale FUNCTION. We give it our data. and it gives us pixels. We use it to create our axis and we also use it to position things in the x-direction.
      var x = d3
        .scaleTime()
        .domain(
          d3.extent(data, function (d) {
            return d.date;
          })
        )
        .range([0, width]);
      // LMD -- this part calls the axis.
      svg
        .append('g')
        .attr('class', 'x_axis')
        // .style('fill', 'cornflowerblue')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x).tickSize(-width));

      // Add Y axis
      var y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, function (d) {
            return +d.value;
          }),
        ])
        .range([height, 0])
        .nice();

      svg
        .append('g')
        .attr('class', 'y_axis')
        .call(
          d3
            .axisLeft(y)
            .tickSize(-width)
            .ticks(7)
            .tickFormat(function (d) {
              return +d / 1000;
            })
        );

      // Add the line
      svg
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'cornflowerblue')
        .attr('stroke-width', 1.5)
        .attr(
          'd',
          d3
            .line()
            .x(function (d) {
              return x(d.date);
            })
            .y(function (d) {
              return y(d.value);
            })
        );

      let convertDate = d3.timeParse('%Y-%m-%d');
      // ADDING some text on top of the peak which happened 2017-12-17
      // 1. figure out what the pixel value for 2017-12-17

      // this is the day where we had the maximum value
      let maxDay = '2017-12-17';
      // convert it into something the xScale can work with using timeParse. Turn it from a string to a object.
      let maxDayConvertedForComputer = convertDate(maxDay);
      // turn the date where we had maximum value into a pixel position
      let xPositionOfMaxDayOnGraphic = x(maxDayConvertedForComputer);
      console.log(xPositionOfMaxDayOnGraphic);

      // 2. figure out the peak value that day so we can put our text above it. (20089)
      let yPositionOfMaxDayOnGraphic = y(20089);
      console.log(yPositionOfMaxDayOnGraphic);

      // 3. what text do we want to put?
      let maxDayText = 'Dec. 17 -- Max Sales!';
      svg
        .append('text')
        .attr('x', xPositionOfMaxDayOnGraphic)
        .attr('y', yPositionOfMaxDayOnGraphic - 10)
        .text(maxDayText)
        .attr('text-anchor', 'middle');

      svg
        .append('circle')
        .attr('class', 'maxValue')
        .attr('cx', xPositionOfMaxDayOnGraphic)
        .attr('cy', yPositionOfMaxDayOnGraphic)
        .attr('r', 6);

      svg
        .append('line')
        .attr('x1', x(convertDate('2017-07-01')))
        .attr('y1', y(18000))
        .attr('x2', x(convertDate('2017-07-01')))
        .attr('y2', y(12000))
        .attr('stroke', 'red')
        .attr('stroke-width', '2');
      svg
        .append('line')
        .attr('x1', x(convertDate('2015-07-01')))
        .attr('y1', y(18000))
        .attr('x2', x(convertDate('2017-07-01')))
        .attr('y2', y(18000))
        .attr('stroke', 'green')
        .attr('stroke-width', '2');
      svg
        .append('line')
        .attr('x1', x(convertDate('2015-07-01')))
        .attr('y1', y(12000))
        .attr('x2', x(convertDate('2017-07-01')))
        .attr('y2', y(12000))
        .attr('stroke', 'green')
        .attr('stroke-width', '2');
    }
  );
}

linechart();
