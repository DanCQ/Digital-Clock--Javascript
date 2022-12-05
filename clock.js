const analog = document.querySelector(".analog"); //analog clock face
const background = document.querySelector(".background"); //selects container background
const digital = document.querySelector(".digital"); //digital clock face


//switches between analog and digital
background.addEventListener("click", function() {
  
  if(digital.style.visibility  == "hidden") {

    digital.style.visibility = "visible";
    analog.style.visibility  = "hidden";
  } else {
    digital.style.visibility = "hidden";
    analog.style.visibility  = "visible";
  }
});


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
  calendar.innerHTML = `${weekday}, ${month} ${day}, ${year}`;

  const hh = document.getElementById("hh"); //hour display
  hh.innerHTML = hours;

  const mm = document.getElementById("mm"); //minute display
  mm.innerHTML = minutes + daylight;

  
  function analogClock() {

    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
  
    const hourHand = document.querySelector(".hour");
    const minuteHand = document.querySelector(".minute");
    const secondHand = document.querySelector(".second");
  
    const hourDegree = ((hour / 12) * 360) + 180;
    const minuteDegree = ((minute / 60) * 360) + 180;
    const secondDegree = ((second / 60) * 360) + 180;
  
    hourHand.style.transform = `rotate(${hourDegree}deg)`;
    minuteHand.style.transform = `rotate(${minuteDegree}deg)`;
    secondHand.style.transform = `rotate(${secondDegree}deg)`;

    if(hourDegree >= 510) {
      hourHand.style.transition = "all 0s";

      setTimeout(function() {
        hourHand.style.transition = "all 0.05s";
        hourHand.style.transitionTimingFunction = "cubic-bezier(0.1, 2.7, 0.58, 1)";
      }, (60000 * 60) + 30000); //60 seconds * 60 = (1 hour) + 30 seconds
    }

    if(secondDegree >= 528) {
      secondHand.style.transition = "all 0s";

      setTimeout(function() {
        secondHand.style.transition = "all 0.05s";
        secondHand.style.transitionTimingFunction = "cubic-bezier(0.1, 2.7, 0.58, 1)";
      }, 3000); //waits 3 seconds
    }

    if(minuteDegree >= 534) {
      minuteHand.style.transition = "all 0s";

      setTimeout(function() {
        minuteHand.style.transition = "all 0.05s";
        minuteHand.style.transitionTimingFunction = "cubic-bezier(0.1, 2.7, 0.58, 1)";
      }, 90000); //wait 90 seconds
    }

  }
  analogClock();
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


//gets local date & time for use w/ backgroundUI() function
const currentHour = function () {

  const hourNow = new Date().getHours();
  return hourNow;
};


//Changes background image based on user's time w/ const(currentHour)
const backgroundUI = function (hour) {
  
  if (hour >= 5 && hour <= 9) {

    background.style.background = 'url(images/1.jpeg)';
    digital.style.color = "black";
  }
  if (hour >= 10 && hour <= 15) {
    background.style.background = 'url(images/2.jpeg)';
    digital.style.color = "black";
  }
  if (hour >= 16 && hour <= 20) {
    background.style.background = 'url(images/3.jpeg)';
    digital.style.color = "white";
  }
  if (hour >= 21 || hour <= 4) {
    background.style.background =  'url(images/4.jpeg)';
    digital.style.color = "white";
  }

  background.style.backgroundPosition = 'center';
  background.style.backgroundRepeat = 'no-repeat';
  background.style.backgroundSize = 'cover';
};


//runs function after html document loads
window.onload = function() {
  
  timeStamp(); //runs once without delay
  backgroundUI( currentHour() ); //runs once without delay
  
  //avoids a refresh to see background change (runs every minute)
  setInterval(function () { backgroundUI( currentHour() ) }, 1000 * 60 ); 
  
  setInterval(function () { timeStamp() }, 1000); //keeps time running every second (millisecond)
  setInterval(function () { seconds() }, 1000 / 2); //runs twice per second (millisecond)
};
