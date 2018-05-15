//Start Loading
console.log("API Loading...")
// End Loading

//Packages && Main Const/Vars
const moment = require('moment')
var express = require('express');
var app = express();
var fs = require('fs');
const sf = require('snekfetch');
var server = app.listen(80, listening);
var RateLimit = require('express-rate-limit');
const userfunc = require("./util/userfunc.js")
const logger = require("./util/logger.js")
const dsearch = require("./util/datasearch.js")
const sql = require("sqlite");
sql.open("./accounts.sqlite3");

//API Listening
function listening() {
    console.log("API Listening!")
};

//Home/Ratelimit/Bans/Tokens
app.use('/pokemon', express.static("pics"));
app.use('/home', express.static("website"));
app.enable('trust proxy')
app.disable('case sensitive routing') 

var apiTimelimit = 15
var apiTotalCalls = 5
var limiter = new RateLimit({
  windowMs: apiTimelimit*60*1000, // 15 minutes
  max: apiTotalCalls, // limit each IP to 100 requests per windowMs
  delayMs: 0, // disable delaying - full speed until the max limit is reached
  message: `Max API Calls reached for this (${apiTimelimit} minutes) Window\nIf you need more then (${apiTotalCalls}/${apiTimelimit}min) Contact AussieGamer1994#2751 on discord`
});

//  Public - Private - Bans
app.use('/public/', limiter);

//app.use('/', userfunc.banned);


//Token Checker
app.use('/private/', userfunc.tokenCheck);

//Logger
app.use('/private/', logger.privateLogger);
app.use('/public/', logger.publicLogger);

//Account Data
app.get("/account/token", userfunc.userToken);

//Searches {Public}
app.get("/public/pokemon/:search?", dsearch.pokemon);
app.get("/public/items/:search?", dsearch.items);
app.get("/public/moves/:search?", dsearch.moves);
app.get("/public/store/:search?", dsearch.store);
app.get("/public/achievements/:search?", dsearch.achievements);
app.get("/public/spawns/:search?", dsearch.spawns);
app.get("/public/nature/:search?", dsearch.nature);
app.get("/public/ability/:search?", dsearch.abilities);
//app.get("/public/raids/:search?", dsearch.raids);
app.get("/public/timeEvents", dsearch.timeEvents);
app.get("/public/quests/:search?", dsearch.quests);
app.get("/public/guilds/:search?", dsearch.guilds);
app.get("/public/location/:search?", dsearch.locations);
app.get("/public/types/:search?", dsearch.types);

//Searches {Private}
app.get("/private/pokemon/:search?", dsearch.pokemon);
app.get("/private/items/:search?", dsearch.items);
app.get("/private/moves/:search?", dsearch.moves);
app.get("/private/store/:search?", dsearch.store);
app.get("/private/achievements/:search?", dsearch.achievements);
app.get("/private/spawns/:search?", dsearch.spawns);
app.get("/private/nature/:search?", dsearch.nature);
app.get("/private/ability/:search?", dsearch.abilities);
//app.get("/private/raids/:search?", dsearch.raids);
app.get("/private/timeEvents", dsearch.timeEvents);
app.get("/private/quests/:search?", dsearch.quests);
app.get("/private/guilds/:search?", dsearch.guilds);
app.get("/private/location/:search?", dsearch.locations);
app.get("/private/types/:search?", dsearch.types);

//app.post("/account/ban/:search?", )
//app.post("/account/unban/:search?", )
//app.post("/account/make/:search?", )