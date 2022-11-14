class VisOne {

    constructor(parentElement, firstArray, secondArray, thirdArray) {
        this.parentElement = parentElement;
        this.firstArray = firstArray;
        this.secondgroup = secondArray;
        this.thirdgroup = thirdArray;
        // this.filteredData =;
        this.displayData = []

        this.initvis()
    }

    /*
    * Initialize visualization (static content; e.g. SVG area, axes, brush component)
    */

    initvis() {

        let vis = this;

        vis.sampleData = vis.firstArray.filter(function (d) {
            // console.log("FILTER INFO", d)
            if(d.basket_combined_simplified = "Fixed-broadband basket" && d.ITURegion == "Africa") {
                return d[2008]
            }
            // return d.basket_current = "Fixed-broadband basket (5GB)"
            // return d.Economy = "Aruba"
        })
        console.log("sample data", vis.sampleData)

        vis.margin = {top: 20, right: 20, bottom: 20, left: 20};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", 700)
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        // create row group per family object
        // vis.rows = vis.svg.selectAll(".row-group")
        //     .data(vis.sampleData)

        console.log("data??", vis.firstArray)
        // console.log("rows?", vis.rows)

        // vis.row_groups = vis.rows
        //     .enter()
        //     .merge(vis.rows)
        //     .append("g")

        // color scale (to implement later)
        vis.colorScale
        // .range(["#FFFFFF", "#136D70"])
        // .domain([0, d3.max(vis.data2, d => d.internetcost)])

        // draw circles
        vis.areaCell = vis.svg.selectAll("circle")
            .data(vis.sampleData)
            .enter().append("circle")
            .attr("r", function(d) {
                if(d[2008] > 1000) {
                    return d[2008] * .01
                }
                else if(200 < d[2008 < 1000 ]) {
                    return d[2008] * 0.01
                }
                return d[2008] * .05
            })
            .attr("cx", (d,i) => {
                return 5 + i * 19
            })
            .attr("cy", 30)
            .attr("fill", "blue")
        // vis.areaCell1 = vis.row_groups.selectAll().data(vis.data1)
        //     .enter().append("path")
        //     .attr("r", d => d[2018])
        //     .attr("cx", 0)
        //     .attr("cy", 0)
        //     .attr("fill", "red")
        // vis.areaCell2 = vis.row_groups.selectAll().data(vis.data1)
        //     .enter().append("path")
        //     .attr("r", d => d[2021])
        //     .attr("cx", 0)
        //     .attr("cy", 0)
        //     .attr("fill", "red")

    }


    /*
     * Data wrangling
     */

    wrangleData() {
        // vis.sampleData = vis.firstArray.filter(function (d) {
        //     // console.log("FILTER INFO", d)
        //     if(d.basket_combined_simplified = "Fixed-broadband basket" && d.ITURegion == "Africa") {
        //         return d[2008]
        //     }
        //     // return d.basket_current = "Fixed-broadband basket (5GB)"
        //     // return d.Economy = "Aruba"
        // })
    }


    /*
    * The drawing function
    */

    updateVis() {}
}