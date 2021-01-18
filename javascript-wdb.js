$(document).ready(function () {
  console.log("Hello world! The document is ready!");

  let APIkey = "";
  let response = "";
  let city = "";
  let url = "";
  let cities = [];
  let citiesDiv = document.getElementById("previously_searched_cities_container");
  
  init();
  searchedClick();
  searchClick();

  //This function calls any cities added to the search history from local storage and populates the previously searched cities array.
  function init() {
    let citiesLocalStorage = JSON.parse(localStorage.getItem("cities"));
    if (citiesLocalStorage !== null) {
      cities = citiesLocalStorage;
    }
    displayButtons();
  };

  //This function sets a localStorage item to the cities array so that each city is added to the search history.  It is called by searchClick function every time the Search button is clicked.
  function storeCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
  };

  //This function displays up to 8 buttons populated with each element in the previously searched cities array, displaying all previously searched cities in their own button.
  function displayButtons() {
    citiesDiv.innerHTML = "";
    if (cities == null) {
      return;
    }

    //Ensure there are no duplicates in the array...
    let singleCities = [...new Set(cities)];
    for (let i = 0; i < singleCities.length; i++) {
      let singleCityName = singleCities[i];
      let buttonEl = document.createElement("button");
      buttonEl.textContent = singleCityName;
      buttonEl.setAttribute("class", "listBtn");
      citiesDiv.appendChild(buttonEl);
      searchedClick();
    }
  };

  //This function is executed when the user clicks on a previously searched city button.
  function searchedClick() {
    $(".listBtn").on("click", function (event) {
      event.preventDefault();
      city = $(this).text().trim();
      callAPIs();
    });
  };

  //This function executes code when the Search button is selected, using input from the search bar.
  function searchClick() {
    $("#searchbtn").on("click", function (event) {
      event.preventDefault();
      city = $(this).prev().val().trim();
      //Add the newly input city to the cities array...
      cities.push(city);
      //Limit the length of the cities array to 8...
      if (cities.length > 8) {
        cities.shift();
      }
      if (city == "") {
        return;
      }
      callAPIs();
      storeCities();
      displayButtons();
    });
  };

  function callAPIs() {
    APIkey = "6c7d13d4888aa48d1e078ce5e79c0354";
    weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=imperial`;
    forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&units=imperial`;
    
    //Grab today's weather data with Ajax
    $.ajax({
      url: weatherUrl,
      method: "GET",
    }).then(function (response) {
      //Display today's weather data
      $("#city_name").text("Today's Weather in " + city + ":");
      $("#today_date").text("Date:  " + moment().format("dddd") + ", " + moment().format("MMMM Do YYYY"));
      $("#today_temp").text("Temp:  " + response.main.temp + "F");
      $("#today_feels_like").text("Feels Like:  " + response.main.feels_like + "F");
      $("#today_humidity").text("Humidity:  " + response.main.humidity + "%");
      $("#today_wind_speed").text("Wind Speed:  " + response.wind.speed + "mph");
      $("#today_icon_div").attr({src:"https://openweathermap.org/img/w/" + response.weather[0].icon + ".png",
      height: "75px",
      width: "75px",
    });
      console.log(response);
    });

    //Grab the 5-Day forecast data with Ajax
    $.ajax({
      url: forecastUrl,
      method: "GET",
    }).then(function (response) {
      let day_count = 0;
      
      for (let i = 0; i < response.list.length; i++) {

        //Grab data from 3pm for each of the five days
        if (response.list[i].dt_txt.split(" ")[1] == "15:00:00") {
          let day = response.list[i].dt_txt.split("-")[2].split(" ")[0];
          let month = response.list[i].dt_txt.split("-")[1];
          let year = response.list[i].dt_txt.split("-")[0];
          
          //Display the 5-Day forecast data 
          $("#" + day_count + "date").text(month + "/" + day + "/" + year);
          $("#" + day_count + "temp").text("Temp: " + response.list[i].main.temp + "F");
          $("#" + day_count + "humidity").text("Humidity: " + response.list[i].main.humidity + "%");
          $("#" + day_count + "icon").attr("src", 
          "https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
          day_count++;
        }
      }
    });
  };

});
