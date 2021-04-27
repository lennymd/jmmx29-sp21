        function barchart2() {
        // set the dimensions and margins of the graph
        var margin = {top: 20, right: 60, bottom: 40, left: 150},
            width = 650 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;
        
        // append the svg object to the body of the page
        var svg = d3.select("#barchart_2")
          .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");
        
        // Parse the Data
        d3.csv("./data/barchart2.csv", function(data) {
        
          // Add X axis
          var x = d3.scaleLinear()
            .domain([0, 31000])
            .range([ 0, width]);
          svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .selectAll("text")
              .attr("transform", "translate(0,0)")
              .style("text-anchor", "middle");
        
          // Y axis
          var y = d3.scaleBand()
            .range([ 0, height ])
            .domain(data.map(function(d) { return d.Country; }))
            .padding(.3);
          const yAxis = svg
            .append("g")
            .attr('class', 'barchart_y_axis')
            .call(d3.axisLeft(y))

            const yAxisText = yAxis.selectAll('text').attr('class', 'barchart_y_axis_text');
          
            

          //Bars
          const bars = svg
            .selectAll("myRect")
            .data(data)
            .enter()

            var formatComma = d3.format(",");

            bars
            .append("rect")
            .attr("class", "barchart2_bar")
            .attr("x", x(0) )
            .attr("y", function(d) { return y(d.Country); })
            .attr("width", function(d) { return x(d.Value); })
            .attr("height", y.bandwidth() )
            .attr("fill", "#00557e")
        

            bars
            .append("text")
            .attr("class", "barchart2_bar_text")
            .attr('x', function(d) {
              return x(d.Value) -30;
            })
            .attr('y', function(d) {
              return y(d.Country) + y.bandwidth() / 2 + 5;
            })
            .attr('fill', 'white')
            .text(function(d) {
              return "$" + formatComma(d.Value);
            })
            .attr('text-anchor', 'middle');

            svg
            .append('line')
            .attr('x1', x(12716))
            .attr('y1', -10+ y('Violent offense'))
            .attr('x2', x(12716))
            .attr('y2', y('Public order offense'))
            .attr('stroke', 'gray')
            .attr('stroke-width', '1')
            .attr('stroke-dasharray', '2px 3px');  

            svg
            .append('line')
            .attr('x1', x(12716))
            .attr('y1', y('Public order offense'))
            .attr('x2', x(22000))
            .attr('y2', y('Public order offense'))
            .attr('stroke', 'gray')
            .attr('stroke-width', '1')
            .attr('stroke-dasharray', '2px 3px');  

            svg
            .append('text')
            .attr('class', 'barchart2_text1')
            .attr('x', x(11550))
            .attr('y', y('Public order offense'))
            .html(
              '<tspan dx="80" dy="-20">$12,716</tspan><tspan dx="-42" dy="15">Median Bail Amount</tspan>'
            )
            .attr('text-anchor', 'middle');  

            svg
            .append('line')
            .attr('x1', x(13000))
            .attr('y1', -10+ y('Violent offense'))
            .attr('x2', x(13000))
            .attr('y2', y('Public order offense') + 50)
            .attr('stroke', 'gray')
            .attr('stroke-width', '1');

            svg
            .append('line')
            .attr('x1', x(13000))
            .attr('y1', y('Public order offense') + 50)
            .attr('x2', x(30500))
            .attr('y2', y('Public order offense') + 50)
            .attr('stroke', 'gray')
            .attr('stroke-width', '1') 

            svg
            .append('text')
            .attr('class', 'barchart2_text1')
            .attr('x', x(16300))
            .attr('y', y('Public order offense') + 50)
            .html(
              '<tspan dx="80" dy="-20">$13,000</tspan><tspan dx="-42" dy="15">Annual Income of 1/3rd of Pre-trial Detainees</tspan>'
            )
            .attr('text-anchor', 'middle');
        })
        }
        barchart2 ()
