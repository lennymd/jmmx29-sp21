function pretrial_map() {
  var width = 720,
    height = 600;

  var projection = d3
    .geoAlbersUsa()
    .scale(1000)
    .translate([width / 2, height / 2]);

  var path = d3.geoPath().projection(projection);

  // Define the div for the tooltip
  var div = d3
    .select('#pretrial_map')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

  var svg = d3
    .select('#pretrial_map')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  var ext_color_domain = [0, 1, 150, 300, 500, 750, 1000];
  var legend_labels = [
    'No data',
    '<150',
    '<300',
    '<500',
    '<750',
    '<1000',
    '1000+',
  ];
  var color = d3
    .scaleThreshold()
    .domain([1, 150, 300, 500, 750, 1000])
    .range([
      '#ddd8d8',
      '#c6dbef',
      '#9ecae1',
      '#6baed6',
      '#2171b5',
      '#08519c',
      '#183d75',
    ]);

  d3.queue()
    .defer(d3.json, './data/us.json')
    .defer(d3.tsv, './data/pretrial.tsv')
    .await(ready);

  function ready(error, us, pretrial) {
    if (error) throw error;

    var rateById = {};
    var nameById = {}; // Create empty object for holding dataset
    pretrial.forEach(function (d) {
      rateById[d.id] = +d.rate;
      nameById[d.id] = d.name; // Create property for each ID, give it value from rate
      // cast rate to numeric value (+)
    });
    console.log(rateById);

    svg
      .append('g')
      .attr('class', 'counties')
      .selectAll('path')
      .data(topojson.feature(us, us.objects.counties).features)
      .enter()
      .append('path')
      .attr('d', path)
      .style('fill', function (d) {
        return color(rateById[d.id]); // get rate value for specific object
        // pass rate to color function, return color based on scale
      })
      .on('mouseover', function (d) {
        div.transition().duration(200).style('opacity', 0.9);
        d3.select(this)
          .style('stroke', 'black')
          .style('stroke-width', 2)
          .style('opacity', 1);
        div
          .text(nameById[d.id] + ': ' + parseFloat(rateById[d.id]).toFixed(0))
          .style('left', d3.event.pageX + 'px')
          .style('top', d3.event.pageY - 28 + 'px');
      })
      .on('mouseout', function (d) {
        div.transition().duration(500).style('opacity', 0);
        d3.select(this).style('stroke', 'none').style('opacity', 0.9);
      });

    svg
      .append('path')
      .datum(
        topojson.mesh(us, us.objects.states, function (a, b) {
          return a.id !== b.id;
        })
      )
      .attr('class', 'states')
      .attr('d', path);
  }
  //code for map legend
  var legend = svg
    .selectAll('g.legend')
    .data(ext_color_domain)
    .enter()
    .append('g')
    .attr('class', 'legend');

  var ls_w = 80,
    ls_h = 15;

  legend
    .append('rect')
    .attr('x', function (d, i) {
      return width - i * ls_w - ls_w - 80;
    })
    .attr('y', 560)
    .attr('width', ls_w)
    .attr('height', ls_h)
    .style('fill', function (d, i) {
      return color(d);
    })
    .style('opacity', 0.8);

  legend
    .append('text')
    .attr('x', function (d, i) {
      return width - i * ls_w - ls_w - 80;
    })
    .attr('y', 590)
    .text(function (d, i) {
      return legend_labels[i];
    });

  var legend_title = 'Pre-trial detention rate (per 100,000 people)';

  svg
    .append('text')
    .attr('x', 80)
    .attr('y', 550)
    .attr('class', 'legend_title')
    .text(function () {
      return legend_title;
    });
}

pretrial_map();
