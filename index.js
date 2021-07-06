const userAction = async (lat = 10.775238, lon = 106.632524) => {
  
  const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4ad98682883ede3d088095d90aaf6a65`);
  const myJson = await response.json();

  const response1 = await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=524901&q=${myJson.name}&appid=4ad98682883ede3d088095d90aaf6a65`);
  const myJson1 = await response1.json();
  console.log(myJson); 
  console.log(myJson1); 
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  document.getElementById("time-zone").innerHTML = "Time Zone: " + timezone;
  document.getElementById("day").innerHTML= myJson1.list[0].dt_txt;
  document.getElementById("city").innerHTML= myJson1.city.name;
  document.getElementById("preciptation").innerHTML= myJson1.list[0].rain["3h"];
  document.getElementById("humidity").innerHTML= myJson1.list[0].wind.speed;
  document.getElementById("wind").innerHTML= myJson1.list[0].main.humidity;
  document.getElementById("temp").innerHTML= Math.round((myJson1.list[0].main.temp) - 273);
  myFunction(myJson1.list[0].dt, "dow");
  
  let count = 0;
  for (let i = 1; i < 40; i++) {
    if(i % 8 == 0){
      count++;
      var asd = myJson1.list[i].dt;
      var temp = Math.round((myJson1.list[i].main.temp) - 273);
      console.log(temp)
      myFunction(asd, "item"+count);
      temperature(temp,"temp"+count);
    }
  }

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
  if(iLatitude == 0 || longitude == 0 ){
    userAction()
  }
  else{
    userAction(iLatitude,longitude);
  }
  console.log("iLatitude"+ iLatitude);
}

function myFunction(dt, tag) {
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
  userAction();
});
  




































// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

// const userAction = async () => {
//   const response = await fetch('https://maps.googleapis.com/maps/api/timezone/json?location=39.6034810,-119.6822510&timestamp=1331161200&key=AIzaSyAUWrHZbX_SmR2TehFKl9xfzXv6dTFNXSM', {
//     method: 'POST',
//     body: myBody, // string or object
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
//   const myJson = await response.json(); //extract JSON from the http response
//   // do something with myJson
// }

// const userAction = async () => {
//   const response = await fetch('https://maps.googleapis.com/maps/api/timezone/json?location=39.6034810,-119.6822510&timestamp=1331161200&key=AIzaSyAUWrHZbX_SmR2TehFKl9xfzXv6dTFNXSM');
//   const myJson = await response.json(); //extract JSON from the http response
//   console.log(myJson);
//   // do something with myJson
// }

// // Note: This example requires that you consent to location sharing when
// // prompted by your browser. If you see the error "The Geolocation service
// // failed.", it means you probably did not give permission for the browser to
// // locate you.

// console.log(object)


// let map, infoWindow;

// function initMap() {
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 6,
//   });
//   infoWindow = new google.maps.InfoWindow();
//   const locationButton = document.createElement("button");
//   locationButton.textContent = "My location";
//   locationButton.classList.add("custom-map-control-button");
//   map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
//   locationButton.addEventListener("click", () => {
//     // Try HTML5 geolocation.
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const pos = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };
//           console.log(pos)
//           infoWindow.setPosition(pos);
//           infoWindow.setContent("Location found.");
//           infoWindow.open(map);
//           map.setCenter(pos);
//         },
//         () => {
//           handleLocationError(true, infoWindow, map.getCenter());
//         }
//       );
//     } else {
//       // Browser doesn't support Geolocation
//       handleLocationError(false, infoWindow, map.getCenter());
//     }
//   });
// }

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(
//     browserHasGeolocation
//       ? "Error: The Geolocation service failed."
//       : "Error: Your browser doesn't support geolocation."
//   );
//   infoWindow.open(map);
// }

// document.addEventListener("DOMContentLoaded", function(event) { 
//   initMap();
// });



// function seconds_with_leading_zeros(dt) 
// { 
//   return /\((.*)\)/.exec(new Date().toString())[1];
// }

// dt = new Date(); 
// console.log(seconds_with_leading_zeros(dt)); 

// dt = new Date(1989, 10, 1); 
// console.log(seconds_with_leading_zeros(dt));



// document.addEventListener("DOMContentLoaded", function() {
//   userAction();
 
//   // var today = new Date();
//   // var date = today.getFullYear()+'-'+("0" + (today.getMonth() + 1)).slice(-2)+'-'+
//   // ("0" + today.getDate()).slice(-2);
//   // var time = ("0" + today.getHours()).slice(-2) + ":" + ("0" + today.getMinutes()).slice(-2) + ":" + ("0" + today.getSeconds()).slice(-2);
//   // var dateTime = date+' '+time;
  
//   // myFunction(today.getTime()/1000, dateTime);

  
    
// });