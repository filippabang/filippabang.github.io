


var question = 'A university education is more important for a boy than for a girl';
var year = '1995-1999';

var format = function(d) {
    if(d==0){
        var f = '   -  Disagree';
    }
    else if(d==100){
        var f = '   -   Agree';
    }
    else{
        var f = ' '
    }
    return d3.format(' .00f')(d) + f //+ 'M';
}


var map = d3.geomap.choropleth()
    .geofile('topojson/world/countries.json')
    //.colors(colorbrewer.YlGnBu[6])
    .colors(colorbrewer.YlGn[9])
    .column('1995-1999 A university education is more important for a boy than for a girl')
    .format(format)
    .legend(true)
    .unitId('iso3');

    d3.select("#question")
      .attr('x', 10)
      .attr('dy', 100)
      .text(function() { return year + ' ' + question; })


function updateMap(question, year){
    console.log(year + ' ' + question);
    map.column(year + ' ' + question).update();

    d3.select("#question")
      .attr('x', 10)
      .attr('dy', 100)
      .text(function() { return year + ' ' + question; })

};


createDropdown(); //create the dropdown menu
createDropdownVariable(); //create the dropdown menu


function createDropdown(){
    //add a select element for the dropdown menu
    var dropdown = d3.select("#body")
        .append("div")
        .attr("class","dropdown") //for positioning menu with css
        .html("<h3>Select Timeperiod:</h3>")
        .append("select")
        .on("change", function(){year=this.value; updateMap(question, this.value)})
;// changeAttribute(this.value, csvData) }); //changes expressed attribute
    
    
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
    var dropdown = d3.select("#body2")
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



d3.csv('dataWisoNorm.csv', function(error, data) {
    var selection = d3.select('#map').datum(data);

    map.draw(selection);
});