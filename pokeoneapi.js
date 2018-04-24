const moment = require('moment')

console.log("API Loading...")
var express = require('express');
var app = express();
var fs = require('fs');
const sf = require('snekfetch');


var server = app.listen(80, listening);

function listening() {
    console.log("API Listening!")
};

//app.use(express.static('website'));
app.enable('trust proxy')
app.disable('case sensitive routing')

var RateLimit = require('express-rate-limit');
 
//app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)

var apiTimelimit = 15
var apiTotalCalls = 5
var limiter = new RateLimit({
  windowMs: apiTimelimit*60*1000, // 15 minutes
  max: apiTotalCalls, // limit each IP to 100 requests per windowMs
  delayMs: 0, // disable delaying - full speed until the max limit is reached
  message: `Max API Calls reached for this (${apiTimelimit} minutes) Window\nIf you need more then (${apiTotalCalls}/${apiTimelimit}min) Contact AussieGamer1994#2751 on discord`
});

 app.use(express.static("pics"))
//  apply to all requests
app.use('/public/', limiter);

app.use('/', banned);

function banned(request, response, next) {
    var ip = fs.readFileSync('./bans/ips.json')
    var bannedip = JSON.parse(ip);
    if (bannedip[request.ip]) {
    reply = {
     status: "403",
     issue: "IP Banned",
     reason: bannedip[request.ip].reason
    }
    response.send(reply)
    } else {
    next()
    }
};

app.get('/', homePage);

function homePage (request, response) {
    var reply;
    reply = {
        public: {
        time: "/public/time",
        events: "/public/timeevents",
        quests: "/public/quests/<search>",
        achievements: "/public/achivements/<search>",
        store: "/public/store/<search>",
        spawns: "/public/spawns/<search>",
        pokemon: "/public/pokemon/<search>",
        moves: "/public/moves/<search>",
        nature: "/public/nature/<search>",
        },
        private: {
            time: "/private/time?token=<token>",
            events: "/private/timeevents?token=<token>",
            quests: "/private/quests/<search>?token=<token>",
            achievements: "/private/achivements/<search>?token=<token>",
            store: "/private/store/<search>?token=<token>",
            spawns: "/private/spawns/<search>?token=<token>",
            pokemon: "/private/pokemon/<search>?token=<token>",
            moves: "/private/moves/<search>?token=<token>",
            nature: "/private/nature/<search>?token=<token>",
        }

    }
    response.send(reply)
}

app.use('/private/', token);

function token(request, response, next) {
    let tokens = fs.readFileSync('./tokens/tokens.json')
    let fulltokens = JSON.parse(tokens);
    var checkToke = request.query.token
    if (!checkToke) {
        response.send("Token Required")
    }
    if (!fulltokens[checkToke]) {
        response.send("Invalid Token")
    } else {
        next()
    }
};

app.get('/public/', sendPublic)
function sendPublic(request, response) {

    var reply = {
        calls: "2 every 15mins {This API is in ALPHA the API Limit will be raised in future}",
        time: "/public/time",
        events: "/public/timeevents",
        pokemon: "/public/pokemon/<search>",
        moves: "/public/moves/<search>",
        quests: "/public/quests/<search>",
        achievements: "/public/achivements/<search>",
        store: "/public/store/<search>",
        spawns: "/public/spawns/<search>",
        nature: "/public/nature/<search>",
        limit: request.rateLimit
    }
    
    response.send(reply)
};


//Server Time {Requires Official API Access}
const time = {
    time: "",
    lastUpdate: null
};

app.get('/public/time', function (request, response) {
    response.send(time)
});

app.get('/private/time', function (request, response) {
    response.send(time)
});


setInterval(function () {
    if (new Date().getSeconds() < 10) {
        seconds = `0${new Date().getSeconds()}`
    } else {
        seconds = new Date().getSeconds()
    }
    if (new Date().getMinutes() < 10) {
        minutes = `0${new Date().getMinutes()}`
    } else {
        minutes = new Date().getMinutes()
    }
    time.lastUpdate = `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()} || ${new Date().getHours()}:${minutes}:${seconds}`

}, 5000);


