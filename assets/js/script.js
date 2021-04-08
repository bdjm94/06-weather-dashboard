const apiKey = "c0cf459a2bff2fae858ca10b8d35d9cc";
var cities = [];
cities.reverse();

function loadCities() {
    cities = JSON.parse(localStorage.getItem("cities")) || [];
}

$(document).ready(function () {
    loadCities();
    if (cities[0]) {
        getCity(cities[cities.length - 1]);
    }
} )

function saveCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
}

displayCities();
$(".btn").on("click", function (event) {
    event.preventDefault();

    var input = $(".form-control");
    var city = input.val();
    if (!cities.includes(city)) {
        cities.push(city);
        saveCities();
    }
    displayCities();
    getCity();
});
