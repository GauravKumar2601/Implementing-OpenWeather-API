const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "2e9128aab61b618258fdc4ba99fd49ec";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<p>The weather is currently " + description + "</p>");
      res.write("<h1>The temperature in " + query + " is " + temp + "</h1>");
      res.write("<img src='" + imageURL + "'></img>");
      res.send();
    });
  });
});

app.listen(3001, function () {
  console.log("Server running at port 3001.");
});
