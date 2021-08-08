var month = document.getElementById("month").value;
var year = document.getElementById("year").value;

console.log(month)

document.getElementsByClassName("month").innerHTML = month;


function close(){
    console.log("clicked")
    getElementById("alert").style.display = "none";
  }