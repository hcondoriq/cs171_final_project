/* * * * * * * * * * * * * *
*          MapVis          *
* * * * * * * * * * * * * */


class visEduc {

    constructor(parentElement, data) {
        this.parentElement = parentElement;
        this.data = data
        this.displayData
        // define colors
        // this.colors = ['#fddbc7', '#f4a582', '#d6604d', '#b2182b']

        this.initVis()
    }

    initVis() {
        let vis = this;


        vis.margin = { top: 20, right: 20, bottom: 20, left: 20 };
        vis.width = 800 - vis.margin.left - vis.margin.right;
        // vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;
        vis.height = 600 - vis.margin.top - vis.margin.bottom;
        console.log("width", vis.width)
        console.log("height", vis.height)
        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr('width', vis.width + vis.margin.left + vis.margin.right)
            .attr('height', vis.height + vis.margin.top + vis.margin.bottom)
            .append('g')
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        // add title
        vis.svg.append('g')
            .attr('class', 'title bar-title')
            .attr("id", vis.bar_id)
            .append('text')
            .text("Educational attainment")
            .attr('transform', `translate(${vis.width / 2}, -5)`)
            .attr('text-anchor', 'middle');


        // axis groups
        vis.xAxisGroup = vis.svg.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate (0,${vis.height})`);

        vis.yAxisGroup = vis.svg.append('g')
            .attr('class', 'axis y-axis');
        // initialize the scales
        vis.xscale = d3.scaleBand()
            .range([0, vis.width])
            .padding(0.1)

        vis.yscale = d3.scaleLinear()
            .range([vis.height, 0])

        vis.yAxis = d3.axisLeft()
            .scale(vis.yscale);

        vis.xAxis = d3.axisBottom()
            .scale(vis.xscale);

        vis.wrangleData()






    }

    wrangleData() {
        let vis = this;



        vis.displayData = vis.data[0]
        console.log("data to wrangle", vis.displayData)

        vis.displayData.forEach(element => {
            // update to reflect only developing countries
            element.world_ave = +element.world_ave * 0.7
            element["no_school"] = 80 - element.world_ave
            element["sec_school"] = 20

        });
        vis.updateVis()
    }

    updateVis() {


        let vis = this;

        console.log("vis object ", vis.displayData)


        vis.xscale.domain(vis.displayData.map(d => d.year))
        vis.yscale.domain([0, 100])


        vis.primBars = vis.svg.selectAll(".bars")
            .data(vis.displayData)


        vis.primBars
            .join(
                enter => enter
                    .append("rect")
                    .merge(vis.primBars)
                    .attr("class", "bars")

                    .attr("x", d => vis.xscale(d.year))
                    .attr("y", d => vis.yscale(d.world_ave))
                    .attr("width", vis.xscale.bandwidth())
                    .attr("height", d => (vis.height - vis.yscale(+d.world_ave)))
                    .attr("fill", "#437983")
                    .attr("opacity", 0.7)
                    .selection()


                ,
                update => update
                    .selection()

                ,
                exit => exit
                    .remove()
            )

        vis.noschoolBars = vis.svg.selectAll(".nsbars")
            .data(vis.displayData)
        vis.noschoolBars
            .join(
                enter => enter
                    .append("rect")
                    .merge(vis.noschoolBars)
                    .attr("class", "bars")

                    .attr("x", d => vis.xscale(d.year))
                    .attr("y", d => vis.yscale(d.no_school + d.world_ave))
                    .attr("width", vis.xscale.bandwidth())
                    .attr("height", d => (vis.height - vis.yscale(d.no_school)))
                    .attr("fill", "#D4B46A")
                    .attr("opacity", 0.8)
                    .attr("stroke-width", 1)
                    .selection()
                ,
                update => update
                    .selection()
                ,
                exit => exit
                    .remove()
            )

        // TO DO add lower secondary education

        vis.secBars = vis.svg.selectAll(".secbars")
            .data(vis.displayData)
        vis.secBars
            .join(
                enter => enter
                    .append("rect")
                    .merge(vis.secBars)
                    .attr("class", "bars")

                    .attr("x", d => vis.xscale(d.year))
                    .attr("y", d => vis.yscale(d.no_school + d.world_ave + d.secBars))
                    .attr("width", vis.xscale.bandwidth())
                    .attr("height", d => (vis.height - vis.yscale(d.no_school)))
                    .attr("fill", "#04B46A")
                    .attr("opacity", 0.8)
                    .attr("stroke-width", 1)
                    .selection()
                ,
                update => update
                    .selection()
                ,
                exit => exit
                    .remove()
            )


        vis.svg.select(".y-axis").call(vis.yAxis);
        vis.svg.select(".x-axis").call(vis.xAxis);

    }

}





