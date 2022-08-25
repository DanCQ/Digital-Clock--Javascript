
function timeStamp() {
    var monthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var weekdayArray = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"];

    var date = new Date();
    var day = date.getDate(); //number of day in the current month
    var month = monthArray[date.getMonth()]; //number of month for array
    var time = date.toLocaleTimeString(); //a time string value
    var year = date.getFullYear(); //current year
    var weekday = weekdayArray[date.getDay()]; //number of weekday for array 

    var hours = time.substring(0, time.search(":")); //display string from 0 to first :
    var minutes = time.substring(time.search(":")+1, time.lastIndexOf(":") ); //display from after first : to before last :
    var daylight = time.substring(time.search("M")-2, time.search("M")+1 ); //display two spaces before M & include M

    //posts time inside html page
    var first = document.getElementById("first");
    first.innerHTML = weekday +", "+ month +" "+ day +", "+ year +". "+ hours;

    var second = document.getElementById("second");
    second.innerHTML = minutes + daylight;

}

//creates a blinking effect for the colon
function seconds (){
    var colon = document.getElementById("colon");

    if (colon.className != "hide") {
        colon.className = "hide";
        return colon;
    } else {
        colon.className = "";
        return colon;
    }

}

//runs function after html document loads
window.onload = function() {
    setInterval(function(){ timeStamp() }, 1000); //dynamic page - runs every 1 second
    setInterval(function(){ seconds() }, 500) //runs twice per second
}
