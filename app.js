const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");


app.set("views", "views");
app.set("view engine", "ejs");
var bodyParser = require("body-parser");
app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const router = require("./router");
app.use(express.static("public"));
app.use(express.json());
app.use("/", router);
const server = require("http").createServer(app);

module.exports = server;
