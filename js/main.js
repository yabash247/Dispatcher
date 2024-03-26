
var driverIsAvailabe = false;


/* Search Settings Starts (should be gotten from database) */

//Get driver availability schedule 
var driverAvailability_A = [
    "March 6, 2024 18:00:00 // March 8, 2024 24:00:00 // Expired // 1",
    "March 9, 2024 18:00:00 // March 9, 2024 24:00:00 // Fufilled // 2",
    "March 5, 2024 18:00:00 // March 5, 2024 24:00:00 // Expired // 3",
    "March 25, 2024 04:00:00 // March 30, 2024 18:00:00 // Open // 4"
];

let driverAvailability =  [
    {
        "id": 1,
        "driver_id": 21,
        "status": "open",
        "origin": 77406,
        "pickup_period_start": "March 26, 2024 4:00:00",
        "pickup_period_end": "March 26, 2024 11:00:00",
        "destination": 77406,
        "del_period_start": "March 27, 2024 18:00:00",
        "del_period_end": "March 27, 2024 20:00:00"
    },
    {
        "id": 4,
        "driver_id": 21,
        "status": "open",
        "origin": 77406,
        "pickup_period_start": "April 1, 2024 4:00:00",
        "pickup_period_end": "April 1, 2024 11:00:00",
        "destination": 77406,
        "del_period_start": "April 1, 2024 18:00:00",
        "del_period_end": "April 1, 2024 20:00:00"
    }
];

const loadSearchSetting = {
    deadhead_near : 41,
    deadhead_far : 60,
    deadhead_vFar : 100,
    milliage_near : 91,
    milliage_far: 120,
    milliage_vfar: 180,
}

    

/* Search Settings Ends  */

interval = setInterval(() => {

    if (driverNeedsLoad() == true) {

        //Need to ensure page has fully and completely loaded before runing below
        $(function() {
            driverAvailability.forEach(item => {
                if (item.status === "open") {
                    //Get loadsResult 
                    let loadsResult = document.querySelectorAll('div.find-loads-result');
                    loadsResult.forEach(list =>{
                        //console.log(list);
                        let offerPay = list.childNodes[4].querySelectorAll('div.js-load-rate')[0].childNodes[1];
                        console.log(offerPay);
                    })
                }

            });
        });
    }

    /*
    if (driverNeedsLoad() == true) {
            
        
        
        //Need to ensure page has fully and completely loaded before runing below
        $(function() {
        
            driverAvailability.forEach(item => {
                item = item.split(" // ");
                if (item[2] === "Open") {
                    //console.log(item[3]);
                    //Get loadsResult 
                    let loadsResult = document.querySelectorAll('div.find-loads-result');
                    //console.log(loadsResult);
                    loadsResult.forEach(list =>{
                        //list.classList.add("selected");
                        var milliage = list.childNodes[3].querySelectorAll('div.js-load-distance')[0].childNodes[1].innerText;
                        milliage = parseInt(String(milliage).replace(' mi', ''));
                        //console.log(milliage);
                        let mill_Anlayized = millage_Analyzer(milliage);
                        //console.log("Milliage is: "+mill_Anlayized);
                        
                        var deadhead_PU = list.childNodes[2].querySelectorAll('div.location-deadhead-group')[0].childNodes[2].childNodes[2].innerText;
                        deadhead_PU = parseInt(String(deadhead_PU).replace(' mi', ''));
                        //console.log(deadhead_PU);
                        let DH_PU_Anlayized = deadhead_Analyzer(deadhead_PU);
                        //console.log("Pickup deahhead is: "+DH_PU_Anlayized);

                        var deadhead_Del = list.childNodes[2].querySelectorAll('div.location-deadhead-group')[1].childNodes[2].childNodes[2].innerText;
                        
                        deadhead_Del = parseInt(String(deadhead_Del).replace(' mi', ''));
                        let DH_DEL_Anlayized = deadhead_Analyzer(deadhead_Del);
                        //console.log("Delivery deahhead is: "+DH_DEL_Anlayized);

                        
                        let priceBox = list.childNodes[4].querySelectorAll('div.js-load-rate');
                        //If book now option exists
                        if (priceBox.length > 0) {
                            let price = priceBox[0].childNodes[1].childNodes[0].innerText;
                            price = parseInt(String(price).replace('.00 USD', ''));
                            //console.log(price);
                        }
                        

                        if (DH_PU_Anlayized === "close" & mill_Anlayized === "close" & DH_DEL_Anlayized === "close") {

                            //check if loading or offloading time is less than 2hrs each 
                            //Check if pickup and drop off time works
                                if (priceBox.length > 0) {
                                    
                                    if (price => 250) {
                                        //deadhead_PU.click();
                                        console.log("******************Pickup and delivery millage is close, system should bid on this ");
                                    }
                                }else{
                                    console.log("you need to call and bid for this ASAP.");
                                }
                            
                        }
                        //list.classList.remove("selected"); 
                    })
                    
                }
            });

            refreshSearch();
           
        });

    }*/

}, 0.4 * 60000);


