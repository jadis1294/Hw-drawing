/**
 * @function
 * @description parte quando si preme il bottone "navigate" e da la possibilità di zoommare L'albero 
 */
function zoomTreeButton() { 
    editModeBoolean=false;
    zoomTreeBoolean = true;
    changeRadiusAndDescription()
    d3.select("#tree")
    .call(d3.zoom().scaleExtent([1, 40]).translateExtent([[-100, -100], [w + 90, h + 100]])
    .on("zoom", function() {
        if (zoomTreeBoolean== true)
        {
            d3.select("#nodes")
                .attr("transform", d3.event.transform );
            d3.select("#edges")
                .attr("transform", d3.event.transform );
        }
    }));
}
/**
 * @function
 * @description durante la "Navigate VIEW" permette di vedere la label di ogni nodo passandoci sopra con il mouse 
 */
function changeRadiusAndDescription(){
    d3.select("#nodes")
    .selectAll("circle")
    .data(Array.from(tree.nodes.values()))
    .on("mouseover", function(){
        let raggio=d3.select(this).attr("r")
        
        d3.select(this)
        .attr("r",raggio*1.3)
        let testo =d3.select(this).attr("id")
        
        d3.select("#tree")
        .append("text")
        .text(testo +" ")
        .attr("y", parseInt(d3.select(this).attr("cy"))-18)
        .attr("x", parseInt(d3.select(this).attr("cx")))
        .attr("id", "navigateText")
    })
    
    .on("mouseout", function(){
        let raggio=d3.select(this).attr("r")
        d3.select(this)
        .attr("r", raggio/1.3)
        d3.select("#navigateText").remove()
    });
}