//Pokemon
app.get('/public/pokemon/:poke?', sendPokemon);

app.get('/private/pokemon/:poke?', sendPokemon);

function sendPokemon (request, response) {
    var check = fs.existsSync(`./data/pokemon/${request.params.poke.toLowerCase()}.json`)
    if (check == true) {
    var mons = fs.readFileSync(`./data/pokemon/${request.params.poke.toLowerCase()}.json`)
    var pokesinfo = JSON.parse(mons);
    var pokeData = request.params.poke;
    var reply;

    if (pokesinfo) {
    reply = {
    status : "200",
    poke: pokeData,
    info: pokesinfo
    }
    } else {
    reply = {
        status: "404",
        poke: pokeData,
        info: "Not Found"
    };
    }
   
    } else {
    reply = {
        status: 404,
        info: "Not Found"
    }
    }
    response.send(reply)
};

//Moves
app.get('/public/moves/:move?', sendMoves);
app.get('/private/moves/:move?', sendMoves);

function sendMoves(request, response) {
    var check = fs.existsSync(`./data/moves/${request.params.move.toLowerCase()}.json`)
    if (check == true) {
    var mons = fs.readFileSync(`./data/moves/${request.params.move.toLowerCase()}.json`)
    var pokesinfo = JSON.parse(mons);
    var pokeData = request.params.move;
    var reply;

    if (pokesinfo) {
    reply = {
    status : "200",
    move: pokeData,
    info: pokesinfo
    }
    } else {
    reply = {
        status: "404",
        move: pokeData,
        info: "Not Found"
    };
    }
    } else {
        reply = {
            status: 404,
            info: "Not Found"
        }
    }
    response.send(reply)
}

//quests
app.get('/public/quests/:search?', sendp1quests);
app.get('/private/quests/:search?', sendp1quests);

function sendp1quests(request, response) {
    var p1quests = fs.readFileSync('./data/ingame/quests.json')
    var p1questsinfo = JSON.parse(p1quests);
    var p1questsData = request.params.search;
    var reply;

    if (p1questsinfo[p1questsData]) {
    reply = {
    status : "200",
    search: p1questsData,
    data: p1questsinfo[p1questsData]
    }
    } else {
    reply = {
        status: "404",
        search: p1questsData,
        info: "Not Found"
    };
    }

    response.send(reply)
}

//Timed Events
//Talk to Mattees for all main times events day/hour

app.get('/public/timeevents', sendTimeEvents);
app.get('/private/timeevents', sendTimeEvents);

function sendTimeEvents (request, response) {

    var reply;
    var now = moment()
    
    if(moment().weekday() == 1 || moment().weekday() == 4 || moment().weekday() == 6) {
    var bugtime = "Now"
    } else {
        if(moment().weekday() == 2 || moment().weekday() == 3) {
            var bugtime = now.to(moment().weekday(4).hour(10))
        } else
        if(moment().weekday() == 5) {
            var bugtime = now.to(moment().weekday(6).hour(10))
        } else
        if (moment().weekday() == 0) {
            var bugtime = now.to(moment().weekday(1).hour(10))
        }

    }

    if(moment().weekday() == 2 || moment().weekday() == 4 || moment().weekday() == 6) {
        var olivine = "Now"
        } else {
            if(moment().weekday() == 3) {
                var olivine = now.to(moment().weekday(4).hour(10))
            } else
            if(moment().weekday() == 5) {
                var olivine = now.to(moment().weekday(6).hour(10))
            } else
            if (moment().weekday() == 7 || moment().weekday() == 0 || moment().weekday() == 1) {
                var olivine = now.to(moment().weekday(2).hour(10))
            }
    
        }

        if(moment().weekday() == 1 || moment().weekday() == 3 || moment().weekday() == 5) {
            var vermilion = "Now"
            } else {
                if(moment().weekday() == 2) {
                    var vermilion = now.to(moment().weekday(3).hour(10))
                } else
                if(moment().weekday() == 4) {
                    var vermilion = now.to(moment().weekday(5).hour(10))
                } else
                if (moment().weekday() == 6 || moment().weekday() == 7 || moment().weekday() == 0) {
                    var vermilion = now.to(moment().weekday(1).hour(10))
                }
        
            }

            if(moment().weekday() == 5) {
                var lap = "Now"
                } else {
                var lap = now.to(moment().weekday(5).hour(10))
            
                }

                if(moment().weekday() == 3) {
                    var rage = "Now"
                    } else {
                    var rage = now.to(moment().weekday(3).hour(10))
                
                    }

    var now = moment()
    var reset = moment().day(moment().weekday() + 1).hour(10)
    //console.log(now.to(reset))

    reply = {
        reset: now.to(reset),
        bug: bugtime,
        toOlivine: olivine,
        toVermilion: vermilion,
        lapras: lap,
        lakeRage: rage

    }

    response.send(reply)

}

