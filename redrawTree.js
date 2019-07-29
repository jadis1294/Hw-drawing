/**
 * @function
 * @description redraw the Tree every time it's change
 */
function redraw(){
    let nodes=Array.from(tree.nodes.values());
    let e=Array.from(edges.values());

    d3.select("#nodes")
    .selectAll("circle")
    .data(nodes)
    .remove()
    
    d3.select("#edges")
    .selectAll("line")
    .data(e)
    .remove()

    d3.select("#nodes")
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r",radiusNode)
    .attr("id", function(d){return "n"+d.key;})
    .attr("cx", function(d){ return d.x;})
    .attr("cy", function(d){return d.y;})
    .attr("key", function(d){return d.key});

    d3.select("#edges")
    .selectAll("line")
    .data(e)
    .enter()
    .append("line")
    .attr("id", function(d){return "e"+d.id;})
    .attr("x1", function(d){ return d.x1;})
    .attr("y1", function(d){return d.y1;})
    .attr("x2", function(d){ return d.x2;})
    .attr("y2", function(d){return d.y2;})
    .attr("key", function(d){return d.id;});  
    

    editMode();
}


/**
 * @function
 * @description Creeate a new HW-draw
 */
function newDraw(){
    let radice=tree.nodes.get(0)
    radice.x=80;
    radice.y=80;
    let nodes=Array.from(tree.nodes.values());
    let e=Array.from(edges.values());
    for (let index = 0; index < nodes.length; index++) {
        let figli=Array.from(nodes[index].childrens)
        if(figli.length==2){
            console.log("2")
            tree.nodes.get(figli[0]).x=nodes[index].x+bigLine;
            tree.nodes.get(figli[0]).y=nodes[index].y;
            newEdge(tree.nodes.get(figli[0]).id,
                [nodes[index].x,nodes[index].y],
                [nodes[index].x+bigLine,nodes[index].y],
                nodes[index].id,tree.nodes.get(figli[0]).id,"e"+tree.nodes.get(figli[0]).id);
            tree.nodes.get(figli[1]).x=nodes[index].x;
            tree.nodes.get(figli[1]).y=nodes[index].y+littleLine;
            newEdge(tree.nodes.get(figli[1]).id,
                [nodes[index].x,nodes[index].y],
                [nodes[index].x,nodes[index].y+littleLine],
                nodes[index].id,tree.nodes.get(figli[1]).id,"e"+tree.nodes.get(figli[1]).id);
            nodes[index].expandedRight=true;
            nodes[index].expandedLeft=true;
        }
        if(figli.length==1){
        console.log(figli.length)
        tree.nodes.get(figli[0]).x=nodes[index].x+littleLine;
        tree.nodes.get(figli[0]).y=nodes[index].y;
        newEdge(tree.nodes.get(figli[0]).id,
        [nodes[index].x,nodes[index].y],
        [nodes[index].x+littleLine,nodes[index].y],
        nodes[index].id,tree.nodes.get(figli[0]).id,"e"+tree.nodes.get(figli[0]).id);
        nodes[index].expandedRight=true;
        }
    }
    d3.select("#nodes")
    .selectAll("circle")
    .data(nodes)
    .remove()
    
    d3.select("#edges")
    .selectAll("line")
    .data(e)
    .remove()

    d3.select("#nodes")
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r",radiusNode)
    .attr("id", function(d){return "n"+d.key;})
    .attr("cx", function(d){ return d.x;})
    .attr("cy", function(d){return d.y;})
    .attr("key", function(d){return d.key});

    d3.select("#edges")
    .selectAll("line")
    .data(e)
    .enter()
    .append("line")
    .attr("id", function(d){return "e"+d.id;})
    .attr("x1", function(d){ return d.x1;})
    .attr("y1", function(d){return d.y1;})
    .attr("x2", function(d){ return d.x2;})
    .attr("y2", function(d){return d.y2;})
    .attr("key", function(d){return d.id;});  
       
}
