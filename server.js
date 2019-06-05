var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var exphbs = require("express-handlebars");

var apiRoutes = require("./routes/api-routes/api-routes");
var hbRoutes = require("./routes/index");

var PORT = 3000;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

var app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(apiRoutes);
app.use(hbRoutes);

mongoose.connect("mongodb://localhost/mongoScraper", { useNewUrlParser: true });
mongoose.connect(MONGODB_URI);

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});