// fucntion Checks if driver needs load(s)
function driverNeedsLoad() {
    if (driverIsAvailabe == false) {

        //get current time 
        let d = new Date();
        let currenTime = d.getTime();

        driverAvailability.forEach(item => {
            if (item.status === "open") {
                let endTime = Date.parse(item.pickup_period_start);
                if (endTime >= currenTime) {
                    //console.log(item.id);
                    driverIsAvailabe = true;
                }
            }
        });

    }return driverIsAvailabe;
}




//Need to group all driver availability that is open,
//group 1 = put all availability that falls within 500ft of PU and delivery zipcode of 
//availabilty with the closest stop time get location.
//group 2 = exclude all avaialibility in group 1, then put all availability that falls within 500ft of PU and delivery zipcode of 
//availabilty with the closest stop time get location.
//Keep repeating step 2, untill all driverAvailability data have been put in a group.
// return all group in an array let searchGroups = [group1 = "id1 - id2 - id"7, group1 = "id3 - id10 - id31"].
function groupLoadSearch() {
    //return searchGroups;
}


//get search details from database per availability id
// below is availability table sample:
//const driverAvailabilitydata = [id=1, orign=77406, dest=77406, loadQuality='good', pickup='', delivery='25', ];
// return driverAvailabilitydata;
function getSearchDetails(id) {
    
}

function setSearchDetails(id) {

}


function loadAnalyzer(){

}

function refreshSearch() {
     //Click on search button to refresh search results.
     const clickSearchBtn = document.querySelectorAll('button#btn-find-loads-search-submit')[0];
     //console.log(clickSearchBtn);
     clickSearchBtn.click();
}


function deadhead_Analyzer(deadhead){
    var result = "vfar"
    if (loadSearchSetting.deadhead_near > deadhead ) {
         result = "close";
    }else if (loadSearchSetting.deadhead_near <= deadhead &  deadhead < loadSearchSetting.deadhead_far) {
         result = "mid";
    } else if (loadSearchSetting.deadhead_far <= deadhead &  deadhead <= loadSearchSetting.deadhead_vFar) {
         result = "far";
    } 
    
    return (result);
}

function millage_Analyzer(milliage){
    var result = "vfar"
    if (loadSearchSetting.milliage_near > milliage ) {
         result = "close";
    }else if (loadSearchSetting.milliage_near < milliage &  milliage < loadSearchSetting.milliage_far) {
         result = "mid";
    } else if (loadSearchSetting.milliage_far < milliage &  milliage < loadSearchSetting.milliage_vfar) {
         result = "far";
    } 
    //console.log("drop off is: "+result);
    return (result);
}

function bid4me(params) {
    
}

/*

//Checks if driver needs load(s)
if (driverNeedsLoad(driverAvailability) == true) {
    console.log(driverNeedsLoad(driverAvailability));
    let searchGroups = groupLoadSearch(driverAvailability);
    searchGroups.forEach(item => {

        let availabilitydata = getSearchDetails(id);

        if (setSearchDetails(id)) {

            //Click on search button to refresh search results.
            refreshSearch();

        }

        //open loadboard website in new search

        //if website open in tab, 
        // set search criterias 
        //search radius = 500 miles
        //click on search Button


        interval = setInterval(() => {

            //Get loadsResult 
            const loadsResult = document.querySelectorAll('div.find-loads-result');
            
            //Get deadhead mill
            var milliage = item.childNodes[3].querySelectorAll('div.js-load-distance')[0].childNodes[1].innerText;
            milliage = parseInt(String(milliage).replace(' mi', ''));

    
           if (milliage < (availabilitydata.maxMillage)) {

                console.log(milliage);

           }
            

        }, 0.5 * 60000);

    });

}

*/