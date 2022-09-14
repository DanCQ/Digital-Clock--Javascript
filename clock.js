//gets local date & time for use w/ backgroundUI() function
const currentHour = new Date().getHours(); 

function timeStamp() {
  var monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var weekDayArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
  ];

  var date = new Date(); //gets your local date & time
  var day = date.getDate(); //number of day in the current month
  var month = monthArray[date.getMonth()]; //number of month for array
  var time = date.toLocaleTimeString(); //a time string value
  var year = date.getFullYear(); //current year
  var weekDay = weekDayArray[date.getDay()]; //number of weekday for array

  const hours = time.substring(0, time.search(":")); //display string from 0 to first :
  var minutes = time.substring(time.search(":") + 1, time.lastIndexOf(":")); //display from after first : to before last :
  var dayLight = time.substring(time.search("M") - 2, time.search("M") + 1); //display two spaces before M & include M

  //inserts time into html document
  var first = document.getElementById("first");
  first.innerHTML = weekDay + ", " + month + " " + day + ", " + year + ".";

  var second = document.getElementById("second");
  second.innerHTML = hours;

  var third = document.getElementById("third");
  third.innerHTML = minutes + dayLight;

  return hours;
}

//creates a blinking effect for the colon (the seconds indicator)
function seconds() {
  var colon = document.getElementById("colon");

  if (colon.className != "hide") {
    colon.className = "hide";
    return colon;
  } else {
    colon.className = "";
    return colon;
  }
}


//? Ensures background properties remain at full size.
const backgroundProperties = function (box) {
  box.style.backgroundPosition = `center`;
  box.style.backgroundRepeat = `no-repeat`;
  box.style.backgroundSize = `cover`;
};


//? Change background image based on user's time w/ const(currentHour)
const backgroundUI = function (e) {

  var background = document.querySelector(".box"); //selects html element
  var timeClock = document.querySelector(".daily");

  if (e >= 6 && e <= 12) {
    // console.log(background);
    background.style.background = `url(images/1.jpg)`;
    backgroundProperties(background);
    timeClock.style.color = "black";
  }
  if (e > 12 && 3 <= 15) {
    background.style.background = `url(images/2.jpg)`;
    backgroundProperties(background);
    timeClock.style.color = "black";
  }
  if (e > 15 && 3 <= 19) {
    background.style.background = 'url(images/3.jpg)';
    backgroundProperties(background);
    timeClock.style.color = "white";
  }
  if (e > 19 || e < 6) {
    background.style.background = `url(images/4.jpg)`;
    backgroundProperties(background);
    timeClock.style.color = "white";
  }
};


//runs function after html document loads
window.onload = function () {
  
  timeStamp(); //runs once without delay
  backgroundUI(currentHour); //runs once without delay
  
  setInterval (function () { backgroundUI(currentHour); }, 1000); //avoids a refresh to see background change
  
  setInterval(function () { timeStamp(); }, 1000); //keeps time running every second (millisecond)
  setInterval(function () { seconds(); }, 1000 / 2); //runs twice per second (millisecond)
};
