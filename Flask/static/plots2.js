let mylista=[]

function scatterZOOM(dataset){

    var margin = {top: 20, right: 200, bottom: 30, left: 40},
    width = 1024 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
  
    var x = d3.scale.linear()
      .range([0, width]);
  
    var y = d3.scale.linear() 
      .range([height, 0]);
  
    var color = d3.scale.linear()
      .domain([1,100])
      .range(['yellow','red']);
  
    var xAxis = d3.svg.axis()
      .scale(x) 
      .ticks(5)
      .tickSize(-height)
      .orient("bottom");
  
    var yAxis = d3.svg.axis()
      .scale(y)   
      .ticks(5)
      .tickSize(-width)
      .orient("left");
  
    var zoom = d3.behavior.zoom()
      .x(x)
      .y(y)    
      .scaleExtent([0,10])
      .on("zoom", zoom);
  
    var svg = d3.select("#plot").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(zoom);  
  
    svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "plot");
  
    d3.csv("../static/"+dataset, function(data) {
  
    x.domain(d3.extent(data, function(d) { return d.x; }));
    y.domain(d3.extent(data, function(d) { return d.y; }));
    
    let colores=['#CD5C5C','#FFC0CB','#FF1493','#FFA07A','#FF8C00','#FFFF00','#FFFACD','#BDB76B','#EE82EE','#663399','#ADFF2F','#2E8B57','#20B2AA','#00FFFF','#B0C4DE','#0000FF','#191970','#8B4513','#000000']
    //color.domain(d3.extent(data, function(d) { return d.wt1C+d.wt2C+d.tc1C+d.tc2C;}));
  
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width/2)
        .attr("y", margin.bottom -5)
        .style("text-anchor", "middle")
        .text("X");
  
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left)
        .attr("x", -height/2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Y");
  
    var clip = svg.append("clipPath")
        .attr("id", "clip")
      .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height);
  
    var chartBody = svg.append("g")
        .attr("clip-path", "url(#clip)");
      
    var circle = chartBody.selectAll(".dot")
        .data(data);
  
    circle.enter().append("circle")
        .attr("class", "dot")    
        .attr("r", 2.5)
        .attr("stroke-width", 0.1)    
        .attr("transform", transform)      
        .style('cursor', 'pointer')
        .style('fill', function(d,i){
          return colores[d.clase];
        })
        .on('mouseover', displayData)
        .on('mouseout', removeDisplayedData)
      .append("title")
        .text(function(d,i) { return d.content;});
  
  
    var legend = svg.selectAll(".legend")
        .data(mylista)
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
  
    legend.append("circle")
        .attr("class", "dot")    
        .attr("cx", width + 18)
        .attr("cy", 15)
        .attr("stroke-width", 0.1)  
        .attr("r", 5)     
        .style("fill", color);
  
    legend.append("text")
        .attr("x", width + 32)
        .attr("y", 15)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function(d) { return d; });
  
    legend.append("text")
        .attr("x", width + 18)
        .attr("dy", 100)
        .attr("id", "blowup")     
        .style("font-size", "30px")
        .style("font-weight", "bold");
  
    });
  
    function zoom() {   
      svg.select(".x.axis").call(xAxis);
      svg.select(".y.axis").call(yAxis);
      svg.selectAll(".dot").attr("transform", transform);
    }
  
  
    function transform(d) {
    return "translate(" + x(d.x) +"," + y(d.y)+")";
    }
  
    function displayData(d, i) {
  
    d3.select(this)  
      .attr("r",5)
      .on("click", function(d,i){mylista.push({"content":d.content,"clase":d.clase})});
  
    d3.select('svg #blowup')
      .text(d.content)      
      .transition()       
      .style('opacity', 1);
  
    }
  
    function removeDisplayedData(d, i) {
  
    d3.select(this)
      .transition()
      .duration(500)
      .attr("r",2.5);
  
    d3.select('svg #blowup')      
        .transition()
        .duration(1500)
        .style('opacity', 0);
    }
    
  };






//  ------------------- CREAR TABLA ------------------------
  var tabulate = function (data,columns) {
    var table = d3.select('#tabla')
      .attr("max-height",200).style("color","red")
      .append('table')
      var thead = table.append('thead')
      var tbody = table.append('tbody')
    .style("max-height","200px")
    .style("overflow-y","scroll")
    .style("position", "relative")
    .style("color","black")
  
      thead.append('tr')
        .selectAll('th')
          .data(columns)
          .enter()
        .append('th')
          .text(function (d) { return d })
  
      var rows = tbody.selectAll('tr')
          .data(data)
          .enter()
        .append('tr')
  
      var cells = rows.selectAll('td')
          .data(function(row) {
              return columns.map(function (column) {
                  return { column: column, value: row[column] }
            })
        })
        .enter()
      .append('td')
        .text(function (d) { return d.value })
        .style("color",function(d){if (d.value==1){return "red"}})
  
    return table;
}
  
function table(){
    console.log(mylista);
    tabulate(mylista,["clase","content"]); 
  
};




//  -----------------  WORDCLOUD  -------------------
function contabilizar(){
    var dict={}
    for (var i=0;i<mylista.length;i++){
        lista=mylista[i]["content"].split(" ");
        for (var word of lista){
            if (word in dict){
                dict[word]+=1;
            }else{
                dict[word]=1;
            }
        }
    }
    delete dict[""]
    
    var result=[]
    for (var item in dict){
        result.push({"text":item, "size":(dict[item]*10)})
    }
    return result;

};

function otro(){ 
var frequency_list = [{"text":"Sushi","size":130},{"text":"roll","size":80},{"text":"service","size":70},{"text":"ayce","size":70},{"text":"vegas","size":70},{"text":"fish","size":65},{"text":"order","size":65},{"text":"salad","size":60},{"text":"quality","size":57},{"text":"cream","size":65},{"text":"everything","size":55},{"text":"seafood","size":55},{"text":"rice","size":55},{"text":"spicy","size":50},{"text":"sauce","size":45},{"text":"salmon","size":40},{"text":"tuna","size":40},{"text":"appetizer","size":35},{"text":"sashimi","size":35},{"text":"stars","size":30},{"text":"mochi","size":25},{"text":"spot","size":25},{"text":"shrimp","size":20},{"text":"crab","size":20},{"text":"party","size":15},{"text":"side","size":15},{"text":"dessert","size":15},{"text":"dream","size":15},{"text":"tempura","size":15},{"text":"shell","size":15},{"text":"eel","size":15}];
var lista = [{"text":"hola","size":120},{"text":"hola2","size":150}];

var frequency_list = contabilizar();
table();
mylista=[]


var w = 960,
    h = 600;

var fill = d3.scale.category20b();

d3.layout.cloud().size([w, h])
        .words(frequency_list)
        .rotate(0)
        .padding(5)
        .fontSize(function(d) { return d.size; })
        .on("end", draw)
        .start();

function draw(words, bounds) {
d3.select("body").append("svg")
    .attr("width", w)
    .attr("height", h)
  .append("g")
    .attr("transform", "translate(450,300)")
  .selectAll("text")
    .data(words)
  .enter().append("text")
    .style("font-size", function(d) { return d.size + "px"; })
    .style("font-family", "Impact")
    .style("fill", function(d, i) { return fill(i); })
    .attr("text-anchor", "middle")
    .attr("transform", function(d) {
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function(d) { return d.text; })
}

};