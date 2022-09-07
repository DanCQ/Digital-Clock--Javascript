//? GET HTML Elements using the DOM!
const background = document.querySelector(".box");
const timeClock = document.querySelector(".daily");

//? Get the hour of the user so we can manipulate the background with it!
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

  var date = new Date();
  var day = date.getDate(); //number of day in the current month
  var month = monthArray[date.getMonth()]; //number of month for array
  var time = date.toLocaleTimeString(); //a time string value
  var year = date.getFullYear(); //current year
  var weekDay = weekDayArray[date.getDay()]; //number of weekday for array

  const hours = time.substring(0, time.search(":")); //display string from 0 to first :
  var minutes = time.substring(time.search(":") + 1, time.lastIndexOf(":")); //display from after first : to before last :
  var dayLight = time.substring(time.search("M") - 2, time.search("M") + 1); //display two spaces before M & include M

  //posts time inside html page
  var first = document.getElementById("first");
  first.innerHTML =
    weekDay + ", " + month + " " + day + ", " + year + ". " + hours;

  var second = document.getElementById("second");
  second.innerHTML = minutes + dayLight;
  return hours;
}

//creates a blinking effect for the colon
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

//runs function after html document loads
window.onload = function () {
  const A_SECOND = 1000;

  timeStamp(); //runs once without delay
  setInterval(function () {
    timeStamp();
  }, A_SECOND); //dynamic page - runs every 1 second
  setInterval(function () {
    seconds();
  }, A_SECOND * 0.5); //runs twice per second
};

//? Changes the background properties so it's full size at all times.
const backgroundProperties = function (box) {
  box.style.backgroundPosition = `center`;
  box.style.backgroundRepeat = `no-repeat`;
  box.style.backgroundSize = `cover`;
};

//? Changes the background image based on what the time of the user is (currentHour)

const backgroundUI = function (e) {
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
    background.style.background = `url(images/3.jpg)`;
    backgroundProperties(background);
    timeClock.style.color = "white";
  }
  if (e > 19 || e < 6) {
    background.style.background = `url(images/4.jpg)`;
    backgroundProperties(background);
    timeClock.style.color = "white";
  }
};

backgroundUI(currentHour);
