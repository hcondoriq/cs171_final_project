/* * * * * * * * * * * * * *
*           MAIN           *
* * * * * * * * * * * * * */

// init global variables, switches, helper functions
let myVisOne;

function updateAllVisualizations(){
    // VisOne.wrangleData()
    // myMapVis.wrangleData()
}

// data = d3.csv("data/ICT_PriceBaskets.csv", row => {
    // row[2008] = +row[2008]
    // row[2009] = +row[2009]
    // row[2010] = +row[2010]
    // row[2011] = +row[2011]
    // row[2012] = +row[2012]
    // row[2013] = +row[2013]
    // row[2014] = +row[2014]
    // row[2015] = +row[2015]
    // row[2016] = +row[2016]
    // row[2017] = +row[2017]
    // row[2018] = +row[2018]
    // row[2019] = +row[2019]
    // row[2020] = +row[2020]
//     // row[2021] = +row[2021]
//     return row
// })
//     .then(data => {
//         console.log(data)
//         myVisOne = new VisOne('timeline', data)
//     })

// load data using promises
let promises = [
    d3.csv("data/ICT_PriceBasket1.csv", row => {
        // row.Wealth = +row.Wealth
        // row.Priorates = +row.Priorates
        return row
    }),
    d3.csv("data/ICT_PriceBasket1-5.csv", row => {
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
        return row}),
    d3.csv("data/ICT_PriceBasket2.csv", row => {
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
        return row}),
    d3.csv("data/ICT_PriceBasket2-5.csv", row => {
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
        return row}),
    d3.csv("data/ICT_PriceBasket3.csv", row => {
        return row
    }),
    d3.csv("data/ICT_PriceBasket3-5.csv", row => {
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
        return row})
];
// //
// // d3.csv("data/Data_Extract_From_World_Development_Indicators.csv", row).then( function(data) {
// //
// })
//
//
Promise.all(promises)
    .then( function(data){ initMainPage(data) })
    .catch( function (err){console.log(err)} );

// initMainPage
function initMainPage(dataArray) {

    // log data
    console.log("DOES THIS WORK?", dataArray);

    //call VisOne
    console.log("data set", dataArray[0], dataArray[1], dataArray[2])
    myVisOne = new VisOne('timeline', dataArray[0], dataArray[1], dataArray[2])

}
