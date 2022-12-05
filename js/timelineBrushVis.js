/*
 * TimelineBrushVis - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the timeline brushing tool
 * @param _worldBroadbandData	-- the json data file 'world-broadband.json'
 */


class TimelineBrushVis {

    constructor(parentElement, worldBroadbandData, eventHandler) {
        this.parentElement = parentElement;
        this.worldBroadbandData = worldBroadbandData;
        this.eventHandler = eventHandler;

        this.initVis()
    }

    initVis() {
        let vis = this;

        //vis.margin = {top: 0, right: 40, bottom: 30, left: 40};
        vis.margin = {top: 20, right: 20, bottom: 20, left: 20};

        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height  - vis.margin.top - vis.margin.bottom;

        // SVG drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

        // add title
        // vis.svg.append('g')
        //     .attr('class', 'title')
        //     .attr('id', 'timeline-brush-title')
        //     .append('text')
        //     .text('How has worldwide access to broadband internet changed over time?')
        //     .attr('transform', `translate(${vis.width / 2}, 0)`)
        //     .attr('text-anchor', 'middle');

        console.log("what's different", vis.worldBroadbandData)
        // scales and axes
        vis.x = d3.scaleTime()
            .range([0, vis.width])
            .domain(d3.extent(vis.worldBroadbandData, function(d) { return d["Year"]; }));

        vis.y = d3.scaleLinear()
            .range([vis.height, 0])
            .domain([0, d3.max(vis.worldBroadbandData, function(d) { return d["Fixed Broadband Subscriptions"]; })]);

        vis.xAxis = d3.axisBottom()
            .scale(vis.x)

        vis.yAxis = d3.axisLeft()
            .scale(vis.y);


        // define area path generator
        vis.area = d3.area()
            .x(function(d) { return vis.x(d["Year"]); })
            .y0(vis.height)
            .y1(function(d) { return vis.y(d["Fixed Broadband Subscriptions"]); });

        // draw area by using the path generator
        vis.svg.append("path")
            .datum(vis.worldBroadbandData)
            .attr("class", "area")
            .attr("fill", "#CBC3E3")
            .attr("d", vis.area);

        // append x-axis
        vis.svg.append("g")
            .attr("class", "x-axis axis")
            .attr("transform", "translate(0," + vis.height + ")")
            .call(vis.xAxis);

        // append y-axis
        vis.svg.append("g")
            .attr("class", "y-axis axis")
            .call(vis.yAxis);

        // append y-axis title
        vis.svg.append("text")
            .attr("x", 10)
            .attr("y", 15)
            .attr("class", "timeline-axis-title")
            .text("Fixed Broadband Subscriptions (per 100 people)");

        // initialize brushing component
        vis.brush = d3.brushX()
            .extent([[0, 0], [vis.width, vis.height]])
            // .on("brush", brushed);
            .on("brush", function(event){
                // user selected a specific region
                vis.currentBrushRegion = event.selection;
                console.log("current brush reg", vis.currentBrushRegion)

                vis.currentBrushRegion = vis.currentBrushRegion.map(vis.x.invert);

                // // trigger the event 'selectionChanged' of our event handler
                vis.eventHandler.trigger("selectionChanged", vis.currentBrushRegion);
            });

        // append brush component
        vis.brushGroup = vis.svg.append("g")
            .attr("class", "brush")


        vis.wrangleData();
    }

    wrangleData() {
        let vis = this;

        console.log("broadband", vis.worldBroadbandData)
        // vis.worldBroadbandData.forEach(d => {
        //     console.log(d)
        // })

        vis.updateVis();
    }

    updateVis() {
        let vis = this;

        // call brush component
        vis.brushGroup.call(vis.brush)

    }

}
