



const data = [];

var searchCriteria = {
  "pickup_location": 77083,
  "delivery_location": 77072
};

var availability = {
  // PU date and time (range) /  Del date and time (range) - daily start and end time if d/f from settings
};

var loadType = 'great';



var paySettings = {
  "closePu": 300,
  "midWayPu": 350,
  "farPu": 400,
  "oneLoad": 650,
  "twoLoads": 300,

}

var timeSettings = {
  "start" : "6pm",
  "end" : "7pm",
  "timeZone": "CT"
}

var detentionTime = {
  "Aucher_houston_1" : 5,
  "Niagra_perland_1" : 3

}


interval = setInterval(() => {

//Get search criteria on button click in popup.html 
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {

    if(request.action === "download"){
      downloadJSON(data);
    }
    
  });



//on start looking for loads buttion clicked,
  //run function bookloads
  // change start booking loads to stop booking loads
  bookLoads();

// On stop book loads clicked, 
  //stop running function bookloads
  //
//}


function bookLoads() {
    
}

    //Click on search button to refresh search results.
    const clickSearchBtn = document.querySelectorAll('button#btn-find-loads-search-submit')[0];
    //clickSearchBtn.click();

    //Get loadsResult 
    const loadsResult = document.querySelectorAll('div.find-loads-result');

    //For each loadResults 
    loadsResult.forEach(item => {
      
        var milliage = item.childNodes[3].querySelectorAll('div.js-load-distance')[0].childNodes[1].innerText;
        milliage = parseInt(String(milliage).replace(' mi', ''));
        

        //5hours Shift
        if (milliage < 70) {
          //pickupProximity(deadhead_PU);
          
            //Get deadhead millage 
            var deadhead_PU = item.childNodes[2].querySelectorAll('span.location-deadhead-distance')[0].childNodes[2].innerText;
            deadhead_PU = parseInt(String(deadhead_PU).replace(' mi', ''));

            var deadhead_Del = item.childNodes[2].querySelectorAll('span.location-deadhead-distance')[1].childNodes[2].innerText;
            deadhead_Del = parseInt(String(deadhead_Del).replace(' mi', ''));

           

            //close pickup location
            if (deadhead_PU<25) {
              
            }

           
          //console.log(item.childNodes[3]);
        }

        var deadhead_Del = item.childNodes[2].querySelectorAll('span.location-deadhead-distance')[1];

        /*
            CHECK IS MILLAGE IS LESS THAN INPUTED 
        */
       

    });

}, 1*60000);




//check if pickup location is close 
function pickupProximity(deadhead_PU) {

  var result = 'invalid';

  if (deadhead_PU <= mileSettings['close']) {
      result = 'closePU';
  }else if (deadhead_PU <= mileSettings['far']) {
    result = 'farPU';
  }else if (deadhead_PU <= mileSettings['veryFar']) {
    result = 'veryFarPU';
  }

  return result;

}


//check if delivery location is close 
function deliveryProximity(deadhead_Del) {

  var result = 'invalid';

  if (deadhead_Del <= mileSettings['close']) {
      result = 'closeDel';
  }else if (deadhead_Del <= mileSettings['far']) {
    result = 'farDel';
  }else if (deadhead_Del <= mileSettings['veryFar']) {
    result = 'veryFarDel';
  }

  return result;

}




interval = setInterval(() => {

  if (driverNeedsLoad() == true) {

      //Need to ensure page has fully and completely loaded before runing below
      $(function() {
          driverAvailability.forEach(item => {
              if (item.status === "open") {
                  //Get loadsResult 
                  let loadsResult = document.querySelectorAll('div.find-loads-result');
                  loadsResult.forEach(list =>{
                      console.log(list.click());
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

        
    
    //Orign and Destinaion Information
    let deadheadGroup = list.childNodes[2].querySelectorAll('div.location-deadhead-group');
    console.log(deadheadGroup);
    if(deadheadGroup.length > 0){
        //Pickup location information.
        let deadheadGroup_Pickup = list.childNodes[2].querySelectorAll('div.location-deadhead-group')[0];
        if(deadheadGroup_Pickup.length > 0){
            //console.log(deadheadGroup);
            let pickup_location = deadheadGroup_Pickup.childNodes[1].innerText;
            //console.log(pickup_location);
            let pickup_deadhead = deadheadGroup_Pickup.childNodes[2].childNodes[2].innerText;
            //console.log(pickup_deadhead);
            pickup_deadhead = parseInt(String(pickup_deadhead.replace(' mi', '')));
            //console.log(pickup_deadhead);
        }

        let deadheadGroup_Delivery = list.childNodes[2].querySelectorAll('div.location-deadhead-group')[1];
        //console.log(deadheadGroup_Delivery);
        if (deadheadGroup_Delivery.length > 0) {
            
        }
    }
    

    data = {
        "Milliage": parseInt(String(list.childNodes[3].querySelectorAll('div.js-load-distance')[0].childNodes[1].innerText).replace(' mi', '')),
        "Pickup_deadhead": parseInt(String(list.childNodes[2].querySelectorAll('div.location-deadhead-group')[0].childNodes[2].childNodes[2].innerText).replace(' mi', '')),
        "Delivery_deadhead": parseInt(String(list.childNodes[2].querySelectorAll('div.location-deadhead-group')[1].childNodes[2].childNodes[2].innerText).replace(' mi', '')),
        "Pickup_time": Date.parse(list.childNodes[2].querySelectorAll('div.time.help-text')[0].childNodes[1].innerText),
        //"Pickup_time": parseInt(String(list.childNodes[2].querySelectorAll('div.time.help-text')[0].childNodes[2].childNodes[2].innerText).replace(' mi', '')),
    };


          refreshSearch();
         
      });

  }*/

}, 0.4 * 60000);

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