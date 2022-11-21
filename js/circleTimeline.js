class VisOne {

    constructor(parentElement, firstArray, secondArray) {
        this.parentElement = parentElement;
        this.firstArray = firstArray;
        this.secondArray = secondArray;
        // this.thirdgroup = thirdArray;
        // this.filteredData =;
        this.displayData = []

        this.initvis()
    }

    /*
    * Initialize visualization (static content; e.g. SVG area, axes, brush component)
    */

    initvis() {

        let vis = this;

        // vis.sampleData = []

        // vis.sampleData = vis.firstArray.filter(function (d) {
        //     // console.log("FILTER INFO", d)
        //     if(d.basket_combined_simplified = "Fixed-broadband basket" && d.ITURegion == "Africa") {
        //         return d[2008]
        //     }
        //     // return d.basket_current = "Fixed-broadband basket (5GB)"
        //     // return d.Economy = "Aruba"
        // })
        // console.log("sample data", vis.sampleData)

        vis.margin = {top: 20, right: 20, bottom: 20, left: 20};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", 700)
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        //append tooltip
        vis.tooltip = d3.select("body").append('div')
            .attr('class', "tooltip")
            .attr('id', 'circleTooltip')

        // create row group per family object
        // vis.rows = vis.svg.selectAll(".row-group")
        //     .data(vis.sampleData)

        // console.log("rows?", vis.rows)

        // vis.row_groups = vis.rows
        //     .enter()
        //     .merge(vis.rows)
        //     .append("g")

        // color scale (to implement later)
        vis.colorScale = d3.scaleLinear()
            .range(["#FF0000", "#01871e"])
            .domain([0, 50])
        // .domain([0, d3.max(vis.data2, d => d.internetcost)])

        console.log("color scale", vis.colorScale)

        // draw circles
        // vis.areaCell = vis.svg.selectAll("circle")
        //     .data(vis.sampleData)
        //     .enter().append("circle")
        //     .attr("r", function(d) {
        //         if(d[2008] > 1000) {
        //             return d[2008] * .01
        //         }
        //         else if(200 < d[2008 < 1000 ]) {
        //             return d[2008] * 0.01
        //         }
        //         return d[2008] * .05
        //     })
        //     .attr("cx", (d,i) => {
        //         return 5 + i * 19
        //     })
        //     .attr("cy", 30)
        //     .attr("fill", "blue")
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

        vis.wrangleData()
    }


    /*
     * Data wrangling
     */

    wrangleData() {
        let vis = this;
        // vis.sampleData = vis.firstArray.filter(function (d) {
        //     // console.log("FILTER INFO", d)
        //     if(d.basket_combined_simplified = "Fixed-broadband basket" && d.ITURegion == "Africa") {
        //         return d[2008]
        //     }

        vis.displayData = []
        vis.firstArray.forEach(function (d) {
            let pushData = {
            region: d.group,
            years: {
                "0": d[2008],
                "1": d[2009],
                "2": d[2010],
                "3": d[2011],
                "4": d[2012],
                "5": d[2013],
                "6": d[2014],
                "7": d[2015],
                "8": d[2016],
                "9": d[2017],
                "10": d[2018],
                "11": d[2019],
                "12": d[2020],
                "13": d[2021],
                },
            access: {
                "0": d[0],
                "1": d[1],
                "2": d[2],
                "3": d[3],
                "4": d[4],
                "5": d[5],
                "6": d[6],
                "7": d[7],
                "8": d[8],
                "9": d[9],
                "10": d[10],
                "11": d[11],
                "12": d[12],
                },
            // income_class: d.Income_2021,
            measure: d.Baskets_combined_simplified,
            // region: d.ITURegion,
            unit: d.unit
            }
            vis.displayData.push(pushData)
        })
        console.log("display data", vis.displayData)

        vis.displayData2 = []
        vis.secondArray.forEach(function (d) {
            let pushData = {
                // region: d.Region,
                access_years: {
                    "0": d[2008],
                    "1": d[2009],
                    "2": d[2010],
                    "3": d[2011],
                    "4": d[2012],
                    "5": d[2013],
                    "6": d[2014],
                    "7": d[2015],
                    "8": d[2016],
                    "9": d[2017],
                    "10": d[2018],
                    "11": d[2019],
                    "12": d[2020],
                    "13": d[2021]
                    // "0": d[1990],
                    // "1": d[1991],
                    // "2": d[1992],
                    // "3": d[1993],
                    // "4": d[1994],
                    // "5": d[1995],
                    // "6": d[1996],
                    // "7": d[1997],
                    // "8": d[1998],
                    // "9": d[1999],
                    // "10": d[2000],
                    // "11": d[2001],
                    // "12": d[2002],
                    // "13": d[2003],
                    // "14": d[2004],
                    // "15": d[2005],
                    // "16": d[2006],
                    // "17": d[2007],
                    // "18": d[2008],
                    // "19": d[2009],
                    // "20": d[2010],
                    // "21": d[2011],
                    // "22": d[2012],
                    // "23": d[2013],
                    // "24": d[2014],
                    // "25": d[2015],
                    // "26": d[2016],
                    // "27": d[2017],
                    // "28": d[2018],
                    // "29": d[2019],
                    // "30": d[2020],
                    // "31": d[2021],
                },
                // income_class: d.Income_2021,
                // measure: d.Baskets_combined_simplified,
                // region: d.ITURegion,
                // unit: d.unit
            }
            vis.displayData2.push(pushData)
        })

        console.log("second display data", vis.displayData2)

        vis.sampleData = vis.displayData.filter(function (d) {
            // console.log("FILTER INFO", d)
            if(d.unit == "USD" && d.measure == "Fixed broadband basket") {
                return d
            }
        })
        console.log("sample data", vis.sampleData)

        vis.svg.append('line')
            .style("stroke", "black")
            .style("stroke-width", 1.25)
            .attr("x1", 125)
            .attr("y1", 50)
            .attr("x2", 1220)
            .attr("y2", 50);

        vis.svg.append('line')
            .style("stroke", "black")
            .style("stroke-width", 1.25)
            .attr("x1", 125)
            .attr("y1", 150)
            .attr("x2", 1220)
            .attr("y2", 150);

        vis.svg.append('line')
            .style("stroke", "black")
            .style("stroke-width", 1.25)
            .attr("x1", 125)
            .attr("y1", 250)
            .attr("x2", 1220)
            .attr("y2", 250);

        vis.svg.append('line')
            .style("stroke", "black")
            .style("stroke-width", 1.25)
            .attr("x1", 125)
            .attr("y1", 350)
            .attr("x2", 1220)
            .attr("y2", 350);

        vis.svg.append('line')
            .style("stroke", "black")
            .style("stroke-width", 1.25)
            .attr("x1", 125)
            .attr("y1", 450)
            .attr("x2", 1220)
            .attr("y2", 450);

        vis.svg.append('line')
            .style("stroke", "black")
            .style("stroke-width", 1.25)
            .attr("x1", 125)
            .attr("y1", 550)
            .attr("x2", 1220)
            .attr("y2", 550);

        vis.svg.append('line')
            .style("stroke", "black")
            .style("stroke-width", 1.25)
            .attr("x1", 125)
            .attr("y1", 650)
            .attr("x2", 1220)
            .attr("y2", 650);

        //Append a defs (for definition) element to your SVG
        let defs = vis.svg.append("defs");

        //Append a linearGradient element to the defs and give it a unique id
        vis.linearGradient = defs.append("linearGradient")
            .attr("id", "linear-gradient")

        //Horizontal gradient
        vis.linearGradient
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%");

        //Set the color for the start (0%)
        vis.linearGradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#FF0000"); //light blue

        //Set the color for the end (100%)
        vis.linearGradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#01871e"); //dark blue

        //Draw the rectangle and fill with gradient
        vis.svg.append("rect")
            .attr("width", 300)
            .attr("height", 20)
            .style("fill", "url(#linear-gradient)")
            .attr("transform", "translate(1300, 100)rotate(90)")

        vis.legendlabel = vis.svg
            .append("text")
            .attr("class", "legend")
            .attr("fill", "black")
            .attr("x", 1320)
            .attr("y", 110)
            .attr("font-size", "smaller")
            .text("Low Access")

        vis.legendlabel2 = vis.svg
            .append("text")
            .attr("class", "legend")
            .attr("fill", "black")
            .attr("x", 1320)
            .attr("y", 400)
            .attr("font-size", "smaller")
            .text("High Access")

        let legendcircles = [5, 10, 20, 30]

        vis.circleLegend = vis.svg
            .append("circle")
            .data(legendcircles)
            .attr("r", (d, i) => {
                for(let i = 0; i < legendcircles.length; i++){
                // console.log("circles", d, i)
                    return legendcircles[i]
                }
            })
            .attr("cx", 1290)
            .attr("cy", 430)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 3)

        vis.circleLegend2 = vis.svg
            .append("circle")
            .data(legendcircles)
            .attr("r", 10)
            .attr("cx", 1290)
            .attr("cy", 460)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 3)

        vis.circleLegend3 = vis.svg
            .append("circle")
            .data(legendcircles)
            .attr("r", 20)
            .attr("cx", 1290)
            .attr("cy", 500)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 3)

        vis.circleLegend2 = vis.svg
            .append("circle")
            .data(legendcircles)
            .attr("r", 30)
            .attr("cx", 1290)
            .attr("cy", 560)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 3)

        vis.circleLegend2 = vis.svg
            .append("circle")
            .data(legendcircles)
            .attr("r", 40)
            .attr("cx", 1290)
            .attr("cy", 640)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 3)

        vis.legendlabel3 = vis.svg
            .append("text")
            .attr("class", "legend")
            .attr("fill", "black")
            .attr("x", 1330)
            .attr("y", 435)
            .attr("font-size", "smaller")
            .text("Low Cost")

        vis.legendlabel4 = vis.svg
            .append("text")
            .attr("class", "legend")
            .attr("fill", "black")
            .attr("x", 1340)
            .attr("y", 650)
            .attr("font-size", "smaller")
            .text("High Cost")


        vis.updateVis()
    }


    /*
    * The drawing function
    */

    updateVis() {
        let vis = this;



        // create row group per family object
        // vis.rows = vis.svg.selectAll(".row-group")
        //     .data(vis.sampleData)

        // create rows per family object
        vis.rows = vis.svg.selectAll(".matrix-row")
            .data(vis.sampleData)

        // console.log("rows?", vis.rows)

        // vis.row_groups = vis.rows
        //     .enter()
        //     .append("g")

        // vis.row_groups
        //     .merge(vis.rows)
        //     .attr("opacity", 1)
        //     // .attr("transform", (d,i) => "translate(120," + (i*(vis.cellHeight + vis.cellPadding) + 150 )+ " )")
        //     .transition()
        //     .duration(1000)

        // console.log("row groups", vis.row_groups)

        // vis.rows.exit().remove()

        for(let i = 0; i < 14; i++) {
                // console.log(vis.displayData2[i].years)
            vis.areaCell = vis.svg.selectAll()
                .data(vis.sampleData)
                .enter().append("circle")
                .attr("r", (d) => {
                    console.log("hmm", d.years, i)
                    if (d.years[i] > 70) {
                        return 30
                    }
                    else if(d.years[i] == 0) {
                        return 5
                    }
                    else {
                        return (d.years[i]) * 0.5
                    }
                })
                .attr("cy", (d, i) => {
                    return 50 + i * 100
                })
                .attr("cx", 150 + 80*i)
                .attr("fill", (d) => {
                    // console.log("d,i?", d, i)
                    if (d.years[i] == 0) {
                        return "#FAF9F6"
                    }
                    else {
                        console.log("hey again", d.access, i)
                        let value = d.access[i]
                        // console.log("hey", i, j, vis.displayData2[i].years)
                        // console.log(vis.colorScale(vis.displayData2[i].years[j]))
                        // let value = vis.colorScale(vis.displayData2[i].years[j])
                        return vis.colorScale(value)
                    }
                })
                // change fill for those circles with no values
                .attr("stroke", "black")
                .on('mouseover', function(event, d){

                console.log("d", d)
                let circleName = d.name
                // vis.sampleData.forEach()
                vis.sampleData.forEach(row => {
                    // console.log("D.STATE", d)
                    if (row.name === circleName) {
                        // console.log("row", row)
                        d3.select(this)
                            .attr('stroke-width', '3px')
                            .attr('stroke', 'black')
                            .attr('fill', 'red')
                        vis.tooltip
                            .style("opacity", 1)
                            .style("left", event.pageX + 20 + "px")
                            .style("top", event.pageY + "px")
                            .html(`
        <div style="border: thin solid grey; border-radius: 5px; background: lightgrey; padding: 20px">
            <h3>Region: ${d.region}<h3>
            <h4>Internet Cost: ${d.years[i]}</h4>
            <h4>Units: ${row.unit}</h4>
            <h4>Measure: ${d.measure}</h4>

        </div>`);
                    }
                })

            })
                .on('mouseout', function(event, d) {
                    d3.select(this)
                        .attr('stroke-width', '1px')
                        .attr("fill", (d) => {

                            console.log("access", d.access[i])
                            return vis.colorScale(d.access[i])
                            // let circleName = d.name
                            //
                            // let color = ""
                            // vis.sampleData.forEach(d => {
                            //     // console.log("D.STATE", vis.stateInfo)
                            //     // if (d.name === circleName) {
                            //         color = vis.colorScale(d.access[i])
                            //             // "#02C8D9"
                            //     // }
                            // })
                            // return color;
                        })
                    vis.tooltip
                        .style("opacity", 0)
                        .style("left", 0)
                        .style("top", 0)
                        .html(``);
                })
        }

        // make it mobile friendly so when you drag, it moves over
        // make the circles closer together - done
        // make a threshold for the circles, e.g., if it's x value, cap it at this size - done
        // add a tooltip - done
        // make a color scale attached to internet access
        // make an if statement so the tooltip returns to white if there's no value
        // you may not need to replace NAs with zero since you have an if statement for your NAs now
        // figure out how to access the value of internet cost in the tooltip



            // label text
            vis.labelCell = vis.svg.selectAll()
                .data(vis.sampleData)
                .enter()
                .append("text")
                .attr("class", "label-rows")
                // .attr("transform", "rotate(90)")
                // .attr("x", (d,i) => {
                //     return i * 80
                // })
                // .attr("y", -10)
                .attr("x", 15)
                .attr("y", (d,i) => {
                    return 55 + i * 100
                })
                .attr("font-size", "small")
                // .attr("transform", (d,i) => "translate(20", + 15 + i * 50+")rotate(45)")

                .text(d => d.region)
        // }

        // create a list of all the keys
        let years = [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
        // label years
        // for(let i = 0; i < 14; i++) {
            vis.yearCell = vis.svg.selectAll()
                .data(years)
                .enter()
                .append("text")
                .attr("class", "label-col")
                // .attr("transform", "rotate(90)")
                // .attr("x", (d,i) => {
                //     return i * 80
                // })
                // .attr("y", -10)
                .attr("x", (d,i) => {
                    // console.log("i here", i)
                    return 135 + i * 80
                })
                .attr("y", 10)
                .attr("font-size", "small")
                // .attr("transform", (d,i) => "translate(20", + 15 + i * 50+")rotate(45)")
                .text((d, i) => years[i])
        // }
        console.log("year labels", vis.yearCell)


        console.log("areaCell", vis.areaCell)
    }
}