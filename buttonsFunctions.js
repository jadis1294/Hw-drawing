"use strict"

/**
 * @function 
 * @description Remove the trasformation of the funcion ZoomGraph
 */
function removeTransformation(){
d3.select("#nodes")
    .attr("transform", null)
d3.select("#edges")
    .attr("transform", null)
}

/**
 * 
 * @function
 * @description funzione che elimina tutto l'albero creato o generato da un file json
 * @returns void 
 */
function deleteTreeButton() {
    d3.select("#nodes").selectAll("circle").remove();
    d3.select("#edges").selectAll("line").remove();
    tree.nodes.clear();
    edges.clear();
}



/**
 * 
 * @function
 * @description disegna il nodo radice dell'albero collocato sempre in alto a sinistra
 * @returns void 
 */
function drawRoot(){
    let nodeToInsert= new node(tree.nodes.size,"radice",new Set(),false,false);
    nodeToInsert.x=80;
    nodeToInsert.y=80;
    nodeToInsert.key=tree.nodes.size;
    tree.nodes.set(tree.nodes.size,nodeToInsert); //ora tree.nodes.size ==1
    d3.select("#nodes")
    .append("circle")
    .attr("r",radiusNode)
    .attr("id", "root")
    .attr("cx", nodeToInsert.x)
    .attr("cy", nodeToInsert.y)
    .attr("key", nodeToInsert.key);
}


/**
 * 
 * @function
 * @description Funzione chiamata dal bottone "edit mode", inizializza prima della fase di EDIT
 * @returns void 
 */
function editModeButton(){
    editModeBoolean=true;
    zoomTreeBoolean = false;
    removeTransformation(); //rimuove se presenti tutte le trasformazioni apportate durante la fase "navigate"
    if(tree.nodes.size==0)
        drawRoot();
    editMode();
}

/**
 * 
 * @function
 * @description cliccando su un nodo questo si estende a destra o a sinistra esplicitando i suoi figli
 * @returns void 
 */
function editMode(){
    d3.select("#nodes")
    .selectAll("circle")
    .data(Array.from(tree.nodes.values()))
        .on("click",function(){
        let nodo=tree.nodes.get(parseInt(d3.select(this).attr("key")))
        clickCount++;
        if (clickCount === 1) {
            singleClickTimer = setTimeout(function() {
            clickCount = 0;
            estendiDestro(nodo);
        }, 400);
    } else if (clickCount === 2) {
        clearTimeout(singleClickTimer);
        clickCount = 0;
        estendiSinisto(nodo);
    }
})
}
    

function estendiSinisto(nodo){
    console.log("dbclick")
    if(nodo.expandedLeft==true)
        return;
    else{
        let distanza;
    let arco=edges.get(nodo.id)
    if( nodo.id==0 ){
        distanza=bigLine;
    }
    else{
        if(parseInt(arco.y2-arco.y1)==bigLine)
        distanza=littleLine;
    else distanza=bigLine;
    }

         newNode(tree.nodes.size,[nodo.x,nodo.y+distanza],"n"+tree.nodes.size)
        let coordinatesX=[nodo.x,nodo.y];
        let coordinatesY=[nodo.x,nodo.y+distanza];
  
        newEdge(edges.size+1,coordinatesX,coordinatesY,nodo.id,tree.nodes.size-1,"e"+edges.size+1)
        nodo.childrens.add(tree.nodes.size-1)
        nodo.expandedLeft=true;
  }
}
function estendiDestro(nodo) {
    console.log("click")
    if(nodo.expandedRight==true)
    return;
else{
    let distanza;
    let arco=edges.get(nodo.id)
    if( nodo.id==0 ){
        distanza=littleLine;
    }
    else{
        if(parseInt(arco.x2-arco.x1)==bigLine)
        distanza=littleLine;
    else distanza=bigLine;
    }
    newNode(tree.nodes.size,[nodo.x+distanza,nodo.y],"n"+tree.nodes.size)
    let coordinatesX=[nodo.x,nodo.y];
    let coordinatesY=[nodo.x+distanza,nodo.y];
    
    newEdge(edges.size+1,coordinatesX,coordinatesY,nodo.id,tree.nodes.size-1,"e"+edges.size+1)
    nodo.childrens.add(tree.nodes.size-1)
    nodo.expandedRight=true;
}
}
/**
 * 
 * @function
 * @description inverte il valore (bigLine o Littleline) di ogni arco.
 * @returns void 
 */
function invertAllButton(){
    let e=Array.from(edges.values());
    for (let i = 0; i < e.length; i++) {
        let arco= edges.get(e[i].id)
        let nodoTarget= tree.nodes.get(e[i].target)
        let nodoSource= tree.nodes.get(e[i].source)
        if(parseInt(arco.x2-arco.x1)==bigLine){
            nodoTarget.x=parseInt(nodoSource.x)+littleLine;
            nodoTarget.y=nodoSource.y
            arco.x1=nodoSource.x
            arco.y1=nodoSource.y
            arco.x2=parseInt(arco.x1)+littleLine
            arco.y2=arco.y1
        }
        else{
            if(parseInt(arco.x2-arco.x1)==littleLine){
                nodoTarget.x=parseInt(nodoSource.x)+bigLine;
                nodoTarget.y=nodoSource.y;
                arco.y1=nodoSource.y
                arco.x1=nodoSource.x;
                arco.x2=arco.x1+bigLine;
                arco.y2=arco.y1;
        }
            else{
                if(parseInt(arco.y2-arco.y1)==bigLine){
                    nodoTarget.y=parseInt(nodoSource.y)+littleLine;
                    nodoTarget.x=nodoSource.x;
                    arco.y1=nodoSource.y;
                    arco.x1=nodoSource.x;
                    arco.x2=arco.x1;
                    arco.y2=arco.y1+littleLine;
                }
                else{
                    if(parseInt(arco.y2-arco.y1)==littleLine){
                        nodoTarget.y=parseInt(nodoSource.y)+bigLine;
                        nodoTarget.x=nodoSource.x;
                        arco.y1=nodoSource.y;
                        arco.x1=nodoSource.x;
                        arco.x2=arco.x1;
                        arco.y2=arco.y1+bigLine;
                    }
                }
            }
        }

    }
    redraw();
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////7