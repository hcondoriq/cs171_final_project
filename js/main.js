/* * * * * * * * * * * * * *
*           MAIN           *
* * * * * * * * * * * * * */

let main = d3.select("main");
let scrolly = main.select("#scrolly");
let figure = scrolly.select("figure");
let article = scrolly.select("article");
let step = article.selectAll(".step");

// ensure refresh goes to top of page
window.onbeforeunload = () => window.scrollTo(0, 0);

// initialize the scrollama
let scroller = scrollama();
// 
// init global variables,  helper functions

let myMapVis;
let myTimelineBrushVis;

let myvisEduc;

let myLineVis;


// load data using promises
let promises = [
    d3.csv("data/educ_att_prim_aggreg.csv"),
    d3.csv("data/educ_att_sec_aggreg.csv"),
    d3.csv("data/fixed-broadband-subscriptions.csv"), // broadbandData
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"), // geoData
    d3.json("data/world-broadband.json"), // worldBroadbandData,
    d3.csv("data/ICTMedianBaskets.csv", row => {
        // console.log("median baskets", row)
        if(isNaN(row[2008]) == true) {
            row[2008] = 0
        }
        if(isNaN(row[2009]) == true) {
            row[2009] = 0
        }
        if(isNaN(row[2010]) == true) {
            row[2010] = 0
        }
        if(isNaN(row[2011]) == true) {
            row[2011] = 0
        }
        if(isNaN(row[2012]) == true) {
            row[2012] = 0
        }
        if(isNaN(row[2013]) == true) {
            row[2013] = 0
        }
        if(isNaN(row[2014]) == true) {
            row[2014] = 0
        }
        if(isNaN(row[2015]) == true) {
            row[2015] = 0
        }
        if(isNaN(row[2016]) == true) {
            row[2016] = 0
        }
        if(isNaN(row[2017]) == true) {
            row[2017] = 0
        }
        if(isNaN(row[2018]) == true) {
            row[2018] = 0
        }
        if(isNaN(row[2019]) == true) {
            row[2019] = 0
        }
        if(isNaN(row[2020]) == true) {
            row[2020] = 0
        }
        if(isNaN(row[2021]) == true) {
            row[2021] = 0
        }

        row[2008] = +row[2008]
        row[2009] = +row[2009]
        row[2010] = +row[2010]
        row[2011] = +row[2011]
        row[2012] = +row[2012]
        row[2013] = +row[2013]
        row[2014] = +row[2014]
        row[2015] = +row[2015]
        row[2016] = +row[2016]
        row[2017] = +row[2017]
        row[2018] = +row[2018]
        row[2019] = +row[2019]
        row[2020] = +row[2020]
        row[2021] = +row[2021]

        row[0] = +row[0]
        row[1] = +row[1]
        row[2] = +row[2]
        row[3] = +row[3]
        row[4] = +row[4]
        row[5] = +row[5]
        row[6] = +row[6]
        row[7] = +row[7]
        row[8] = +row[8]
        row[9] = +row[9]
        row[10] = +row[10]
        row[11] = +row[11]
        row[12] = +row[12]


        return row
    }),
    d3.csv("data/InternetUse_Region.csv", row => {
        row[1990] = +row[1990]
        row[1991] = +row[1991]
        row[1992] = +row[1992]
        row[1993] = +row[1993]
        row[1994] = +row[1994]
        row[1995] = +row[1995]
        row[1996] = +row[1996]
        row[1997] = +row[1997]
        row[1998] = +row[1998]
        row[1999] = +row[1999]
        row[2000] = +row[2000]
        row[2001] = +row[2001]
        row[2002] = +row[2002]
        row[2003] = +row[2003]
        row[2004] = +row[2004]
        row[2005] = +row[2005]
        row[2006] = +row[2006]
        row[2007] = +row[2007]
        row[2008] = +row[2008]
        row[2009] = +row[2009]
        row[2010] = +row[2010]
        row[2011] = +row[2011]
        row[2012] = +row[2012]
        row[2013] = +row[2013]
        row[2014] = +row[2014]
        row[2015] = +row[2015]
        row[2016] = +row[2016]
        row[2017] = +row[2017]
        row[2018] = +row[2018]
        row[2019] = +row[2019]
        row[2020] = +row[2020]
        row[2021] = +row[2021]
        return row
    }),
    d3.json("data/literacy.json"),
    d3.json("data/patents.json"),
    d3.csv("data/YoungPeople_HIV_171.csv", row => {
        return row
    })
];
let data_glob
Promise.all(promises)
    .then(function (data) {
        console.log("check out the data", data);

        // convert the years in worldBroadbandData to dates
        let parseDate = d3.timeParse("%Y");
        data[4].years.forEach(function(d){
            d["Year"] = parseDate(d["Year"].toString());
        });

        data[7].years.forEach(function(d){
            d["Year"] = parseDate(d["Year"].toString());
        });

        data[8].years.forEach(function(d){
            d["Year"] = parseDate(d["Year"].toString());
        });


        console.log("check out the data", data[1])
        console.log("mayowa's data", data[5])
        data_glob = data

        initMainPage(data)

    })
    .catch(function (err) { console.log(err) });

