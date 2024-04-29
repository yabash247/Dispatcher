
let driverIsAvailabe = false;

let record = []


/* Search Settings Starts (should be gotten from database) */

//Get driver availability schedule 
let driverAvailability = [
    {
        "id": 1,
        "driver_id": 21,
        "status": "expired",
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
        "status": "expired",
        "origin": 77406,
        "pickup_period_start": "April 1, 2024 4:00:00",
        "pickup_period_end": "April 1, 2024 11:00:00",
        "destination": 77406,
        "del_period_start": "April 1, 2024 18:00:00",
        "del_period_end": "April 1, 2024 20:00:00"
    },
    {
        "id": 41,
        "driver_id": 21,
        "status": "open",
        "origin": 77406,
        "pickup_period_start": "May 06, 2024 1:00:00",
        "pickup_period_end": "May 07, 2024 2:59:00",
        "destination": 77406,
        "del_period_start": "May 11, 2024 18:00:00",
        "del_period_end": "May 21, 2024 20:00:00"
    }
];

const loadSearchSetting = {
    deadhead_near: 41,
    deadhead_far: 60,
    deadhead_vFar: 100,
    milliage_near: 91,
    milliage_far: 120,
    milliage_vfar: 180,
}


/* Search Settings Ends  */
interval = setInterval(() => {


    //console.log('Dispatcher Started..... ');
    driverAvailability.forEach(schedule => {
        //console.log(schedule);

        if (driverNeedsLoad(schedule) == true) {
            console.log('Driver needs load');

            //Need to ensure page has fully and completely loaded before runing below
            $(function () {

                let loadsResult = document.querySelectorAll('div.find-loads-result');
                //console.log(loadsResult);
                if (loadsResult.length > 0) {

                    loadsResult.forEach(list => {

                        let loadId = parseInt(String(list.childNodes[0].innerText));
                        //console.log(loadId);
                        let loadPickupData = loadLocation(list.childNodes[2].childNodes[0]);
                        //console.log(loadPickupData);
                        let loadDeliveryData = loadLocation(list.childNodes[2].childNodes[2]);
                        //console.log(loadDeliveryData);
                        let loadReqData = loadRequirements(list.childNodes[3]);
                        //console.log(loadReqData);
                        let loadPayment = loadProposedPay(list.childNodes[4].childNodes[0]);
                        //console.log(loadPayment);

                        if (scheduleEval(schedule, loadPickupData) == true) {

                        }

                        // let listdata = listingData(list);
                        let exists = record.some(info => info.loadId === loadId);
                        if (!exists) {

                            const information = {
                                loadId: loadId,
                                loadPickupData: loadPickupData,
                                loadDeliveryData: loadDeliveryData,
                                loadReqData : loadReqData,
                                loadPayment : loadPayment,
                            }

                            record.push(information);
                            //console.log(record);

                        }

                    });
                } else {
                    console.log('No load listing seen');
                }

            });
        } else {
            //This function needs to run is there is no open availability, current it's runing for all posting that isn't available. 
            //console.log('Driver is not available');
        };

    });
    //refreshSearch();

}, 0.8 * 60000);

function driverNeedsLoad(schedule) {

    //get current time 
    let d = new Date();
    let currenTime = d.getTime();

    if (schedule.status === "open") {
        let endTime = Date.parse(schedule.pickup_period_end);
        if (endTime >= currenTime) {
            driverIsAvailabe = true;
        } else {
            console.log('No Open avalability setting for driver');
        }
    }

    return driverIsAvailabe;
}



function loadLocation(params) {
    //console.log(params);
    let data = '';
    let ori_millage = '';



    let ori_loc_all = params.childNodes[0];
    //console.log(ori_loc_all);


    let ori_loc = (ori_loc_all.childNodes[1].childNodes[0].innerText).split(",");
    //console.log(ori_loc);


    if (ori_loc_all.childNodes[2]) {
        ori_millage = parseInt(String(ori_loc_all.childNodes[2].childNodes[2].innerText).replace(' mi', ''));
        //console.log(ori_millage);
    }



    let ori_city = ori_loc[0];
    //console.log(ori_city);

    let ori_state = ori_loc[1];
    //console.log(ori_state);

    let ori_time = params.childNodes[1];
    //console.log(ori_time);

    let pickup_date = ori_time.childNodes[1].innerText;

    //let pickup_time = ori_time.childNodes[2].innerText; 
    let pickupTime = ori_time.childNodes[1].innerText.concat(' ').concat(ori_time.childNodes[2].innerText);

    data = {
        "city": ori_city,
        "state": ori_state,
        "millage": ori_millage,
        "pickupTime": pickupTime
    };

    return (data);

}


