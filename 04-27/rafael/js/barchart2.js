function barchart2() {
    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 30, bottom: 100, left: 120},
    width = 250 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
        .select("#barchart2")
        .append("svg")
        .attr("width", 500 + width + margin.left + margin.right)
        .attr("height", 200 + height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("./data/data_barchart2.csv", function (data) {
        // List of subgroups = header of the csv files = soil condition here
        var subgroups = data.columns.slice(3);

        // List of groups = species here = value of the first column called group -> I show them on the X axis
        var groups = d3.map(data, function (d) {return d.Status}).keys();

        // color palette = one color per subgroup
        var color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(["#266a3e","#67b05c","#b5dba7"]);

        drawRow = year => {  

            var yTrans = 100 * years.indexOf(year);  

            drawColumn = percentile => {         

                var xTrans = 150 * percentiles.indexOf(percentile);

                // Add X axis
                var x = d3.scaleLinear()
                    .domain([0, 1000000])
                    .range([0, width]);
                    svg.append("g")
                    .attr("transform", "translate(" + xTrans + "," + (yTrans + height) + ")")
                    .call(d3.axisBottom(x).ticks(2).tickSize(years.indexOf(year) == 2 ? 6 : 0))
                    .call(g => g.select(".domain").remove())
                    .selectAll("text").filter(function () {return years.indexOf(year) < 2}).remove()
                    //.attr('transform', 'translate(-10,0)rotate(-45)')
                    //.style('text-anchor', 'end');

                // Y axis
                var y = d3.scaleBand()
                    .domain(groups)
                    .range([0, height])
                    .padding(0.1);
                    svg.append("g")
                    .attr("transform", "translate(" + xTrans + "," + yTrans + ")")
                    .call(d3.axisLeft(y).tickSize(0))
                    .call(g => g.select(".domain").remove())
                    .selectAll("text").filter(function () {return percentiles.indexOf(percentile) > 0}).remove()

                // Another scale for subgroup position?
                var ySubgroup = d3.scaleBand()
                    .domain(subgroups)
                    .range([0, y.bandwidth()])
                    .padding([0.05]);

                // Show the bars
                svg.append("g")
                    .selectAll("g")
                    // Enter in data = loop group per group
                    .data(data.filter(d => d.Percentile == percentile && d.Year == year))
                    .enter()
                    .append("g")
                    .attr("transform", function (d) {return "translate(" + xTrans + "," + (yTrans + y(d.Status)) + ")";})
                    .selectAll("rect")
                    .data(function (d) {return subgroups.map(function (key) {return {key: key, value: d[key]};});})
                    .enter()
                    .append("rect")
                    .attr("x", function (d) {return x(0);})
                    .attr("y", function (d) {return ySubgroup(d.key);})
                    .attr("width", function (d) {console.log(d.value);return x(d.value);})
                    .attr("height", ySubgroup.bandwidth())
                    .attr("fill", function (d) {return color(d.key);});

                    // .attr("x", function(d) { return x(d.group); })
                    // .attr("y", function(d) { return y(d.Value); })
                    // .attr("width", x.bandwidth())
                    // .attr("height", function(d) { return height - y(d.Value); })
                    // .attr("fill", "#69b3a2")
            }

            var percentiles = [
                25,
                50,
                75,
                90,
            ]
            percentiles.forEach(drawColumn)

        }

        var years = [
            1985,
            2000,
            2012,
        ]
        years.forEach(drawRow)

    });

}
barchart2();