// initMainPage
function initMainPage(allDataArray) {

    myvisEduc = new visEduc('visual_educ', allDataArray[0], allDataArray[1])
    init();

    // create event handler
    let eventHandler = {
        bind: (eventName, handler) => {
            document.body.addEventListener(eventName, handler);
        },
        trigger: (eventName, extraParameters) => {
            document.body.dispatchEvent(new CustomEvent(eventName, {
                detail: extraParameters
            }));
        }
    }

    // create instances
    myMapVis = new MapVis('mapDiv', allDataArray[2], allDataArray[3])
    myTimelineBrushVis = new TimelineBrushVis('timelineBrushDiv', allDataArray[4].years, eventHandler)
    myVisOne = new VisOne('timeline', allDataArray[5], allDataArray[6])
    myLineVis = new LineVis('linechart', allDataArray[7].years, allDataArray[8].years, allDataArray[4].years)

    // bind event handler
    eventHandler.bind("selectionChanged", function(event){
        let rangeStart = event.detail[0];
        // console.log("start range", rangeStart)
        let rangeEnd = event.detail[1];
        // console.log("end range", rangeEnd)
        myMapVis.onSelectionChange(rangeStart, rangeEnd);
    });
    // kick things off

}



// define event dict for each step in scrolly
const stepEvents = {
    down: {
        0: () => {

        },
        1: () => {
            // myvisEduc = new visEduc('visual_educ', data_glob[0], data_glob[1])

        },
        2: () => {
            // myvisEduc = new visEduc('visual_educ', data_glob[0], data_glob[1])
            d3.select("#visual_educ")
                .style("visibility", "visible")

        },
        3: () => {
            // myvisEduc = new visEduc('visual_educ', data_glob[0], data_glob[1])
            d3.select("#visual_educ")
                .style("visibility", "visible")
                .transition()
                .duration(300)


        },
        4: () => {
            // myvisEduc = new visEduc('visual_educ', data_glob[0], data_glob[1])
            d3.select("#visual_educ")
                .style("visibility", "hidden")
                .transition()
                .duration(1000)

        }
    }
}


// generic window resize listener event
function handleResize() {
    // 1. update height of step elements
    var stepH = Math.floor(window.innerHeight * 0.75);
    step.style("height", stepH + "px");

    var figureHeight = window.innerHeight / 2;
    var figureMarginTop = (window.innerHeight - figureHeight) / 2;

    figure
        .style("height", figureHeight + "px")
        .style("top", figureMarginTop + "px");

    // 3. tell scrollama to update new element dimensions
    scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
    console.log(response);
    // response = { element, direction, index }

    // add color to current step only
    step.classed("is-active", function (d, i) {
        return i === response.index;
    });
    stepEvents["down"][response.index]();
    // update graphic based on step
    // figure.select("div").text("data" + response.index + 1);
}

function init() {

    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();

    // 2. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller
        .setup({
            step: "#scrolly article .step",
            offset: 0.5,
            debug: false
        })
        .onStepEnter(handleStepEnter);
}


const width = 900
const height = 600
const svg = d3.select("map_vis").append("svg")
    .attr("width", width)
    .attr("height", height)
const projection = d3.geoMercator()
    .scale(140)
    .translate([width / 2, height / 1.4]);
const path = d3.geoPath(projection)

const g = svg.append("g")
d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
    .then(data => {
        const countries = topojson.feature(data, data.objects.countries)
        g.selectAll("path").data(countries.features)
            .enter()
            .append("path")
            .attr("class", "country")
            .attr('d', path);

    }

    )




