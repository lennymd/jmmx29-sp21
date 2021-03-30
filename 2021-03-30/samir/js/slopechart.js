function slopechart() {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 10, bottom: 10, left: 0 },
        width = 700 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#slopechart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("./data/ratio.csv", function (data) {

        // Extract the list of dimensions we want to keep in the plot. Here I keep all except the column called color_car
        dimensions = d3.keys(data[0]).filter(function (d) { return d != "color_car" })

        var color = d3.scaleOrdinal()
            .domain(["gray", "red", "white", "silver"])
            .range(["#6D6E71", "#D81F26", "#FFFFFF", "C7C9CB"])

        // For each dimension, I build a linear scale. I store all in a y object
        var y = {}
        for (i in dimensions) {
            name = dimensions[i]
            y[name] = d3.scaleLinear()
                .domain(d3.extent(data, function (d) { return +d[name]; }))
                .range([height, 0])
        }


        // Build the X scale -> it find the best position for each Y axis
        x = d3.scalePoint()
            .range([0, width])
            .padding(1)
            .domain(dimensions);


        // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
        function path(d) {
            return d3.line()(dimensions.map(function (p) { return [x(p), y[p](d[p])]; }));
        }

        // Draw the lines
        svg
            .selectAll("myPath")
            .data(data)
            .enter()
            .append("path")
            .attr("class", function (d) { return "line " + d.color_car } ) // 2 class for each line: 'line' and the group name
            .attr("d",  path)
            .style("fill", "none" )
            .style("stroke", function(d){ return( color(d.color_car))} )

          /*  .attr("d", path)
            .style("fill", "none")
            .style("stroke", "#69b3a2")*/
        // .style("opacity", 0.5)


        // Draw the axis:
        svg.selectAll("myAxis")
            // For each dimension of the dataset I add a 'g' element:
            .data(dimensions).enter()
            .append("g")
            // I translate this element to its right position on the x axis
            .attr("class", "axis_slope_chart")
            .attr("transform", function (d) { return "translate(" + x(d) + ")"; })
            // And I build the axis with the call function
            .each(function (d) { d3.select(this).call(d3.axisLeft().scale(y[d])); })
            // Add axis title
            .append("text")
            .style("text-anchor", "middle")
            .attr("y", -9)
            .text(function (d) { return d; })
            .style("fill", "black")
            .style("font", "50px")

    })
}
slopechart();