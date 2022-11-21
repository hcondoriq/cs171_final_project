/* * * * * * * * * * * * * *
*           MAIN           *
* * * * * * * * * * * * * */

// init global variables,  helper functions
let myMapVis;
let myTimelineBrushVis;

function updateAllVisualizations() {
    visEduc.wrangleData()
}

// load data using promises
let promises = [
    d3.csv("data/fixed-broadband-subscriptions.csv"), // broadbandData
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"), // geoData
    d3.json("data/world-broadband.json"), // worldBroadbandData
];

Promise.all(promises)
    .then(function (data) {
        console.log("check out the data", data);

        // convert the years in worldBroadbandData to dates
        let parseDate = d3.timeParse("%Y");
        data[2].years.forEach(function(d){
            d["Year"] = parseDate(d["Year"].toString());
        });

        initMainPage(data)
    })
    .catch(function (err) { console.log(err) });

// initMainPage
function initMainPage(allDataArray) {

    // log data
    console.log(allDataArray);

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
    myMapVis = new MapVis('mapDiv', allDataArray[0], allDataArray[1])
    myTimelineBrushVis = new TimelineBrushVis('timelineBrushDiv', allDataArray[2].years, eventHandler)

    // bind event handler
    eventHandler.bind("selectionChanged", function(event){
        let rangeStart = event.detail[0];
        // console.log("start range", rangeStart)
        let rangeEnd = event.detail[1];
        // console.log("end range", rangeEnd)
        myMapVis.onSelectionChange(rangeStart, rangeEnd);
    });

    // function brushed() {
    //
    //     // TO-DO: React to 'brushed' event
    //     // Get the extent of the current brush
    //     let selectionRange = d3.brushSelection(d3.select(".brush").node());
    //     console.log("selection range", selectionRange)
    //
    //     // Convert the extent into the corresponding domain values
    //     // let selectionDomain = selectionRange.map(timeline.x.invert);
    //     // myMapVis.x.domain(selectionDomain);
    //     //
    //     // myMapVis.wrangleData();
    //
    // }

}
