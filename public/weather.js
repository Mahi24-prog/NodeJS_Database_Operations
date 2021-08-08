const curDate = document.getElementById("date");
const weathercon = document.getElementById("weathercon");
const date = document.getElementsByClassName("date");
const tempStatus = "cloud";



const getCurrentDay = () => {
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  let currentTime = new Date();
  return (weekday[currentTime.getDay()]);
};

const getCurrentTime = () => {
  var month = new Array();
  month[0] = "Jan";
  month[1] = "Feb";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "Aug";
  month[8] = "Sep";
  month[9] = "Oct";
  month[10] = "Nov";
  month[11] = "Dec";

  var now = new Date();
  var monthind = now.getMonth() + 1;
  var day = now.getDate();
  let hrs = now.getHours();
  let min = now.getMinutes();

  let period = "AM";
  if (hrs > 12) {
    period = "PM";
    hrs -= 12;
  }
  if (min < 10) {
    min = "0" + min;
  }

  return (`${month[monthind]} ${day} | ${hrs}:${min} ${period}`);
}

curDate.innerHTML = getCurrentDay() + " | " + getCurrentTime();


