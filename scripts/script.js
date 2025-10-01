const inputLocation = document.querySelector('#location');
const btn = document.querySelector('#btn');

if (btn && inputLocation) {
  btn.addEventListener('click', handleSubmit);
  inputLocation.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  });
}

function handleSubmit() {
  if (inputLocation.value.trim() === "") {
    inputLocation.style.border = "2px solid red";
    return;
  }

  const city = inputLocation.value.trim();
  const apiKey = "c63a59def19f4c18839111749253009";

  async function weatherData() {
    try {
      const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&alerts=yes`);
      const data = await res.json();

      if (!data.error) {
        localStorage.setItem("storedData", JSON.stringify(data));
        window.location.href = "dashboard.html";
      } else {
        alert("Location Not Found");
      }
    } catch (error) {
      console.error("Error Fetching:", error);
      alert("Something went wrong.");
    }
  }

  weatherData();
}


document.addEventListener('DOMContentLoaded', ()=>{
     const data = localStorage.getItem('storedData');

     if(data){
          const parsedData = JSON.parse(data);
          console.log(parsedData);

          document.querySelector('.location').textContent = parsedData.location.name + ', ' + parsedData.location.country;
          document.querySelector('.description').textContent = parsedData.current.condition.text;
          document.querySelector('.temp-now').textContent = Math.round(parsedData.current.temp_c) + '°C';
          document.querySelector('#image').src = "https:" + parsedData.current.condition.icon;

          if(parsedData.alerts && parsedData.alerts.alert.length == 0){
               document.querySelector('#alerts').textContent = "There are no warnings announced for this Location!"
          }
          else{
            document.querySelector('#alerts').innerHTML = `${parsedData.alerts.alert[0].headline}<br>
		  										 Urgency: ${parsedData.alerts.alert[0].urgency} <br>
												 Description: ${parsedData.alerts.alert[0].desc}`
          }

		document.querySelector('#highLow').textContent = Math.round(parsedData.forecast.forecastday[0].day.maxtemp_c) + '°C/' + Math.round(parsedData.forecast.forecastday[0].day.mintemp_c) + "°C";
          document.querySelector('#precipitation').textContent = Math.round(parsedData.current.humidity) + '%';
		document.querySelector('#feelTemp').textContent = Math.round(parsedData.current.feelslike_c) + '°C';
		document.querySelector('#avgHumidity').textContent = Math.round(parsedData.current.humidity) + '%';
		document.querySelector('#wind').textContent = parsedData.current.wind_kph + ' k/h' + parsedData.current.wind_dir;
		document.querySelector('#pressure').textContent = parsedData.current.pressure_mb + ' hpa';
		document.querySelector('#heatIndex').textContent = Math.round(parsedData.current.heatindex_c) + '°C';
		document.querySelector('#visibility').textContent = parsedData.current.vis_km + ' km';
		document.querySelector('#sunrise').textContent = parsedData.forecast.forecastday[0].astro.sunrise;
		document.querySelector('#sunset').textContent = parsedData.forecast.forecastday[0].astro.sunset;
     }
     else{
          alert('Please go back and enter a valid location');
     }
});