//Achivements

app.get('/public/achivements/:search?', sendAchivements);
app.get('/private/achivements/:search?', sendAchivements);

function sendAchivements (request, response) {

    var p1achivements = fs.readFileSync('./data/ingame/achievements.json')
    var p1achivementsinfo = JSON.parse(p1achivements);
    var p1achivementsdata = request.params.search;
    var reply;

    if (p1achivementsinfo[p1achivementsdata]) {
    reply = {
    status : "200",
    search: p1achivementsdata,
    data: p1achivementsinfo[p1achivementsdata]
    }
    } else {
    reply = {
        status: "404",
        search: p1achivementsdata,
        info: "Not Found"
    };
    }

    response.send(reply)
}

//Store

app.get('/public/store/:search?', sendStore);
app.get('/private/store/:search?', sendStore);

function sendStore (request, response) {

    var p1store = fs.readFileSync('./data/ingame/store.json')
    var p1storeinfo = JSON.parse(p1store);
    var p1storedata = request.params.search;
    var reply;

    if (p1storeinfo[p1storedata]) {
    reply = {
    status : "200",
    search: p1storedata,
    data: p1storeinfo[p1storedata]
    }
    } else {
    reply = {
        status: "404",
        search: p1storedata,
        info: "Not Found"
    };
    }

    response.send(reply)
}

//Player Data {No Access}

//Spawns

app.get('/public/spawns/:search?', sendSpawn);
app.get('/private/spawns/:search?', sendSpawn);

function sendSpawn (request, response) {

    var spawns = fs.readFileSync('./data/ingame/spawns.json')
    var spawnsinfo = JSON.parse(spawns);
    var spawnsdata = request.params.search;
    var reply;

    if (spawnsinfo[spawnsdata]) {
    reply = {
    status : "200",
    search: spawnsdata,
    data: spawnsinfo[spawnsdata]
    }
    } else {
    reply = {
        status: "404",
        search: spawnsdata,
        info: "Not Found"
    };
    }

    response.send(reply)
}

//Items

//Nature

app.get('/public/nature/:search?', sendNature);
app.get('/private/nature/:search?', sendNature);

function sendNature (request, response) {

    var nature = fs.readFileSync('./data/nature/nature.json')
    var natureinfo = JSON.parse(nature);
    var naturedata = request.params.search;
    var reply;

    if (natureinfo[naturedata]) {
    reply = {
    status : "200",
    search: naturedata,
    data: natureinfo[naturedata]
    }
    } else {
    reply = {
        status: "404",
        search: naturedata,
        info: "Not Found"
    };
    }

    response.send(reply)
}

//Abiliies

app.get('/public/ability/:search?', sendAbility);
app.get('/private/ability/:search?', sendAbility);

function sendAbility(request, response) {
    var ability = fs.readFileSync('./data/abilities/ability.json')
    var abilityinfo = JSON.parse(ability);
    var abilityData = request.params.search;
    var reply;

    if (abilityinfo[abilityData]) {
    reply = {
    status : "200",
    ability: abilityData,
    info: abilityinfo[abilityData]
    }
    } else {
    reply = {
        status: "404",
        ability: abilityData,
        info: "Not Found"
    };
    }

    response.send(reply)
}


//Raids