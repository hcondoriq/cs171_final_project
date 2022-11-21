/* * * * * * * * * * * * * *
*           MAIN           *
* * * * * * * * * * * * * */

var main = d3.select("main");
var scrolly = main.select("#scrolly");
var figure = scrolly.select("figure");
var article = scrolly.select("article");
var step = article.selectAll(".step");

// ensure refresh goes to top of page
window.onbeforeunload = () => window.scrollTo(0, 0);

// initialize the scrollama
var scroller = scrollama();
// 
// init global variables,  helper functions
let myvisEduc;



// load data using promises
let promises = [
    d3.csv("data/educ_att_prim_aggreg.csv"),
    d3.csv("data/educ_att_sec_aggreg.csv"),
];
let data_glob
Promise.all(promises)
    .then(function (data) {
        console.log("check out the data", data[1])
        data_glob = data
        initMainPage(data)

    })
    .catch(function (err) { console.log(err) });

// initMainPage
function initMainPage(allDataArray) {

    myvisEduc = new visEduc('visual_educ', allDataArray[0], allDataArray[1])
    init();
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




