/* * * * * * * * * * * * * *
*           MAIN           *
* * * * * * * * * * * * * */

// init global variables,  helper functions
let myMapBrushVis;

function updateAllVisualizations() {
    visEduc.wrangleData()
}

// load data using promises
let promises = [
    d3.csv("data/fixed-broadband-subscriptions.csv"), // broadbandData
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json") // geoData
];

Promise.all(promises)
    .then(function (data) {
        console.log("check out the data", data)

        data[0].forEach(function(d){
            console.log(d["Country Name"]);
        });


        initMainPage(data)
    })
    .catch(function (err) { console.log(err) });

// initMainPage
function initMainPage(allDataArray) {

    // log data
    console.log(allDataArray);

    myMapBrushVis = new MapBrushVis('mapBrushDiv', allDataArray[0], allDataArray[1])

}
