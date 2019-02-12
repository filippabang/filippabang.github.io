


var question = 'A university education is more important for a boy than for a girl';
var year = '1995-1999';

var format = function(d) {
    //d = d / 1000000;
    //console.log(d);
    return d3.format(',.02f')(d) //+ 'M';
}


var map = d3.geomap.choropleth()
    .geofile('topojson/world/countries.json')
    .colors(colorbrewer.YlGnBu[9])
   // .column('YR2010')
    .column('1995-1999 A university education is more important for a boy than for a girl')
    .format(format)
    .legend(true)
    .unitId('ISO3');
    //.unitId('iso3');


function updateMap(question, year){
    console.log(year + ' ' + question);
    map.column(year + ' ' + question).update();

};

//createMap('YR2010');

createDropdown(); //create the dropdown menu
createDropdownVariable(); //create the dropdown menu


function createDropdown(){
    //add a select element for the dropdown menu
    var dropdown = d3.select("body")
        .append("div")
        .attr("class","dropdown") //for positioning menu with css
        .html("<h3>Select Timeperiod:</h3>")
        .append("select")
        .on("change", function(){year=this.value; updateMap(question, this.value)});// changeAttribute(this.value, csvData) }); //changes expressed attribute
    
    
    //create each option element within the dropdown
    dropdown.selectAll("options")
        .data(['1995-1999', '2000-2004', '2005-2009' ,'2010-2014']) // keyarray
        .enter()
        .append("option")
        .attr("value", function(d){ return d })
        .text(function(d) {
          
            return d
        });
};


function createDropdownVariable(){
    //add a select element for the dropdown menu
    var dropdown = d3.select("body")
        .append("div")
        .attr("class","dropdown") //for positioning menu with css
        .html("<h3>Select Question:</h3>")
        .append("select")
        .on("change", function(){question=this.value; updateMap(this.value, year)});// changeAttribute(this.value, csvData) }); //changes expressed attribute

    //create each option element within the dropdown
    dropdown.selectAll("options")
        .data(['A university education is more important for a boy than for a girl', 'Are you religious', 'Feeling of happiness', 'Men make better political leaders than women do', 'State of health', 'Approve woman as a single parent', 'Importance of family', 'Importance of friends']) // keyarray
        .enter()
        .append("option")
        .attr("value", function(d){ return d })
        .text(function(d) {
        
            return d
        });
};



//d3.csv('sp.pop.totl.csv', function(error, data) {
d3.csv('dataWiso.csv', function(error, data) {
    var selection = d3.select('#map').datum(data);
    //console.log(selection);
    map.draw(selection);
});