function loadRequirements(params) {

    let data = '';

    //console.log(params);

    let drop = params.childNodes[0];
    let millage = parseInt(String(drop.childNodes[0].childNodes[1].innerText).replace(' mi', ''));
    let stops = (drop.childNodes[1].childNodes[0].innerText).split(",");
    let numberOfpickups = parseInt(String(stops[0]).replace(' pickup', ''));
    let numberOfdrops = parseInt(String(stops[0]).replace(' drop', ''));

    let weight = parseInt(String(params.childNodes[1].childNodes[0].childNodes[1].innerText).replace(' lbs', ''));

    let equipment = params.childNodes[2];

    data = {
        "millage": millage,
        "numberOfpickups": numberOfpickups,
        "numberOfdrops": numberOfdrops,
        "numberOfdrops": numberOfdrops,
        "loadWeight": weight,
    };

    return data;


}


function loadProposedPay(params) {

    let pay = 'CONTACT CHR';
    
   
    if (params.childNodes[1].childNodes[1] !== undefined) {
        pay = params.childNodes[1].childNodes[1];
        pay = parseInt(String(params.childNodes[1].childNodes[1].innerText).replace(' USD', ''));
    }
    
    //console.log(pay);
    return (pay)
}

function listingData(list) {

    console.log('.... Started processing each listing data ........ ');

    let data = '';
    let ori_city = '';
    ori_state = '';
    ori_millage = '';


    // Load Requirements Time Info
    let loadRequirements = list.childNodes[3];
    //console.log(loadRequirements);

    // Load Pay and Book Info
    let loadPay = list.childNodes[4].childNodes[0];
    //console.log(loadPay);


    //Load Dates and Times Information
    let loadTimes = list.childNodes[2].querySelectorAll('div.time.help-text');
    //console.log(loadTimes);
    if (loadTimes.length > 0) {

    }


    data = {
        "ori_city": ori_city,
        "ori_state": ori_state,
        "ori_millage": ori_millage
    };


    console.log(data);

    console.log('........ Stopped processing each listing data ........ ');


    return data;


}

function refreshSearch() {
    //Click on search button to refresh search results.
    const clickSearchBtn = document.querySelectorAll('button#btn-find-loads-search-submit')[0];
    if (clickSearchBtn) {
        if (clickSearchBtn.click()) {

        } else {
            console.log('Page refresh unsuccesful');
        }
    } else {
        console.log('Could not find the search button');
    }

}

function refreshSearchar() {
    //Click on search button to refresh search results.
    const clickSearchBtn = document.querySelectorAll('button#btn-find-loads-search-submit')[0];
    //console.log(clickSearchBtn);
    clickSearchBtn.click();
}


function deadhead_Analyzer(deadhead) {
    var result = "vfar"
    if (loadSearchSetting.deadhead_near > deadhead) {
        result = "close";
    } else if (loadSearchSetting.deadhead_near <= deadhead & deadhead < loadSearchSetting.deadhead_far) {
        result = "mid";
    } else if (loadSearchSetting.deadhead_far <= deadhead & deadhead <= loadSearchSetting.deadhead_vFar) {
        result = "far";
    }

    return (result);
}

function millage_Analyzer(list) {

    let milliage = list.childNodes[3].querySelectorAll('div.js-load-distance')[0].childNodes[1].innerText;
    milliage = parseInt(String(milliage).replace(' mi', ''));
    //console.log(milliage);

    var result = "vfar"
    if (loadSearchSetting.milliage_near > milliage) {
        result = "close";
    } else if (loadSearchSetting.milliage_near < milliage & milliage < loadSearchSetting.milliage_far) {
        result = "mid";
    } else if (loadSearchSetting.milliage_far < milliage & milliage < loadSearchSetting.milliage_vfar) {
        result = "far";
    }
    //console.log("drop off which is "+ milliage + "miles, is : "+result);
    return (result);
}

function detentionTime_Analyzer(list) {

}

function bid4me(params) {

}

function scheduleEval(schedule, loadPickupData) {


    let d = new Date();
    let currenTime = d.getTime();

    let schStarTime = Date.parse(schedule.pickup_period_start);
    let pickupEndTime = Date.parse(schedule.pickup_period_end);

    let startTime = Date.parse(loadPickupData.pickupTime);

    if (pickupEndTime >= startTime & startTime >= schStarTime) {
        console.log(loadPickupData);
        console.log(schStarTime);
        console.log(startTime);
        console.log(pickupEndTime);
    } else {
        console.log('Pickup Time is off');
    }

    //console.log(startTimer);
    //console.log(startTime);
    //console.log(endTime);
    //console.log('-----------------------');

    /*
    if (endTime >= currenTime & endTime >= currenTime ) {
        driverIsAvailabe = true;
    }else{
        console.log('No Open avalability setting for driver');
    }
    */

    return false;
} 



chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {

    if(request.action === "download"){
      downloadJSON(record);
    }
    
  });





  function downloadJSON(data) {
    // Convert data array to JSON string
    const jsonData = JSON.stringify(data);
  
    // Create a blob with the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });
  
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
  
    // Set the file name for the download
    link.download = 'load_list.json';
  
    // Append the anchor element to the document body
    document.body.appendChild(link);
  
    // Simulate a click on the anchor element to trigger the download
    link.click();
  
    // Remove the anchor element from the document body
    document.body.removeChild(link);
  }