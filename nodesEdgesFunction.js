"use strict"

/**
 * @function
 * @param {number} coordinates Array of d3.mouse(this)
 * @param {number} label Label for the new Cluster
 * @returns {void} 
 * @description Create a new Node in #nodes SVG
 */
function newNode(key,coordinates,label) {
    let nodeToInsert= new node(tree.nodes.size,label,new Set());
    tree.nodes.set(key,nodeToInsert);
    nodeToInsert.x=coordinates[0];
    nodeToInsert.y=coordinates[1];
    nodeToInsert.key=key;
}


/**
 * @function
 * @param {node} nodo
 * @param {string} label
 * @param {number} id
 * @param {number} id
 * @returns {void} 
 * @description Create a new Edge in svg #EDGES
 */
function newEdge(key,coordinatesX,coordinatesY,source,target,label)
{
    let edge= new Edge(key,label,source,target);
    edge.x1=coordinatesX[0]
    edge.y1=coordinatesX[1]
    edge.x2=coordinatesY[0]
    edge.y2=coordinatesY[1]
    edges.set(key,edge)
    redraw();

}

