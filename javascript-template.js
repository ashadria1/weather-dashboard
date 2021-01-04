$(document).ready(function () {
  console.log("Hello world! The document is ready!");

  let APIkey = "";
  let city = "";
  let currenturl = "";
  let queryurl = "";
  let url = "";
  let cities = [];
  initialize();
  searchedClick();
  searchClick();

  //This function calls any cities added to the search history from local storage and populates the previously searched cities array.
  function initialize() {
    let saved_cities = JSON.parse(localStorage.getItem("cities"));
    if (saved_cities !== null) {
      cities = saved_cities;
    }
    showButtons();
  }

  //This function sets a localStorage item to the cities array so that each city is added to the search history.  It is called by searchClick function every time the Search button is clicked.
  function storeCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
  }

  //This function shows buttons populated with each element in the cities array, displaying all previously searched cities (up to 8).

  // */
  //add button for clearing past results?
  // if (saved_cities !== null) {
  //    saved_cities.empty();
  //  }
});
