
var driverIsAvailabe = false;


/* Search Settings Starts (should be gotten from database) */

//Get driver availability schedule 
const driverAvailability = [
    "March 6, 2024 18:00:00 // March 8, 2024 24:00:00 // Open // 1 // 3456",
    "March 9, 2024 18:00:00 // March 9, 2024 24:00:00 // Fufilled // 0 // id",
    "March 5, 2024 18:00:00 // March 5, 2024 24:00:00 // Expired // 0 // id",
    "March 10, 2024 18:00:00 // March 17, 2024 24:00:00 // Open // 2 // id"
];



/* Search Settings Ends  */


if (driverNeedsLoad(driverAvailability) == true) {

 

}




// fucntion Checks if driver needs load(s)
function driverNeedsLoad() {
    if (driverIsAvailabe == false) {

        //get current time 
        let d = new Date();
        let currenTime = d.getTime();

        // for each item in data, if item_time is > current time 
        driverAvailability.forEach(item => {
            item = item.split(" // ");
            if (item[2] === "Open") {
                let endTime = Date.parse(item[1]);
                if (endTime >= currenTime) {
                    //console.log(item);
                    driverIsAvailabe = true;
                }
            }
        });


    } return driverIsAvailabe;
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

function refreshSearch() {
     //Click on search button to refresh search results.
     const clickSearchBtn = document.querySelectorAll('button#btn-find-loads-search-submit')[0];
     clickSearchBtn.click();
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