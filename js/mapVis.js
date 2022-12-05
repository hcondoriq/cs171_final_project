/*
 * MapVis - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the map
 * @param _broadBandData	-- the dataset 'fixed-broadband-subscriptions'
 * @param _geoData			-- the dataset about the countries ('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json')
 */


class MapVis {

    constructor(parentElement, broadbandData, geoData) {
        this.parentElement = parentElement;
        this.broadbandData = broadbandData;
        this.geoData = geoData;
        this.filteredData = this.broadbandData;

        // define colors
        this.colors = ['#e681c5', '#c568a0', '#87476c', '#40213c']

        // define start and end period and set to default values
        this.startYear = 1998
        this.endYear = 2021


        this.initVis()
    }

    initVis() {
        let vis = this;

        vis.margin = {top: 20, right: 20, bottom: 20, left: 20};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // init drawing area
        // vis.svg = d3.select("#" + vis.parentElement).append("svg")
        //     .attr("width", vis.width)
        //     .attr("height", vis.height)
        //     .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

        // add title
        // vis.svg.append('g')
        //     .attr('class', 'title')
        //     .attr('id', 'map-title')
        //     .append('text')
        //     .text('How has access to broadband internet in specific countries changed over time?')
        //     .attr('transform', `translate(${vis.width / 2}, 10)`)
        //     .attr('text-anchor', 'middle');

        // referencing code from the lab for submission_week9
        vis.projection = d3.geoOrthographic()
            .translate([vis.width / 2, vis.height / 2.5])
            .scale(200);

        vis.path = d3.geoPath()
            .projection(vis.projection);

        vis.svg.append("path")
            .datum({type: "Sphere"})
            .attr("class", "graticule")
            .attr('fill', '#ADDEFF')
            .attr("stroke","rgba(129,129,129,0.35)")
            .attr("d", vis.path);

        vis.world = topojson.feature(vis.geoData, vis.geoData.objects.countries).features

        vis.countries = vis.svg.selectAll(".country")
            .data(vis.world)
            .enter().append("path")
            .attr('class', 'country')
            .attr("d", vis.path)


        // make the map draggable / rotatable
        let m0,
            o0;

        vis.svg.call(
            d3.drag()
                .on("start", function (event) {

                    let lastRotationParams = vis.projection.rotate();
                    m0 = [event.x, event.y];
                    o0 = [-lastRotationParams[0], -lastRotationParams[1]];
                })
                .on("drag", function (event) {
                    if (m0) {
                        let m1 = [event.x, event.y],
                            o1 = [o0[0] + (m0[0] - m1[0]) / 4, o0[1] + (m1[1] - m0[1]) / 4];
                        vis.projection.rotate([-o1[0], -o1[1]]);
                    }

                    // Update the map
                    vis.path = d3.geoPath().projection(vis.projection);
                    d3.selectAll(".country").attr("d", vis.path)
                    d3.selectAll(".graticule").attr("d", vis.path)
                })
        )

        // append tooltip
        vis.tooltip = d3.select("body").append('div')
            .attr('class', "tooltip")
            .attr('id', 'mapTooltip')

        // add legend
        vis.legend = vis.svg.append("g")
            .attr('class', 'legend')
            .attr('transform', `translate(490, 380)`)

        vis.legendScale = d3.scaleBand()
            .rangeRound([0, 200])
            // .padding(0.25)
            .domain(vis.colors.map( (d, i) => ["<0.5", "0.5-5", "5-15", ">15"][i]));

        vis.legend.selectAll()
            .data(vis.colors)
            .enter()
            .append("rect")
            .attr("x", (d, i) => {
                return i * vis.legendScale.bandwidth();
            })
            .attr("width", vis.legendScale.bandwidth())
            .attr("height", 10)
            .attr("fill", (d, i) => {
                return vis.colors[i];
            })

        vis.xAxis = d3.axisBottom()
            .scale(vis.legendScale);

        vis.svg.append("g")
            .attr("class", "x-axis axis")
            .attr('transform', `translate(490, 390)`)

        // append legend title
        vis.legendTitle = vis.svg.append("g")
            .attr("id", "legend-title")
            .append("text")
            .text("Fixed Broadband Subscriptions (per 100 people)")
            .attr('transform', `translate(490, 375)`)
            .attr("text-anchor", 'left')
            .attr("font-size", 9)
            .attr("font-weight", 9)

        vis.svg.select(".x-axis").call(vis.xAxis);

        vis.wrangleData();
    }

