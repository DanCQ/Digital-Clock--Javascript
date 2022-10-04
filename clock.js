//Gets calendar & clock text display
function timeStamp() {
  const monthArray = [
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
  const weekdayArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
  ];

  const date = new Date(); //gets your local date & time
  const day = date.getDate(); //number of day in the current month
  const month = monthArray[date.getMonth()]; //number of month for array
  const time = date.toLocaleTimeString(); //a time string value
  const year = date.getFullYear(); //current year
  const weekday = weekdayArray[date.getDay()]; //number of weekday for array

  const hours = time.substring(0, time.search(":")); //display string from 0 to first :
  const minutes = time.substring(time.search(":") + 1, time.lastIndexOf(":")); //display from after first : to before last :
  const daylight = time.substring(time.search("M") - 2, time.search("M") + 1); //display two spaces before M & include M

  //inserts time into html document
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = weekday + ", " + month + " " + day + ", " + year;

  const hh = document.getElementById("hh"); //hour display
  hh.innerHTML = hours;

  const mm = document.getElementById("mm"); //minute display
  mm.innerHTML = minutes + daylight;
}

//creates a blinking effect for the colon (the seconds indicator)
function seconds() {
  const colon = document.getElementById("colon");

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
  box.style.backgroundPosition = 'center';
  box.style.backgroundRepeat = 'no-repeat';
  box.style.backgroundSize = 'cover';
};


//? Change background image based on user's time w/ const(currentHour)
const backgroundUI = function (e) {

  const background = document.querySelector(".box"); //selects container background
  const timeClock = document.querySelector(".clock"); //selects clock face

  if (e >= 6 && e <= 11) {
    // console.log(background);
    background.style.background = 'url(images/1.jpg)';
    backgroundProperties(background);
    timeClock.style.color = "black";
  }
  if (e >= 12 && e <= 17) {
    background.style.background = 'url(images/2.jpg)';
    backgroundProperties(background);
    timeClock.style.color = "black";
  }
  if (e >= 18 && e <= 22) {
    background.style.background = 'url(images/3.jpg)';
    backgroundProperties(background);
    timeClock.style.color = "white";
  }
  if (e >= 23 || e <= 5) {
    background.style.background = 'url(images/4.jpg)';
    backgroundProperties(background);
    timeClock.style.color = "white";
  }
};

//gets local date & time for use w/ backgroundUI() function
const currentHour = function () {
  const hourNow = new Date().getHours();

  return hourNow;
}


//runs function after html document loads
window.onload = function () {
  
  timeStamp(); //runs once without delay
  backgroundUI(currentHour()); //runs once without delay

  setInterval(function () { backgroundUI(currentHour()); }, 1000 * 60 ); //avoids a refresh to see background change (runs every minute)
  
  setInterval(function () { timeStamp(); }, 1000); //keeps time running every second (millisecond)
  setInterval(function () { seconds(); }, 1000 / 2); //runs twice per second (millisecond)
};
