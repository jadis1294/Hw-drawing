"use strict"
document.getElementById('files').addEventListener('change', handleFileSelect, false);
var
    littleLine=50,
    bigLine=150,
    zoomTreeBoolean,
    editModeBoolean,
    reader,
    radiusNode = 12,
    nodes = new Map(),
    edges = new Map(),
    tree= new Tree("albero",nodes),
    w = window.innerWidth-150,
    h = window.innerHeight,
    clickCount=0,
    singleClickTimer;
/**
 * @function 
 */
function handleFileSelect(evt) {
    var file = evt.target.files[0];    
    reader = new FileReader();
    reader.readAsText(file);
}

/**
 * @function 
 * @description Initialize the Empty svg and the Svg's ID
 */
function initialize() {
    d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr('id', 'tree')

    d3.select("#tree")
        .append('g')
        .attr('id', 'nodes')

    d3.select("#tree")
        .append("g")
        .attr("id", "edges")
    
    }

initialize();
