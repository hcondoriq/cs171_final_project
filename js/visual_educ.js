/* * * * * * * * * * * * * *
*          MapVis          *
* * * * * * * * * * * * * */


class visEduc {

    constructor(parentElement, data1, data2) {
        this.parentElement = parentElement;
        this.data = data1
        this.data_prim = data1
        this.data_sec = data2
        this.displayData
        // define colors
        // this.colors = ['#fddbc7', '#f4a582', '#d6604d', '#b2182b']
        console.log("init data", this.data)
        this.initVis()
    }

    initVis() {
        let vis = this;



        vis.margin = { top: 10, right: 20, bottom: 100, left: 50 };
        // vis.width = 1300 - vis.margin.left - vis.margin.right;
        // vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;
        // vis.height = 500 - vis.margin.top - vis.margin.bottom;
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;
        console.log("width", vis.width)
        console.log("height", vis.height)

        // init drawing area
        vis.svgFig = d3.select("#" + vis.parentElement).append("svg")
            .attr('width', vis.width + vis.margin.left + vis.margin.right)
            .attr('height', vis.height + vis.margin.top + vis.margin.bottom)
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`)
            .attr('id', 'VidEdu_fig')
        vis.svg = d3.select("#" + 'VidEdu_fig').append("svg")
            .attr('width', vis.width - 100 + vis.margin.left + vis.margin.right)
            .attr('height', vis.height + vis.margin.top + vis.margin.bottom)
            .append('g')
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        vis.fig_fact = 0.75
        // axis groups
        vis.xAxisGroup = vis.svg.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate (0,${vis.height})`);

        vis.yAxisGroup = vis.svg.append('g')
            .attr('class', 'axis y-axis');
        // initialize the scales
        vis.xscale = d3.scaleBand()
            .range([0, vis.width * vis.fig_fact])
            .padding(0.1)

        vis.yscale = d3.scaleLinear()
            .range([vis.height, 0])

        vis.yAxis = d3.axisLeft()
            .scale(vis.yscale);

        vis.xAxis = d3.axisBottom()
            .scale(vis.xscale);



        vis.svg.append("rect")
            .attr("width", 100)
            .attr("height", 20)
            .style("fill", "#04B46A")
            .attr("transform", `translate(${vis.width * 0.8}, 0) rotate(90)`)
        vis.svg.append("rect")
            .attr("width", 100)
            .attr("height", 20)
            .style("fill", "#437983")
            .attr("transform", `translate(${vis.width * 0.8}, 100) rotate(90)`)
        vis.svg.append("rect")
            .attr("width", 100)
            .attr("height", 20)
            .style("fill", "#D4B46A")
            .attr("transform", `translate(${vis.width * 0.8}, 200) rotate(90)`)

