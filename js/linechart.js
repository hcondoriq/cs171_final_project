class LineVis {

    constructor(parentElement, literacy, patents, broadband) {
        this.parentElement = parentElement;
        this.literacy = literacy;
        this.patents = patents;
        this.broadband = broadband

        // define start and end period and set to default values
        this.startYear = 1998
        this.endYear = 2021

        this.initVis()
    }

    initVis() {
        let vis = this;

        vis.margin = {top: 20, right: 40, bottom: 20, left: 30};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`)
            .append("g");


        // append legend
        vis.svg.append('line')
            .style("stroke", "steelblue")
            .style("stroke-width", 4.25)
            .attr("x1", 800)
            .attr("y1", 50)
            .attr("x2", 900)
            .attr("y2", 50);

        // append legend
        vis.svg.append('line')
            .style("stroke", "#c568a0")
            .style("stroke-width", 4.25)
            .attr("x1", 800)
            .attr("y1", 70)
            .attr("x2", 900)
            .attr("y2", 70);

        vis.legendlabel = vis.svg
            .append("text")
            .attr("class", "legend")
            .attr("fill", "black")
            .attr("x", 580)
            .attr("y", 55)
            .attr("font-size", "smaller")
            .text("Patent Applications (in 100,000s)")

        vis.legendlabel2 = vis.svg
            .append("text")
            .attr("class", "legend")
            .attr("fill", "black")
            .attr("x", 480)
            .attr("y", 75)
            .attr("font-size", "smaller")
            .text("Fixed broadband subscriptions (per 100 people)")

        // scales and axes
        vis.x = d3.scaleTime()
            .range([20, vis.width])
            .domain(d3.extent(vis.patents, function(d) { return d["Year"]; }));

        vis.y = d3.scaleLinear()
            .range([vis.height, 20])
            // .domain([0, d3.max(vis.patents, function(d) { return d["Resident Patents"]; })]);
            .domain([0, 30])
        vis.xAxis = d3.axisBottom()
            .scale(vis.x)

        vis.yAxis = d3.axisLeft()
            .scale(vis.y);


        vis.wrangleData()
    }

    /*
    * Data wrangling
    */

    wrangleData() {
        let vis = this;

        console.log("line chart display data", vis.literacy)

        vis.updateVis()
    }

    updateVis() {
        let vis = this;

        console.log("use data", vis.broadband)

        // Add the line
        vis.svg.append("path")
            .datum(vis.patents)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2.5)
            .attr("d", d3.line()
                .x(function(d) { return vis.x(d["Year"]) })
                .y(function(d) { return vis.y(d["Resident Patents"]) })
            )

        console.log("is broadband here?", vis.broadband)
        vis.svg.append("path")
            .datum(vis.broadband)
            .attr("fill", "none")
            .attr("stroke", "#c568a0")
            .attr("stroke-width", 2.5)
            .attr("d", d3.line()
                .x(function(d) { return vis.x(d["Year"]) })
                .y(function(d) { return vis.y(d["Fixed Broadband Subscriptions"]) })
            )

        // append x-axis
        vis.svg.append("g")
            .attr("class", "x-axis axis")
            .attr("transform", "translate(0," + vis.height + ")")
            .call(vis.xAxis);

        // append y-axis
        vis.svg.append("g")
            .attr("class", "y-axis axis")
            // .attr("transform", "translate("+ vis.width + ",0)")
            .attr("transform", "translate(20, 0)")
            .call(vis.yAxis);

        // append y-axis title
        vis.svg.append("text")
            .attr("x", 10)
            .attr("y", 15)
            .attr("class", "timeline-axis-title")
            .text("Patents / Broadband Subscriptions");

    }
}