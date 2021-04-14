var format = function (d) {
    d = d / 1000000;
    return d3.format(',.02f')(d) + 'M';
}

var map = d3.choropleth()
    .geofile('/d3-geomap/topojson/countries/USA.json')
    .projection(d3.geoAlbersUsa)
    .column('speeding')
    .unitId('fips')
    .scale(1000)
    .legend(true);

d3.csv("./data/speeding_by_state.csv").then(data => {
    map.draw(d3.select('#map').datum(data));
});
