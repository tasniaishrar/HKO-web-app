var data, weather_forecast;

//retrieving current weather data using fetch
async function getCurrent() {
  try {
    let response = await fetch("https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en");
    if (response.status === 200) {
      data = await response.json();
    } else {
      console.log(data);
    }
  } catch (err) {
    console.log("Fetch Error");
  }
}

//retrieving weather forecast data using fetch
async function getForecast() {
  try {
    let response = await fetch("https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en");
    if (response.status === 200) {
      weather_forecast = await response.json();
    } else {
      console.log(weather_forecast);
    }
  } catch (err) {
    console.log("Fetch Error");
  }
}

var click = false;

//function to show warning message while hovering over warning button, if any
function warningMouseover() {
  if (click === true) {
    let warning = document.getElementsByClassName("warningMsg");
    let warningButton = document.getElementsByClassName("warning");
    warningButton[0].style.borderBottomLeftRadius = "15px";
    warningButton[0].style.borderBottomRightRadius = "15px";
    warning[0].style.display = "none";
    click = false;
  } else {
    let warning = document.getElementsByClassName("warningMsg");
    let warningButton = document.getElementsByClassName("warning");
    warningButton[0].style.borderBottomLeftRadius = "15px";
    warningButton[0].style.borderBottomRightRadius = "15px";
    warning[0].style.display = "block";
    click = true;
  }
}
	
//creating HTML classes, elements and their attributes
async function HTML1() {
  let current_w = await getCurrent();
  const temps = data.temperature.data;
  console.log(temps);
  topBanner = document.createElement("div");
  reload = document.createElement("div");
  header = document.createElement("div");
  content = document.createElement("div");

  warning = document.createElement("warningButton");
  warningImg = document.createElement("img");
  warningMsg = document.createElement("div");

  weatherIcon = document.createElement("div");
  weatherImg = document.createElement("img");

  tempIcon = document.createElement("div");
  tempImg = document.createElement("img");
  temp = document.createElement("span");
  
  rainIcon = document.createElement("div");
  rainImg = document.createElement("img");
  
  rain = document.createElement("span");

  humidIcon = document.createElement("div");
  humidImg = document.createElement("img");
  humid = document.createElement("span");

  UVIcon = document.createElement("div");
  UVImg = document.createElement("img");
  UV = document.createElement("span");

  time = document.createElement("span");
  choices = document.createElement("div");
  tempOption = document.createElement("span");
  forecastOption = document.createElement("span");
  bodyContent = document.createElement("div");

  reload.classList.add("reload");
  topBanner.classList.add("topBanner");
  header.classList.add("header");
  content.classList.add("content");

  weatherIcon.classList.add("weatherIcon");
  weatherImg.classList.add("weatherImg");

  tempIcon.classList.add("tempIcon");
  tempImg.classList.add("tempImg");
  
  humidIcon.classList.add("humidIcon");
  humidImg.classList.add("humidImg");

  rainIcon.classList.add("rainIcon");
  rainImg.classList.add("rainImg");

  UVIcon.classList.add("UVIcon");
  UVImg.classList.add("UVImg");
  UV.classList.add("UV");

  warning.classList.add("warning");
  warningImg.classList.add("warningImg");
  warningMsg.classList.add("warningMsg");

  time.classList.add("time");

  choices.classList.add("choices");
  tempOption.classList.add("selectedChoice");

  bodyContent.classList.add("bodyContent");
  
  reload.addEventListener("click", pageReload);
  var weather_icon = data.icon[0] + ".png";
  weatherImg.src = "https://www.hko.gov.hk/images/HKOWxIconOutline/pic" + weather_icon;
  tempImg.src = "images/thermometer.png";
  rainImg.src = "images/rain.png";
  humidImg.src = "images/drop.png";
  warningImg.src = "images/arrow.png";
  UVImg.src = "images/UVindex.png";
  warning.addEventListener("click", warningMouseover);
  forecastOption.addEventListener("click", HTML2);
  
  reload.appendChild(document.createTextNode("↻"));
  header.appendChild(document.createTextNode("Weather in Hong Kong"));

  var string1=data.temperature.data[1].value + "\u2103", string2=data.humidity.data[0].value + "%", string3=data.rainfall.data[13].max + "mm";
  
  temp.appendChild(
    document.createTextNode(string1)
  );
  humid.appendChild(document.createTextNode(string2));
  rain.appendChild(document.createTextNode(string3));

  if (data.uvindex.length == 0) {
    UVIcon.style.display = "none" ;
  } else {
    UV.appendChild(document.createTextNode(data.uvindex.data[0].value));
    UVIcon.style.display = "block";
  }

  warning.appendChild(document.createTextNode("Warning"));
  warning.appendChild(warningImg);

  if (data.warningMessage.length == 0) {
    warning.style.display = "none";
  } else {
    warning.style.display = "block";
    warningMsg.appendChild(document.createTextNode(data.warningMessage[0]));
  }

  warningMsg.style.display = "none";
  time.appendChild(
    document.createTextNode("Last Update: " + data.updateTime.substring(11, 16))
  );

  tempOption.appendChild(document.createTextNode("Temperature"));
  forecastOption.appendChild(document.createTextNode("Forecast"));
  temps.forEach((element, index) => {
    let currentBox = document.createElement("div");
    let cancel = document.createElement("img");
    let location = document.createElement("div");
    let temperature = document.createElement("div");
    currentBox.classList.add("currentBox");
    cancel.classList.add("cancel");
    location.classList.add("location");
    temperature.classList.add("temperature");
    cancel.src = "images/cancel.ico";
    location.appendChild(document.createTextNode(element.place));
    temperature.appendChild(document.createTextNode(element.value + "\u2103"));
    currentBox.appendChild(cancel);
    currentBox.appendChild(location);
    currentBox.appendChild(temperature);
    bodyContent.appendChild(currentBox);

    cancel.onclick = function () {
      bodyContent.childNodes[index].style.display = "none";
    };
  });
  weatherIcon.appendChild(weatherImg);

  humidIcon.appendChild(humidImg);
  humidIcon.appendChild(humid);

  tempIcon.appendChild(tempImg);
  tempIcon.appendChild(temp);
    
  UVIcon.appendChild(UVImg);
  UVIcon.appendChild(UV);

  rainIcon.appendChild(rainImg);
  rainIcon.appendChild(rain);

  content.appendChild(weatherIcon);
  content.appendChild(tempIcon);
  content.appendChild(humidIcon);
  content.appendChild(rainIcon);
  content.appendChild(UVIcon);

  document.body.appendChild(topBanner);
  topBanner.appendChild(header);
  topBanner.appendChild(reload);
  topBanner.appendChild(content);
  topBanner.appendChild(warning);
  topBanner.appendChild(warningMsg);
  choices.appendChild(tempOption);
  choices.appendChild(forecastOption);
  topBanner.appendChild(time);
  document.body.appendChild(choices);
  document.body.appendChild(bodyContent);
}

