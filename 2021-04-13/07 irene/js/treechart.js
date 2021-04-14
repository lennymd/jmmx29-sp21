function treechart() {
  // set the dimensions and margins of the graph
  var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 895 - margin.left - margin.right,
    height = 545 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select('#treechart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Read data
  d3.csv('./data/population.csv', function (data) {
    // stratify the data: reformatting for d3.js
    var root = d3
      .stratify()
      .id(function (d) {
        return d.name;
      }) // Name of the entity (column name is name in csv)
      .parentId(function (d) {
        return d.parent;
      })(
      // Name of the parent (column name is parent in csv)
      data
    );
    console.log(root);

    const colorScale = d3
      .scaleOrdinal()
      .domain(['Chinese', 'Indian', 'Filipino', 'Vietnamese'])
      .range(['#0e0933', '#f9423a', '#d48c78', '#93003a']);

    root.sum(function (d) {
      return +d.value;
    }); // Compute the numeric value for each entity

    // Then d3.treemap computes the position of each element of the hierarchy
    // The coordinates are added to the root object above
    d3.treemap().size([width, height]).padding(4)(root);

    console.log(root.leaves());
    // use this information to add rectangles:
    svg
      .selectAll('rect')
      .data(root.leaves())
      .enter()
      .append('rect')
      .attr('x', function (d) {
        return d.x0;
      })
      .attr('y', function (d) {
        return d.y0;
      })
      .attr('width', function (d) {
        return d.x1 - d.x0;
      })
      .attr('height', function (d) {
        return d.y1 - d.y0;
      })
      .style('stroke', 'transparent')
      .style('fill', function (d) {
        // console.log(d.data.name);
        return colorScale(d.data.name);
      });

    //trying out formulas to color map --> this is what is used in BarChart
    // .attr('fill', function (d) {
    //   let color;
    //   if (d.Name === 'Chinese') {
    //     color = '#f9423a';
    //   } else {
    //     color = '#6bcfc5';
    //   }
    //   return color;
    //
    //Trying out another formula --> this is makes color a variable from this website: https://bl.ocks.org/amo6002/921e5933211ee996cd49420b21afca2c

    // var color;
    // var color_accessor;
    // if (color_measure != null) {
    //   color = d3
    //     .scaleLinear()
    //     .range(color_range || ['#ffb300', '#ADD8E6', '#03A9F4'])
    //     .domain(colorDomain());
    //   color_accessor = function (d) {
    //     return color(d.color_metric);
    //   };
    // } else {
    //   color = d3.scaleOrdinal().range(color_range || d3.schemeCategory20c);
    //   color_accessor = function (d) {
    //     return color(d.data.key);
    //   };
    // }

    // and to add the text labels
    svg
      .selectAll('text')
      .data(root.leaves())
      .enter()
      .append('text')
      .attr('x', function (d) {
        return d.x0 + 10;
      }) // +10 to adjust position (more right)
      .attr('y', function (d) {
        return d.y0 + 20;
      }) // +20 to adjust position (lower)
      .text(function (d) {
        return d.data.name + ' ' + d.data.value + '%';
      })
      .attr('font-size', '15px')
      .attr('fill', 'white');
  });
}
treechart();
