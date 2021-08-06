
    ancho=500;
    alto=500;
    margen=50;
    dist_barras=2;

    datos=[100,500,1000,250,2000,1500]

    var svg=d3.select('barra')
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
            return -escalaY(d)+14;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill","white");

