$(document).ready(function () {
  console.log("Hello world! The document is ready!");

  let APIkey = "";
  let city = "";
  let currenturl = "";
  let queryurl = "";
  let url = "";
  let cities = [];
  let citiesDiv = document.getElementById(
    "previously_searched_cities_container"
  );
  initialize();
  searchedClick();
  searchClick();

  //This function calls any cities added to the search history from local storage and populates the previously searched cities array.
  function initialize() {
    let saved_cities = JSON.parse(localStorage.getItem("cities"));
    if (saved_cities !== null) {
      cities = saved_cities;
    }
    displayButtons();
  }

  //This function sets a localStorage item to the cities array so that each city is added to the search history.  It is called by searchClick function every time the Search button is clicked.
  function storeCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
  }

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
  }

  //This function is executed when the user clicks on a previously searched city button.
  function searchedClick() {
    $(".listBtn").on("click", function (event) {
      event.preventDefault();
      city = $(this).text().trim();
      callAPIs();
    });
  }

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
      callAPIs();
      storeCities();
      displayButtons();
    });
  }

  function callAPIs() {
    APIkey = "6c7d13d4888aa48d1e078ce5e79c0354";
    weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=imperial`;
    forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&units=imperial`;

    $.ajax({
      url:  weatherUrl,
      method: "GET",
    }).then(function (response) {
      $("#today_temp").text(response.main.temp); 
      $("#today_humidity").text(response.main.humidity); 
      console.log(response);
    })

    

  }
  // */
  //add button for clearing past results?
  // if (saved_cities !== null) {
  //    saved_cities.empty();
  //  }
});
