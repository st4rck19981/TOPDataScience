function diagrama(){
    ancho=500;
    alto=500;
    margen=50;
    dist_barras=2;

    datos=[100,500,1000,250,2000,1500]

    var svg=d3.select('plot')
        .append("svg")
        .attr("width", ancho)
        .attr("height", alto)
        .append("g")
        .attr("transform", "translate ("+margen+","+(alto-margen)+" )");

    var escalaY = d3.scaleLinear()
        .domain([0, d3.max(datos)])
        .range([0, alto-2*margen]);

    svg.selectAll("rect")
        .data(datos)
        .enter()
        .append("rect")
        .attr("x", function (d,i){
            return i*((ancho-2*margen)/datos.length);
        })
        .attr("y", function(d){
            return -escalaY(d);
        })
        .attr("width", ((ancho-2*margen)/datos.length)-dist_barras)
        .attr("height", function(d){
            return escalaY(d);
        })
        .attr("fill","blue");

    svg.selectAll("text")
        .data(datos)
        .enter()
        .append("text")
        .text(function(d){
            return d;
        })
        .attr("text-anchor", "middle")
        .attr("x", function(d,i){
            return i * ((ancho-2*margen)/datos.length)+((ancho-2*margen)/datos.length)/2;
        })
        .attr("y", function(d){
            return -escalaY(d)+14;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill","white");

};


function scatter(){
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("plot")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv", function(data) {
  console.log(data);
  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 4000])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 500000])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.GrLivArea); } )
      .attr("cy", function (d) { return y(d.SalePrice); } )
      .attr("r", 1.5)
      .style("fill", "#69b3a2")

})


};



function scatterI(){
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("plot")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv", function(data) {

  // Add X axis
  var x = d3.scaleLinear()
    .domain([4, 8])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 9])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Color scale: give me a specie name, I return a color
  var color = d3.scaleOrdinal()
    .domain(["setosa", "versicolor", "virginica" ])
    .range([ "#440154ff", "#21908dff", "#fde725ff"])

  // Add dots
  var myCircle = svg.append('g')
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.Sepal_Length); } )
      .attr("cy", function (d) { return y(d.Petal_Length); } )
      .attr("r", 8)
      .style("fill", function (d) { return color(d.Species) } )
      .style("opacity", 0.5)

  // Add brushing
  svg
    .call( d3.brush()                 // Add the brush feature using the d3.brush function
      .extent( [ [0,0], [width,height] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
      .on("start brush", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function
    )

  // Function that is triggered when brushing is performed
  function updateChart() {
    extent = d3.event.selection
    myCircle.classed("selected", function(d){ return isBrushed(extent, x(d.Sepal_Length), y(d.Petal_Length) ) } )
  }

  // A function that return TRUE or FALSE according if a dot is in the selection or not
  function isBrushed(brush_coords, cx, cy) {
       var x0 = brush_coords[0][0],
           x1 = brush_coords[1][0],
           y0 = brush_coords[0][1],
           y1 = brush_coords[1][1];
      return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;    // This return TRUE or FALSE depending on if the points is in the selected area
  }

})

};



function scatterText(){

var margin = {top: 10, right: 30, bottom: 30, left: 60},
width = 460 - margin.left - margin.right,
height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("plot")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("../static/pca.csv", function(data) {

// Add X axis
var x = d3.scaleLinear()
.domain([-5, 5])
.range([ 0, width ]);
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()
.domain([-5, 5])
.range([ height, 0]);
svg.append("g")
.call(d3.axisLeft(y));

// Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
// Its opacity is set to 0: we don't see it by default.
var tooltip = d3.select("plot")
.append("div")
.style("opacity", 0)
.attr("class", "tooltip")
.style("background-color", "white")
.style("border", "solid")
.style("border-width", "1px")
.style("border-radius", "5px")
.style("padding", "10px")



// A function that change this tooltip when the user hover a point.
// Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
var mouseover = function(d) {
tooltip
  .style("opacity", 1)
}

var mousemove = function(d) {
tooltip
  .html("TWEET: " + d.content)
  .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
  .style("top", (d3.mouse(this)[1]) + "px")
}

// A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
var mouseleave = function(d) {
tooltip
  .transition()
  .duration(200)
  .style("opacity", 0)
}

// Add dots
svg.append('g')
.selectAll("dot")
.data(data.filter(function(d,i){return i<998})) // the .filter part is just to keep a few dots on the chart, not all of them
.enter()
.append("circle")
  .attr("cx", function (d) { return x(d.x); } )
  .attr("cy", function (d) { return y(d.y); } )
  .attr("r", 7)
  .style("fill", "#69b3a2")
  .style("opacity", 0.3)
  .style("stroke", "white")
.on("mouseover", mouseover )
.on("mousemove", mousemove )
.on("mouseleave", mouseleave )

})

};


