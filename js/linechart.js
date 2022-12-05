class LineVis {

    constructor(parentElement, literacy, patents, broadband) {
        this.parentElement = parentElement;
        this.literacy = literacy;
        this.patents = patents;
        this.broadband = broadband
        // this.geoData = geoData;
        // this.filteredData = this.broadbandData;

        // define start and end period and set to default values
        this.startYear = 1998
        this.endYear = 2021

        this.initVis()
    }

    initVis() {
        let vis = this;

        vis.margin = {top: 20, right: 20, bottom: 20, left: 10};
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
            .attr("x1", 1200)
            .attr("y1", 500)
            .attr("x2", 1250)
            .attr("y2", 500);

        // append legend
        vis.svg.append('line')
            .style("stroke", "black")
            .style("stroke-width", 4.25)
            .attr("x1", 1200)
            .attr("y1", 600)
            .attr("x2", 1250)
            .attr("y2", 600);

        vis.legendlabel = vis.svg
            .append("text")
            .attr("class", "legend")
            .attr("fill", "black")
            .attr("x", 1200)
            .attr("y", 525)
            .attr("font-size", "smaller")
            .text("Patent Applications (in 10,000s")

        vis.legendlabel2 = vis.svg
            .append("text")
            .attr("class", "legend")
            .attr("fill", "black")
            .attr("x", 1200)
            .attr("y", 625)
            .attr("font-size", "smaller")
            .text("Female literacy rate (in .1%")

        vis.wrangleData()
    }

    /*
    * Data wrangling
    */

    wrangleData() {
        let vis = this;

        // vis.displayData = []
        // vis.hivData.forEach(function (d) {
        //     let pushData = {
        //         region: d["Country Name"],
        //         years: {
        //             // "1990": +d["1990 [YR1990]"],
        //             // "1991": +d["1991 [YR1991]"],
        //             // "1992": +d["1992 [YR1992]"],
        //             // "1993": +d["1993 [YR1993]"],
        //             // "1994": +d["1994 [YR1994]"],
        //             // "1995": +d["1995 [YR1995]"],
        //             // "1996": +d["1996 [YR1996]"],
        //             "1997": +d["1997 [YR1997]"],
        //             "1998": +d["1998 [YR1998]"],
        //             "1999": +d["1999 [YR1999]"],
        //             "2000": +d["2000 [YR2000]"],
        //             "2001": +d["2001 [YR2001]"],
        //             "2002": +d["2002 [YR2002]"],
        //             "2003": +d["2003 [YR2003]"],
        //             "2004": +d["2004 [YR2004]"],
        //             "2005": +d["2005 [YR2005]"],
        //             "2006": +d["2006 [YR2006]"],
        //             "2007": +d["2007 [YR2007]"],
        //             "2008": +d["2008 [YR2008]"],
        //             "2009": +d["2009 [YR2009]"],
        //             "2010": +d["2010 [YR2010]"],
        //             "2011": +d["2011 [YR2011]"],
        //             "2012": +d["2012 [YR2012]"],
        //             "2013": +d["2013 [YR2013]"],
        //             "2014": +d["2014 [YR2014]"],
        //             "2015": +d["2015 [YR2015]"],
        //             "2016": +d["2016 [YR2016]"],
        //             "2017": +d["2017 [YR2017]"],
        //             "2018": +d["2018 [YR2018]"],
        //             "2019": +d["2019 [YR2018]"],
        //             "2020": +d["2020 [YR2020]"],
        //             "2021": +d["2021 [YR2021]"],
        //         }
        //
        //     }
        //     vis.displayData.push(pushData)
        //
        // })

        console.log("line chart display data", vis.literacy)


        // for(let i = 0; i < 94; i++) {
        //     if (vis.displayData[i].region == "World") {
        //         vis.useData = vis.displayData[i]
        //     }
        // }
        vis.updateVis()
    }

    updateVis() {
        let vis = this;

        console.log("use data", vis.broadband)


        // scales and axes
        vis.x = d3.scaleTime()
            .range([0, vis.width])
            .domain(d3.extent(vis.patents, function(d) { return d["Year"]; }));

        vis.y = d3.scaleLinear()
            .range([vis.height, 0])
            // .domain([0, d3.max(vis.patents, function(d) { return d["Resident Patents"]; })]);
            .domain([0, 30])
        vis.xAxis = d3.axisBottom()
            .scale(vis.x)

        vis.yAxis = d3.axisLeft()
            .scale(vis.y);

        // Add the line
        vis.svg.append("path")
            .datum(vis.patents)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function(d) { return vis.x(d["Year"]) })
                .y(function(d) { return vis.y(d["Resident Patents"]) })
            )

        vis.svg.append("path")
            .datum(vis.literacy)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function(d) { return vis.x(d["Year"]) })
                .y(function(d) { return vis.y(d["Female Literacy"]) })
            )

        vis.svg.append("path")
            .datum(vis.broadband)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 1.5)
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
            .text("Key Indicator");

        // Add X axis --> it is a date format
        // let years = [1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
        // vis.x = d3.scaleLinear()
        //     .domain(d3.extent(years))
        //     // .domain(vis.useData.years["1997"], vis.useData.years["2021"])
        //     .range([ 0, vis.width ]);
        //
        // vis.svg.append("g")
        //     .attr("transform", "translate(0," + vis.height + ")")
        //     .call(d3.axisBottom(vis.x));
        //
        //
        // // Add Y axis
        // vis.y = d3.scaleLinear()
        //     // .domain([0, d3.max(vis.useData, function(d) { return +d.value; })])
        //     .domain([0, 1000000])
        //     .range([ vis.height, 0 ]);
        // vis.svg.append("g")
        //     .attr("translate", )
        //     .call(d3.axisLeft(vis.y));
        //
        // vis.interest = [vis.useData.years]
        // console.log("is this working", vis.interest)
        // vis.usingData = vis.interest[0]
        // console.log("is this working", vis.usingData)
        // console.log("is this working", vis.usingData[1997])
        // console.log("scale info", vis.x(1999))
        //
        // for(let i = 1997; i < 2022; i++) {
        //     vis.svg.append("path")
        //         .datum(vis.usingData)
        //         .attr("fill", "none")
        //         .attr("stroke", "steelblue")
        //         .attr("stroke-width", 1.5)
        //         .attr("d", d3.line()
        //             .x(vis.x(i))
        //             .y(vis.y(vis.usingData[i]))
        //         )
        // }
    }
}