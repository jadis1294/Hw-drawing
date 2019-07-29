"use strict"
/**
 * @class node
 */
class node{
    /**
 *Class node
 * @param {string} label
 * @param {Set<number>} childrens id's array of the outgoing edges from the node
 * @param {Boolean} expandedRight 
 * @param {Boolean} expandedLeft
 */
    constructor(id,label,childrens,expandedRight,expandedLeft){
 	    this.id=id;
 	    this.label=label;
        this.childrens=childrens;
        this.expandedRight=false;
        this.expandedLeft=false;
    }
}


/**
 * @class Edge
 */
class Edge{
    /**
    * class Edge
    * @param {number} id
    * @param {string} label 
    * @param {number} source - Source node's id 
    * @param {number} target - Target node's id
    */
    constructor(id,label,source,target){
 	    this.id=id;
 	    this.label=label;
        this.source=source;
        this.target=target;
    }
}

/**
 * @class Tree
 * @description the InclusionTree of the ClusteredGraph
 */
class Tree{
    /**
     * @param {string} label
     * @param {Map<number,node>} nodes Clusters in the InclusionTree
     */
    constructor(label,nodes)
    {
        this.label=label;
        this.nodes=nodes;
    }
}