function distanceH(){
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 30},
    width = 460 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("plot")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_cleveland.csv", function(data) {


  // Add X axis
  var x = d3.scaleLinear()
    .domain([-1, 6])
    .range([ 0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

  // Y axis
  var y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(function(d) { return d.group; }))
    .padding(1);
  svg.append("g")
    .call(d3.axisLeft(y))

  // Lines
  svg.selectAll("myline")
    .data(data)
    .enter()
    .append("line")
      .attr("x1", function(d) { return x(d.value1); })
      .attr("x2", function(d) { return x(d.value2); })
      .attr("y1", function(d) { return y(d.group); })
      .attr("y2", function(d) { return y(d.group); })
      .attr("stroke", "grey")
      .attr("stroke-width", "1px")

  // Circles of variable 1
  svg.selectAll("mycircle")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function(d) { return x(d.value1); })
      .attr("cy", function(d) { return y(d.group); })
      .attr("r", "6")
      .style("fill", "#69b3a2")

  // Circles of variable 2
  svg.selectAll("mycircle")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function(d) { return x(d.value2); })
      .attr("cy", function(d) { return y(d.group); })
      .attr("r", "6")
      .style("fill", "#4C4082")
})
};

var tabulate = function (data,columns) {
  var table = d3.select('#tabla')
    .attr("max-height",200).style("color","red")
    .append('table')
	var thead = table.append('thead')
	var tbody = table.append('tbody')
  .style("max-height","200px")
  .style("overflow-y","scroll")
  .style("position", "relative")
  .style("color","red")

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

  return table;
}

function table(all_data, columns ){
  console.log(columns);
  d3.csv("../static/"+all_data,function (data) {
    console.log(data[0].x);
    //var columns = ['id','name']
    //var col = info.
    tabulate(data,columns)
  })


};


//CTRL + F5 para que reconozca las nuevas funciones
function descripcion(data){

console.log(data);
console.log("pasa");
};


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

  var svg = d3.select("plot").append("svg")
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
        //if (d.clase=='Positive'){return '#C81414';}
        //if (d.clase=='Negative'){return '#000000';}
        //if (d.clase=='Neutral') {return '#FFFB00'}
        if (i<500) {return '#C81414';}
        else {return '#000000';}
      })
      .on('mouseover', displayData)
      .on('mouseout', removeDisplayedData)
    .append("title")
      .text(function(d,i) { return i+")"+d.content;});


  var legend = svg.selectAll(".legend")
      .data(color.domain())
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
    .attr("r",5);

  d3.select('svg #blowup')
    .text(d.content)      
    //.style("fill", function(d) {return color(d.wt1C+d.wt2C+d.tc1C+d.tc2C); })  
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


function scatterZOOM2(){

  var margin = {top: 20, right: 200, bottom: 30, left: 40},
  width = 1024 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

  var x = d3.scaleLinear()
    .range([0, width]);

  var y = d3.scaleLinear() 
    .range([height, 0]);

  var color = d3.scaleLinear()
    .domain([1,100])
    .range(['yellow','red']);

  var zoom = d3.zoom()
    //.x(x)
    //.y(y)    
    .scaleExtent([0,10])
    .on("zoom", zoom);

  var svg = d3.select("plot").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(zoom);  

  svg.append("rect")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "plot");

  d3.csv("../static/pca.csv", function(data) {

  x.domain(d3.extent(data, function(d) { return d.x; }));
  y.domain(d3.extent(data, function(d) { return d.y; }));
  //color.domain(d3.extent(data, function(d) { return d.wt1C+d.wt2C+d.tc1C+d.tc2C;}));

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
    .append("text")
      .attr("class", "label")
      .attr("x", width/2)
      .attr("y", margin.bottom -5)
      .style("text-anchor", "middle")
      .text("X");

  svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(x))
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
      .on('mouseover', displayData)
      .on('mouseout', removeDisplayedData)
    .append("title")
      .text(function(d) { return d.content;});


  var legend = svg.selectAll(".legend")
      //.data(color.domain())
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
    svg.select(".x.axis").call(d3.axisBottom(x));
    svg.select(".y.axis").call(d3.axisLeft(x));
    svg.selectAll(".dot").attr("transform", transform);
  }


  function transform(d) {
  return "translate(" + x(d.x) +"," + y(d.y)+")";
  }

  function displayData(d, i) {

  d3.select(this)  
    .attr("r",5);

  d3.select('svg #blowup')
    .text(d.content)      
    //.style("fill", function(d) {return color(d.wt1C+d.wt2C+d.tc1C+d.tc2C); })  
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