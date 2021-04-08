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

function getCity(city) {
    var currentDate = moment().format("LL");
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=standard&appid=" + apiKey;

    $.ajax({url: queryURL, type: "GET"}).then(function (response){
        console.log(response);
        var iconLoc = response.weather[0].icon;
        
        var iconLink = "https://openweathermap.org/img/wn/" + iconLoc + "@2x.png";
        var iconImg = $("<img");
        iconImg.attr("src", iconLink);

        $(".currentCity").text(response.name + " (" + currentDate + ")");
        $(".currentCity").append(iconImg);
        $("#temp").text("Temperature: " + response.main.temp + " °C");
        $("humidity").text("Humidity: " + response.main.humidity + " %");
        $("#wind").text("Wind Speed: " + response.wind.speed + " KM/H")
        getUV(response.coord.lat, response.coord.lon);
        forecast(city);
        input.val("");
    });
}

function displayCities() {
    var limit;

    if (cities.length < 10) {
        limit = cities.length;
    } else {
        limit = 10;
    }
    $("#citySearch").html("");
    for (var c = 0; c < limit; c++) {
        var citySearch = $("<div");
        citySearch.addClass("row").css({
            textAlign: "center",
            border: "1px solid black",
            height: "50px",
            lineHeight: "50px",
            paddingLeft: "40px",
        });
        citySearch.html(cities[c]);
        $("#citySearch").prepend(citySearch);

        citySearch.attr("id", '${cities[c]}');
        $('#${cities[c]}').on("click", function () {
            getCity($(this).text());
        });
      }
    }

