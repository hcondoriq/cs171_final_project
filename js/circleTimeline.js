class VisOne {

    constructor(parentElement, data) {
        this.parentElement = parentElement;
        this.data = data;
        // this.data2 = data2;
        // this.filteredData = this.data;
        this.displayData = []

        this.initvis()
    }

    /*
    * Initialize visualization (static content; e.g. SVG area, axes, brush component)
    */

    initvis() {

        let vis = this;

        vis.margin = {top: 20, right: 20, bottom: 20, left: 20};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", 700)
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        // create row group per family object
        vis.rows = vis.svg.selectAll(".row-group")
            .data(vis.data)

        console.log("data??", vis.data)
        console.log("rows?", vis.rows)

        vis.row_groups = vis.rows
            .enter()
            .merge(vis.rows)
            .append("g")

        // color scale
        vis.colorScale
        // .range(["#FFFFFF", "#136D70"])
        // .domain([0, d3.max(vis.data2, d => d.internetcost)])

        // draw circles
        vis.areaCell = vis.row_groups.selectAll()
            .data(vis.data)
            .enter().append("path")
            .attr("r", d => d[2008])
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("fill", "red")
        vis.areaCell1 = vis.row_groups.selectAll().data(vis.data1)
            .enter().append("path")
            .attr("r", d => d[2018])
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("fill", "red")
        vis.areaCell2 = vis.row_groups.selectAll().data(vis.data1)
            .enter().append("path")
            .attr("r", d => d[2021])
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("fill", "red")

    }


    /*
     * Data wrangling
     */

    wrangleData() {}


    /*
    * The drawing function
    */

    updateVis() {}
}