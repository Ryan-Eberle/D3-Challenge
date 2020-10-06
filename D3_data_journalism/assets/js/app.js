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
//function for updating Yaxis var on click
function renderYAxis(newYScale, Yaxis) {
    var leftAxis = d3.axisLeft(newYScale);

    Yaxis.transition()
        .duration(1000)
        .call(leftAxis);
    return Yaxis;
}
// function to render the data point circles using X and Y scales
function renderCircles(circlesGroup, newXScale, newYScale, chosenXAxis, chosenYAxis) {
    circlesGroup.transition()
        .duration(1000)
        .attr("cx", d => newXScale(d[chosenXAxis]))
        .attr("cy", d => newYScale(d[chosenYAxis]));
    return circlesGroup;
}

// function to format text for renderCircles
function renderText(circlesText, newXScale, newYScale, chosenXAxis, chosenYAxis) {
    circlesText.transition()
        .duration(1000)
        .attr("cx", d => newXScale(d[chosenXAxis]))
        .attr("cy", d => newYScale(d[chosenYAxis]));
    return circlesText;
}
// ToolTip function for X and Y 
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, circlesText) {
    var xLabel;
    var xformatLabel;

    if (chosenXAxis === "obesity") {
        label = "Obeseity: "
        xformatLabel = "%";
    }
    else if (chosenXAxis === "smokes"){
        label = "Smokes: "
        xformatLabel = "%";
    }
    else {
        label = "Lacks Healthcare: "
        xformatLabel = "%";
    }

    var yLabel;
    var yformatLabel

    if (chosenYAxis === "age") {
        label = "Age: "
        yformatLabel = " ";
    }
    else if (chosenYAxis === "poverty") {
        label = "Poverty: "
        yformatLabel = "%";
    }
    else {
        label = "Household Income: $"
        yformatLabel = " ";
    }
    // format tooltip variable show state data 
    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .html(function(d) {
            return (`${d.state}<br>
            ${xLabel}${chosenXAxis}${xformatLabel}<br>
            ${yLabel}${chosenYAxis}${yformatLabel}`)
        });

    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", function(data) {
        toolTip.show(data);
    })
        .on("mouseout", function(data, index) {
            toolTip.hide(data);
        });
    return circleGroup;
}


d3.csv('/assets/data/data.csv').then(function(newsData) {
    console.log(newsData);
}); 