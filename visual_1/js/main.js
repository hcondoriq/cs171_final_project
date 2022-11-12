/* * * * * * * * * * * * * *
*           MAIN           *
* * * * * * * * * * * * * */

// init global variables,  helper functions
let myvisEduc;

function updateAllVisualizations() {
    visEduc.wrangleData()
}

// load data using promises
let promises = [
    d3.csv("data/educ_att_prim_aggreg.csv"),
];

Promise.all(promises)
    .then(function (data) {
        console.log("check out the data", data)
        initMainPage(data)
    })
    .catch(function (err) { console.log(err) });

// initMainPage
function initMainPage(allDataArray) {

    // log data
    console.log(allDataArray);

    // Matrix chart

    myvisEduc = new visEduc('visual_educ', allDataArray)


}
