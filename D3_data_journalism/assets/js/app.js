// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;
var margin = {
    top:20,
    right: 40,
    bottom: 60,
    left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight -margin.top - margin.bottom;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width",svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Choose an x and y axis as a starting point for the graphing
// chosenYAxis 1. Age 2. Poverty 3. Income
var chosenYAxis = 'age'
// chosenXAxis 1. obeseity 2. smokes 3. healthcare
var chosenXAxis = "obesity"

// function for updating x-scale variable on click of label
function xScale(newsData, chosenXAxis) {
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(newsData, d => d[chosenXAxis]) * 0.8,
        d3.max(newsData, d => d[chosenXAxis]) * 1.2
    ])
        .range([0,width]);
    return xLinearScale;
}
// YScale function
function yScale(newsData, chosenYAxis) {
    var YLinearScale = d3.scaleLinear()
        .domain([d3.min(newsData, d => d[chosenYAxis]) * 0.8,
        d3.max(newsData, d => d[chosenYAxis]) * 1.2
    ])
        .range([height, 0]);
    return YLinearScale;
}
//function for updating Xaxis variable when clicked
function renderXAxis(newXScale, Xaxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    Xaxis.transition()
        .duration(1000)
        .call(bottomAxis);
    return xAxis;
}

function renderCircles(circlesGroup, newXScale, chosenXAxis) {
    circlesGroup.transition()
        .duration(1000)
        .attr("cx", d => newXScale(d[chosenXAxis]));

    return circlesGroup;
}

function updateToolTip(chosenXAxis, circlesGroup) {
    var label;

    if (chosenXAxis === "obesity") {
        label = "Obeseity % :";
    }
    else{}
}
    


d3.csv('/assets/data/data.csv').then(function(newsData) {
    console.log(newsData);
}); 