        vis.svg
            .append("text")
            .attr("class", "legend_ed")
            .attr("fill", "black")
            .attr("x", vis.width * 0.802)
            .attr("y", 50)
            .text("Secondary education")
        vis.svg
            .append("text")
            .attr("class", "legend_ed")
            .attr("fill", "black")
            .attr("x", vis.width * 0.802)
            .attr("y", 150)
            .text("Primary education")
        vis.svg
            .append("text")
            .attr("class", "legend_ed")
            .attr("fill", "black")
            .attr("x", vis.width * 0.802)
            .attr("y", 250)
            .text("No schooling")
        vis.tooltip = d3.select("body").append('div')
            .attr('class', "tooltip")
            .attr('id', 'EduTooltip')
        vis.wrangleData()



    }

    wrangleData() {
        let vis = this;



        vis.displayData = vis.data
        console.log("data to wrangle", vis.displayData)

        vis.displayData.forEach((element, index) => {
            // update to reflect only developing countries
            element.world_ave = +element.world_ave
            element["no_school"] = 100 - element.world_ave
            // element["sec_school"] = 20
            element["sec_school"] = +vis.data_sec[index].world_ave
            element["prim_school"] = 100 - element["sec_school"] - element["no_school"]
            element["total"] = element["no_school"] + element["sec_school"] + element["prim_school"]
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
                    .attr("y", d => vis.yscale(d.prim_school + d.no_school))
                    .attr("width", vis.xscale.bandwidth())
                    .attr("height", d => (vis.height - vis.yscale(+d.prim_school)))
                    .attr("fill", "#437983")
                    .attr("opacity", 0.7)
                    .selection()
                    .on('mouseover', function (event, d) {
                        d3.select(this)
                            .attr('stroke-width', '0.5px')
                            .attr('stroke', 'black')
                        vis.tooltip
                            .style("opacity", 1)
                            .style("left", event.pageX + 20 + "px")
                            .style("top", event.pageY + "px")
                            .html(`
                            <div style="border: thin solid grey; 
                                        border-radius: 5px; background: #e6e6e6; padding: 20px">
                            <h4>Category: Only primary education </h4>
                            <h4>Year: ${d.year}</h4>
                            <h4>Education Level: ${d.prim_school.toFixed(2)} % </h4>
                            </div>`);
                    })
                    .on('mouseout', function (event, d) {
                        d3.select(this)
                            .attr('stroke-width', '0px')
                        vis.tooltip
                            .style("opacity", 0)
                            .style("left", 0)
                            .style("top", 0)
                            .html(``);
                    })


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
                    .attr("y", d => vis.yscale(d.no_school))
                    .attr("width", vis.xscale.bandwidth())
                    .attr("height", d => (vis.height - vis.yscale(d.no_school)))
                    .attr("fill", "#D4B46A")
                    .attr("opacity", 0.8)
                    .attr("stroke-width", 1)
                    .selection()
                    .on('mouseover', function (event, d) {
                        console.log(d)
                        d3.select(this)
                            .attr('stroke-width', '0.5px')
                            .attr('stroke', 'black')
                        vis.tooltip
                            .style("opacity", 1)
                            .style("left", event.pageX + 20 + "px")
                            .style("top", event.pageY + "px")
                            .html(`
                            <div style="border: thin solid grey; 
                                        border-radius: 5px; background: #e6e6e6; padding: 20px">
                            <h4>Category: No schooling </h4>
                            <h4>Year: ${d.year}</h4>
                            <h4>Education Level: ${d.no_school.toFixed(2)} %</h4>
                            </div>`);
                    })
                    .on('mouseout', function (event, d) {
                        d3.select(this)
                            .attr('stroke-width', '0px')
                        vis.tooltip
                            .style("opacity", 0)
                            .style("left", 0)
                            .style("top", 0)
                            .html(``);
                    })
                ,
                update => update
                    .selection()
                ,
                exit => exit
                    .remove()
            )



        vis.secBars = vis.svg.selectAll(".secbars")
            .data(vis.displayData)
        vis.secBars
            .join(
                enter => enter
                    .append("rect")
                    .merge(vis.secBars)
                    .attr("class", "bars")

                    .attr("x", d => vis.xscale(d.year))
                    .attr("y", d => vis.yscale(d.no_school + d.prim_school + d.sec_school))
                    .attr("width", vis.xscale.bandwidth())
                    .attr("height", d => (vis.height - vis.yscale(d.sec_school)))
                    .attr("fill", "#04B46A")
                    .attr("opacity", 0.8)
                    .attr("stroke-width", 1)
                    .selection()
                    .on('mouseover', function (event, d) {
                        d3.select(this)
                            .attr('stroke-width', '0.5px')
                            .attr('stroke', 'black')
                        vis.tooltip
                            .style("opacity", 1)
                            .style("left", event.pageX + 20 + "px")
                            .style("top", event.pageY + "px")
                            .html(`
                            <div style="border: thin solid grey; 
                                        border-radius: 5px; background: #e6e6e6; padding: 20px">
                            <h4>Category: Secondary education </h4>
                            <h4>Year: ${d.year}</h4>
                            <h4>Education Level: ${d.sec_school.toFixed(2)} %</h4>
                            </div>`);
                    })
                    .on('mouseout', function (event, d) {
                        d3.select(this)
                            .attr('stroke-width', '0px')
                        vis.tooltip
                            .style("opacity", 0)
                            .style("left", 0)
                            .style("top", 0)
                            .html(``);
                    })
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