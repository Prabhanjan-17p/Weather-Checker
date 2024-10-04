// Api and key 
const apikey = "91b7042399fe01d85fbcd90475f0edea";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//Fetch the html file
const searchBox = document.querySelector(".inputSearch");
const searchBTN = document.querySelector(".btnAction");
const weatherIcon = document.querySelector(".videoCloud");

//Onclick Event After searching
async function checkWeather(city) {
    //Featch api data from website
    const response = await fetch(apiurl + city + `&appid=${apikey}`);

    //check Featch data are available or not available
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
    } else {
        //Featch data from API to convert into json file
        var data = await response.json();
        // console.log(data);

        //Featch data from html code and Add his inner part speed,humidity and °C and State name 
        document.querySelector(".enterLocationName").innerHTML = data.name;
        document.querySelector(".enterLocationTem").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".enterLocationHumidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".enterLocationSpeed").innerHTML = data.wind.speed + " km/h";

        //it check and show the weather type then show the img
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "clouds.png";
        }
        else if (data.weather[0].main == "clear") {
            weatherIcon.src = "clear.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "drizzle.png";
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "storm.png";
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "mist.png";
        }

        //When you enter wrong locaction it return 
        document.querySelector(".error").style.display = "none";
    }
}

//Searching a city name (OnClick)
searchBTN.addEventListener("click", () => {
    checkWeather(searchBox.value);
})

//onload location with weather
async function checkWeatherOnload(ee) {
    //Featch api data from website
    const response = await fetch(apiurl + ee + `&appid=${apikey}`);

    //check Featch data are available or not available on onLoad secection
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
    } else {
        //Featch data from API to convert into json file
        var data1 = await response.json();
        console.log(data1);

        //Featch data from html code and Add his inner part speed,humidity and °C and State name 
        document.querySelector(".enterLocationName").innerHTML = data1.name;
        document.querySelector(".enterLocationTem").innerHTML = Math.round(data1.main.temp) + "°C";
        document.querySelector(".enterLocationHumidity").innerHTML = data1.main.humidity + "%";
        document.querySelector(".enterLocationSpeed").innerHTML = data1.wind.speed + " km/h";

        //When you enter wrong locaction it return 
        document.querySelector(".error").style.display = "none";
    }

}

//Fetch the html file
const weatherNameElement = document.querySelector(".enterLocationName");
const notAllowedLocation = document.querySelector(".boxx");

// Api and key 
const apiEndpoint = "https://api.opencagedata.com/geocode/v1/json";
const apiKeyEndpoint = "fdf9da976ca54ed6bce313eba62e2f99";

// It convert the latitude and longitude to palce coordinates(location)
const getLoacteThroughLL = async (latitude, longitude) => {
    let query = `${latitude},${longitude}`;
    //Featch the data from api (get Request)
    let currentLocationURL = `${apiEndpoint}?key=${apiKeyEndpoint}&q=${query}&pretty=1`;

    //It try when you allow your current location then it try the data and featch the data
    try {
        const res = await fetch(currentLocationURL);
        const locData = await res.json();
        // console.log(locData);

        // if the Location is decline
        if (res.status == 404) {
            // console.log("Location not allowed you ");
        } else {
            //it featch the state loaction and start a function
            weatherNameElement.innerHTML = locData.results[0].components.state_district;
            const bbnew = locData.results[0].components.state_district;
            checkWeatherOnload(bbnew);
        }
    } catch (e) {
        console.log(e);
        return;  // Don't stop the function if there's an error fetching the location.
    }
};

//If the geolocation is available then
function passLocation(fetchLocation) {
    //catch the latitude and longitude data from json
    const { latitude, longitude } = fetchLocation.coords
    //calling a function for convert latitude and longitude to place location
    getLoacteThroughLL(latitude, longitude);
    // console.log(fetchLocation);
    notAllowedLocation.style.display = "block";
    document.querySelector(".NotAllowedLocation").style.display = "none";
}

// If the geolocation is not available then
function faildLocation() {
    notAllowedLocation.style.display = "none";
}

// When you open the page then get your current location and show weather data of that location
window.onload = function () {
    getLocation();

}

// Get current location
function getLocation() {
    const fetchLocation = navigator.geolocation.getCurrentPosition(passLocation, faildLocation);
}

// Date and time
const date = new Date();
const inputDate = document.querySelector(".enterLocationDateTime");
let dateDate = date.getDate();
let dateMonth = date.getMonth() + 1;
let dateYear = date.getFullYear();

// month number convert to month Name format using if else operator
if (dateMonth == 1) {
    newDateMonth = "January";
}
else if (dateMonth == 2) {
    newDateMonth = "February";
}
else if (dateMonth == 3) {
    newDateMonth = "March";
}
else if (dateMonth == 4) {
    newDateMonth = "April";
}
else if (dateMonth == 5) {
    newDateMonth = "May";
}
else if (dateMonth == 6) {
    newDateMonth = "June";
}
else if (dateMonth == 7) {
    newDateMonth = "July";
}
else if (dateMonth == 8) {
    newDateMonth = "August";
}
else if (dateMonth == 9) {
    newDateMonth = "September";
}
else if (dateMonth == 10) {
    newDateMonth = "October";
}
else if (dateMonth == 11) {
    newDateMonth = "November";
}
else if (dateMonth == 12) {
    newDateMonth = "December";
}
//adding in one element using `${}`
let cureentDate = `${dateDate} ${newDateMonth} ${dateYear}`;
//Insert the Current date into a html file
inputDate.innerHTML = cureentDate;