async function HTML2() {
  let current_w = await getCurrent();
  let forecast_w = await getForecast();
  const info_forecast = weather_forecast.weatherForecast;

  console.log(weather_forecast);
  tempOption.classList.remove("selectedChoice");
  forecastOption.classList.add("selectedChoice");
  forecastOption.removeEventListener("click", HTML2);
  tempOption.addEventListener("click", pageReload);

  var weather_icon = data.icon[0] + ".png";
  weatherImg.src = "https://www.hko.gov.hk/images/HKOWxIconOutline/pic" + weather_icon;


  var string1=data.temperature.data[1].value + "\u2103", string2=data.humidity.data[0].value + "%", string3=data.rainfall.data[13].max + "mm";
  temp.innerHTML = string1;
  humid.innerHTML = string2;
  rain.innerHTML = string3;

  if (data.uvindex.length != 0) {
    UV.innerHTML = data.uvindex.data[0].value;
    UVIcon.style.display = "block";
  } else {
    UVIcon.style.display = "none";
  }
  if (data.warningMessage.length != 0) {
    warning.style.display = "block";
    warningMsg.innerHTML = data.warningMessage[0];
  } else {
    warning.style.display = "none";
  }
  warningMsg.style.display = "none";
  time.innerHTML = "Last Update: " + data.updateTime.substring(14, 19);
  while(bodyContent.firstChild) {
    bodyContent.removeChild(bodyContent.firstChild)
  }
  info_forecast.forEach((element) => {
    let forecastBox = document.createElement("div");
    let forecastWeather = document.createElement("img");
    let forecastDate = document.createElement("div");
    let forecastDay = document.createElement("div");
    let forecastHumid = document.createElement("div");
    let forecastTemp = document.createElement("div");
    forecastBox.classList.add("forecastBox");
    forecastWeather.classList.add("forecastWeather");
    forecastTemp.classList.add("forecastTemp");
    forecastDate.classList.add("forecastDate");
    forecastDay.classList.add("forecastDay");
    forecastHumid.classList.add("forecastHumid");
    forecastWeather.src = "https://www.hko.gov.hk/images/HKOWxIconOutline/pic" + element.ForecastIcon + ".png";
    forecastDate.appendChild(
      document.createTextNode(element.forecastDate.slice(element.forecastDate.length - 2, element.forecastDate.length) + "/" + element.forecastDate.slice(element.forecastDate.length - 4,element.forecastDate.length -2)));
    forecastDay.appendChild(document.createTextNode(element.week));
    forecastTemp.appendChild(
      document.createTextNode(element.forecastMintemp.value +"\u2103" + " | " + element.forecastMaxtemp.value +"\u2103"));
    forecastHumid.appendChild(document.createTextNode(element.forecastMinrh.value + "%" + " - " + element.forecastMaxrh.value + "%"));
    forecastBox.appendChild(forecastWeather);
    forecastBox.appendChild(forecastDay);
    forecastBox.appendChild(forecastTemp);
    forecastBox.appendChild(forecastDate);
    forecastBox.appendChild(forecastHumid);
    bodyContent.appendChild(forecastBox);
  });
}
 
//for reloading/refreshing page
function pageReload() {
  window.location.reload();
}

//display all elements on screen
window.onload = function () {
  HTML1();
};
