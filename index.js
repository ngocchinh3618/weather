let day = document.getElementById("day");
let city = document.getElementById("city");
let wind = document.getElementById("wind");
let tempp = document.getElementById("temp");
let humidity = document.getElementById("humidity");
let preciptation = document.getElementById("preciptation");

const userAction = async (lat, lon) => {
  const getAPILocation =  await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4ad98682883ede3d088095d90aaf6a65`);
  const getAPILocationJson =  await getAPILocation.json();
  // console.log('result',getAPILocation, getAPILocationJson)
  const getAPIName = await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=524901&q=${getAPILocationJson.name}&appid=4ad98682883ede3d088095d90aaf6a65`);
  const getAPINameJson = await getAPIName.json();
  console.log(getAPINameJson)
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  document.getElementById("time-zone").innerHTML = "Time Zone: " + timezone;
  day.innerHTML= (getAPINameJson.list[0].dt_txt).split(' ')[0];
  city.innerHTML= getAPINameJson.city.name;
  humidity.innerHTML= getAPINameJson.list[0].wind.speed;
  wind.innerHTML= getAPINameJson.list[0].main.humidity;
  tempp.innerHTML= Math.round((getAPINameJson.list[0].main.temp) - 273);
  getDow(getAPINameJson.list[0].dt, "dow");

  const keys = Object.keys(getAPINameJson.list[0]);
  
  for (let i = 0; i < keys.length; i++) {
    // console.log('keys', keys[i])
    if( keys[i] == "rain"){
      preciptation.innerHTML= getAPINameJson.list[0].rain["3h"];
    }
    else{
      preciptation.innerHTML= 0;
    }
  }

  let count = 0;
  for (let i = 1; i < 40; i++) {
    if(i % 8 == 0){
      count++;
      var asd = getAPINameJson.list[i].dt;
      var temp = Math.round((getAPINameJson.list[i].main.temp) - 273);
      console.log(temp)
      getDow(asd, "item"+count);
      temperature(temp,"temp"+count);
    }
  }
}
function setE(id, value) {
  document.getElementById(id).innerHtml = value;
}
function getCurrentLocation(){
  navigator.geolocation.getCurrentPosition((pos)=> {
    var crd = pos.coords;
    userAction(crd.latitude, crd.longitude);
  }, (err)=>{
    alert("An error happened!!! " + err.message);
  })
}
function changeLocation(){
  let iLatitude = document.getElementById("iLat").value; 
  let longitude = document.getElementById("iLon").value;
  if(iLatitude == undefined || longitude == undefined ){
    userAction()
  }
  else{
    userAction(iLatitude,longitude);
  }
}

function getDow(dt, tag) {
  var d = new Date(dt * 1000);
  var n = d.getDay()
  switch (n) {
    case 0:
      n = "Sunday";
      break;
    case 1:
      n = "Monday";
      break;
    case 2:
      n = "Tuesday";
      break;
    case 3:
      n = "Wednesday";
      break;
    case 4:
      n = "Thursday";
      break;
    case 5:
      n = "Friday";
      break;
    case  6:
      n = "Saturday";
  }
    document.getElementById(tag).innerHTML = n;
}
  
let temperature = (temp, tag)=>{
  document.getElementById(tag).innerHTML = temp;
}

document.addEventListener("DOMContentLoaded", function() {
  const position = JSON.parse(window.localStorage.getItem('location'));
  console.log(position)
  if(!position.long|| !position.lat){

  }else{
    userAction(position.lat,position.long);
  }
  
});

// call a rest web service api
// https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript

// get api by city name
// https://openweathermap.org/current

// get api by cBy geographic coordinates
// https://openweathermap.org/current#geo
