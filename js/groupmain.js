/* * * * * * * * * * * * * *
*           MAIN           *
* * * * * * * * * * * * * */

// init global variables, switches, helper functions
let myVisOne;
// let myMapBrushVis;
let main = d3.select("main");
let scrolly = main.select("#scrolly");
let figure = scrolly.select("figure");
let article = scrolly.select("article");
let step = article.selectAll(".step");
let data_glob

// ensure refresh goes to top of page
window.onbeforeunload = () => window.scrollTo(0, 0);

// initialize the scrollama
// var scroller = scrollama();
//
// init global variables,  helper functions
let myvisEduc;

function updateAllVisualizations(){
    visEduc.wrangleData()

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
    // d3.csv("data/ICT_PriceBasket1.csv", (row) => {
    //     // console.log("what's row of 2008", row[2008])
    //
    //     if(isNaN(row[2008]) == true) {
    //         row[2008] = 0
    //     }
    //     if(isNaN(row[2009]) == true) {
    //         row[2009] = 0
    //     }
    //     if(isNaN(row[2010]) == true) {
    //         row[2010] = 0
    //     }
    //     if(isNaN(row[2011]) == true) {
    //         row[2011] = 0
    //     }
    //     if(isNaN(row[2012]) == true) {
    //         row[2012] = 0
    //     }
    //     if(isNaN(row[2013]) == true) {
    //         row[2013] = 0
    //     }
    //     if(isNaN(row[2014]) == true) {
    //         row[2014] = 0
    //     }
    //     if(isNaN(row[2015]) == true) {
    //         row[2015] = 0
    //     }
    //     if(isNaN(row[2016]) == true) {
    //         row[2016] = 0
    //     }
    //     if(isNaN(row[2017]) == true) {
    //         row[2017] = 0
    //     }
    //     if(isNaN(row[2018]) == true) {
    //         row[2018] = 0
    //     }
    //     if(isNaN(row[2019]) == true) {
    //         row[2019] = 0
    //     }
    //     if(isNaN(row[2020]) == true) {
    //         row[2020] = 0
    //     }
    //     if(isNaN(row[2021]) == true) {
    //         row[2021] = 0
    //     }
    //
    //     row[2008] = +row[2008]
    //     row[2009] = +row[2009]
    //     row[2010] = +row[2010]
    //     row[2011] = +row[2011]
    //     row[2012] = +row[2012]
    //     row[2013] = +row[2013]
    //     row[2014] = +row[2014]
    //     row[2015] = +row[2015]
    //     row[2016] = +row[2016]
    //     row[2017] = +row[2017]
    //     row[2018] = +row[2018]
    //     row[2019] = +row[2019]
    //     row[2020] = +row[2020]
    //     row[2021] = +row[2021]
    //     return row
    //
    //     // let displayData =[]
    //     //
    //     // let pushData = {
    //     //     country: row.Economy,
    //     //     years: {"2008": row[2008],
    //     //         "2009": row[2009],
    //     //         "2010": row[2010],
    //     //         "2011": row[2011],
    //     //         "2012": row[2012],
    //     //         "2013": row[2013],
    //     //         "2014": row[2014],
    //     //         "2015": row[2015],
    //     //         "2016": row[2016],
    //     //         "2017": row[2017],
    //     //         "2018": row[2018],
    //     //         "2019": row[2019],
    //     //         "2020": row[2020],
    //     //         "2021": row[2021],
    //     //         },
    //     //         income_class: d.Income_2021,
    //     //         measure: d.basket_current,
    //     //         region: d.ITURegion
    //     //     }
    //     //     displayData.push(pushData)
    // }),
    // d3.csv("data/ICT_PriceBaskets1-5.csv", row => {
    //     row[2008] = +row[2008]
    //     row[2009] = +row[2009]
    //     row[2010] = +row[2010]
    //     row[2011] = +row[2011]
    //     row[2012] = +row[2012]
    //     row[2013] = +row[2013]
    //     row[2014] = +row[2014]
    //     row[2015] = +row[2015]
    //     row[2016] = +row[2016]
    //     row[2017] = +row[2017]
    //     row[2018] = +row[2018]
    //     row[2019] = +row[2019]
    //     row[2020] = +row[2020]
    //     row[2021] = +row[2021]
    //     return row}),
    // d3.csv("data/ICT_PriceBasket2.csv", row => {
    //     row[2008] = +row[2008]
    //     row[2009] = +row[2009]
    //     row[2010] = +row[2010]
    //     row[2011] = +row[2011]
    //     row[2012] = +row[2012]
    //     row[2013] = +row[2013]
    //     row[2014] = +row[2014]
    //     row[2015] = +row[2015]
    //     row[2016] = +row[2016]
    //     row[2017] = +row[2017]
    //     row[2018] = +row[2018]
    //     row[2019] = +row[2019]
    //     row[2020] = +row[2020]
    //     row[2021] = +row[2021]
    //     return row}),
    // d3.csv("data/ICT_PriceBasket2-5.csv", row => {
    //     row[2008] = +row[2008]
    //     row[2009] = +row[2009]
    //     row[2010] = +row[2010]
    //     row[2011] = +row[2011]
    //     row[2012] = +row[2012]
    //     row[2013] = +row[2013]
    //     row[2014] = +row[2014]
    //     row[2015] = +row[2015]
    //     row[2016] = +row[2016]
    //     row[2017] = +row[2017]
    //     row[2018] = +row[2018]
    //     row[2019] = +row[2019]
    //     row[2020] = +row[2020]
    //     row[2021] = +row[2021]
    //     return row}),
    // d3.csv("data/ICT_PriceBasket3.csv", row => {
    //     row[2008] = +row[2008]
    //     row[2009] = +row[2009]
    //     row[2010] = +row[2010]
    //     row[2011] = +row[2011]
    //     row[2012] = +row[2012]
    //     row[2013] = +row[2013]
    //     row[2014] = +row[2014]
    //     row[2015] = +row[2015]
    //     row[2016] = +row[2016]
    //     row[2017] = +row[2017]
    //     row[2018] = +row[2018]
    //     row[2019] = +row[2019]
    //     row[2020] = +row[2020]
    //     row[2021] = +row[2021]
    // }),
    // d3.csv("data/ICT_PriceBaskets3-5.csv", row => {
    //     row[2008] = +row[2008]
    //     row[2009] = +row[2009]
    //     row[2010] = +row[2010]
    //     row[2011] = +row[2011]
    //     row[2012] = +row[2012]
    //     row[2013] = +row[2013]
    //     row[2014] = +row[2014]
    //     row[2015] = +row[2015]
    //     row[2016] = +row[2016]
    //     row[2017] = +row[2017]
    //     row[2018] = +row[2018]
    //     row[2019] = +row[2019]
    //     row[2020] = +row[2020]
    //     row[2021] = +row[2021]
    //     return row}),
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
    d3.csv("data/fixed-broadband-subscriptions.csv"), // broadbandData
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"), // geoData
    d3.csv("data/educ_att_prim_aggreg.csv"),
    d3.csv("data/educ_att_sec_aggreg.csv"),
];

Promise.all(promises)
    .then( function(data){ initMainPage(data) })
    .catch( function (err){console.log(err)} );

// initMainPage
function initMainPage(dataArray) {

    // log data
    console.log("DOES THIS WORK?", dataArray);

    //call VisOne
    // console.log("data set", dataArray[0], dataArray[1], dataArray[2])
    myVisOne = new VisOne('timeline', dataArray[0], dataArray[1])
    // myMapBrushVis = new MapBrushVis('mapBrushDiv', dataArray[2], dataArray[3])
    myvisEduc = new visEduc('visual_educ', dataArray[4], dataArray[5])



}