    // assign a color for each country based on the average value of broadband data
    assignColor(geoCountryName) {
        let vis = this;

        let listofavgs = []

        // create an empty array that will store the broadband values for the selected country
        let broadbandArray = [];

        // iterate through each country in the broadband dataset
        vis.broadbandData.forEach(d => {
            // check if they're the same country
            if (d["Country Name"] == geoCountryName) {
                // iterate through the years (by default 1998-2021 since those are the years that have info)
                // console.log("UPDATED START", vis.startYear)
                // console.log("UPDATED END", vis.endYear)
                d3.range(vis.startYear, vis.endYear).forEach(function (i) {
                    // add the broadband value to the array if it's > 0
                    if (+d[i] > 0) {
                        broadbandArray.push(+d[i])
                    }
                });
            }
        })

        // console.log("list", listofavgs)
        // listofavgs.sort(function(a, b){return b - a})
        // console.log("sorted list", listofavgs)


        // calculate the average broadband by summing the values in the array and dividing by array length
        let broadbandAverage = d3.sum(broadbandArray) / broadbandArray.length
        vis.tempBroadbandAvg = broadbandAverage.toFixed(6)

        // assign colors based on broadband avg
        if (!broadbandAverage) {
            return ['#000000', "No data available"]
        } else if (broadbandAverage >= 15) {
            return [vis.colors[3], vis.tempBroadbandAvg]
        } else if (broadbandAverage >= 5) {
            return [vis.colors[2], vis.tempBroadbandAvg]
        } else if (broadbandAverage >= 0.5) {
            return [vis.colors[1], vis.tempBroadbandAvg]
        } else {
            return [vis.colors[0], vis.tempBroadbandAvg]
        }
    }

    wrangleData() {
        let vis = this;

        // console.log("broadband data", vis.broadbandData);

        // create a set that holds the countries in the broadband data set
        vis.countriesBroadbandSet = new Set()
        vis.broadbandData.forEach(d => {
            vis.countriesBroadbandSet.add(d["Country Name"])
        })
        // console.log("broadband set", vis.countriesBroadbandSet);

        // create dictionary that will hold data for each country
        vis.countryInfo = {};

        // create variable that will temporarily hold broadband average for a certain country
        // vis.tempBroadbandAvg;

        // iterate through the list of countries in the geoData
        vis.geoData.objects.countries.geometries.forEach(d => {
            let geoCountryName = d.properties.name

            // console.log("assign color", vis.assignColor(geoCountryName))

            // check if the country is in the broadband data set, and if so call assignColor()
            if (vis.countriesBroadbandSet.has(geoCountryName)) {
                vis.returnValues = vis.assignColor(geoCountryName);
                // console.log("returnvalueee", vis.returnValue)
                // console.log("tempbroadbandavg",  vis.tempBroadbandAvg)

                vis.countryInfo[d.properties.name] = {
                    name: d.properties.name,
                    color: vis.returnValues[0],
                    avg: vis.returnValues[1]
                }
                // vis.countryInfo[d.properties.name] = {
                //     name: d.properties.name,
                //     color: vis.assignColor(geoCountryName),
                //     avg: vis.tempBroadbandAvg
                // }

            // if country not in the set, assign the color black
            } else {
                // console.log("not in set ", geoCountryName);
                vis.countryInfo[d.properties.name] = {
                    name: d.properties.name,
                    color: '#000000',
                    avg: "No data available"
                }
            }
        })

        vis.udpateVis();
    }

    udpateVis() {
        let vis = this;

        vis.countries
            .attr("fill", d => vis.countryInfo[d.properties.name].color)


            .on('mouseover', function(event, d){
                d3.select(this)
                    .attr('stroke-width', '2px')
                    .attr('stroke', 'black')
                    .attr('fill', "yellow")

                vis.tooltip
                    .style("opacity", 1)
                    .style("left", event.pageX + 20 + "px")
                    .style("top", event.pageY + "px")
                    .html(`
                <div style="border: thin solid grey; border-radius: 5px; background: lightgrey; padding: 10px">
                     <h4>${vis.countryInfo[d.properties.name].name}<h4>   
                     <h5>Avg. Fixed Broadbrand Subscriptions (per 100 people): ${vis.countryInfo[d.properties.name].avg}</h5>
                     <h5>Selected Time Period: ${vis.startYear}-${vis.endYear}</h5>
                </div>`);
            })
            .on('mouseout', function(event, d){
                d3.select(this)
                    .attr('stroke-width', '0px')
                    .attr("fill", d => vis.countryInfo[d.properties.name].color)

                vis.tooltip
                    .style("opacity", 0)
                    .style("left", 0)
                    .style("top", 0)
                    .html(``);
            })

    }

    // what to do when the brushing changes the time period
    onSelectionChange(selectionStart, selectionEnd) {
        let vis = this;

        // console.log("start range", selectionStart)
        // console.log("end range", selectionEnd)
        //
        // console.log("start range YEAR", selectionStart.getFullYear())

        // set the start and years equal to the selected range
        vis.startYear = selectionStart.getFullYear();
        vis.endYear = selectionEnd.getFullYear();

            // .toString()

        // Filter original unfiltered data depending on selected time period (brush)

        // *** TO-DO ***
        // vis.filteredData = vis.broadbandData.filter(function(d) {
        //     return d.time >= selectionStart && d.time <= selectionEnd
        // })

        vis.wrangleData();
    }

}