



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




