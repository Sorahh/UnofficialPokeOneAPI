const express = require('express');
const fs = require("fs")
const moment = require("moment")

module.exports = {
    pokemon: function(request, response) {
        var reply;
        if(!request.params.search) {
            reply = {
                status: "400",
                error: "Bad Request"
            }
            return response.send(reply);
        }
        var check = fs.existsSync(`./data/pokemon/${request.params.search.toLowerCase()}.json`)
        if (check == true) {
        var mons = fs.readFileSync(`./data/pokemon/${request.params.search.toLowerCase()}.json`)
        var pokesinfo = JSON.parse(mons);
        var pokeData = request.params.search;
        
    
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
    },
    items: function(request, response) {

    },
    moves: function(request, response) {
        var reply;
        if(!request.params.search) {
            reply = {
                status: "400",
                error: "Bad Request"
            }
            return response.send(reply);
        }
        var check = fs.existsSync(`./data/moves/${request.params.search.toLowerCase()}.json`)
        if (check == true) {
        var mons = fs.readFileSync(`./data/moves/${request.params.search.toLowerCase()}.json`)
        var pokesinfo = JSON.parse(mons);
        var pokeData = request.params.move;

    
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
    },
    store: function(request, response) {
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
    },
    achievements: function(request, response) {
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
    },
    spawns: function(request, response) {
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
    },
    nature: function(request, response) {
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
    },
    abilities: function(request, response) {
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
    },
    raids: function(request, response) {

    },
    timeEvents: function(request, response) {
        var reply;
        var reset;
        var bugContest;
        var LakeofRage;
        var laprasEvent;
        var toOlivine;
        var toVermilion;
        var moomoo;
        var mtmoon;
        var today;

        //Reset
        if (moment().hour() == "10" && moment().minute() == "03") {
            reset = "Now"
        } else {
            reset = moment().hour(10).minute(03).fromNow() 
        }

        if (moment().day() == "0") {
            if (moment().hour() < "10") {
                bugContest = "Now"
                LakeofRage = moment().day(3).hour(10).minute(03).fromNow()
                laprasEvent = moment().day(5).hour(10).minute(03).fromNow()
                toOlivine = "Now"
                toVermilion = moment().day(1).hour(10).minute(03).fromNow()
                moomoo = moment().day(0).hour(10).minute(03).fromNow()
                today = "Saturday"
        
            } else {
                bugContest = moment().day(1).hour(10).minute(03).fromNow()
                LakeofRage = moment().day(3).hour(10).minute(03).fromNow()
                laprasEvent = moment().day(5).hour(10).minute(03).fromNow()
                toOlivine = moment().day(2).hour(10).minute(03).fromNow()
                toVermilion = moment().day(1).hour(10).minute(03).fromNow()
                moomoo = "Now"
                today = "Sunday"
        
            }
        } else
        if (moment().day() == "1") {
            if (moment().hour() < "10") {
                bugContest = moment().day(1).hour(10).minute(03).fromNow()
                LakeofRage = moment().day(3).hour(10).minute(03).fromNow()
                laprasEvent = moment().day(5).hour(10).minute(03).fromNow()
                toOlivine = moment().day(2).hour(10).minute(03).fromNow()
                toVermilion = moment().day(1).hour(10).minute(03).fromNow()
                moomoo = "Now"
                today = "Sunday"
                
            } else {
                bugContest = "Now"
                LakeofRage = moment().day(3).hour(10).minute(03).fromNow()
                laprasEvent = moment().day(5).hour(10).minute(03).fromNow()
                toOlivine = moment().day(2).hour(10).minute(03).fromNow()
                moomoo = moment().day(3).hour(10).minute(03).fromNow()
                toVermilion = "Now"
                today = "Monday"
        
            }
        } else
        if (moment().day() == "2") {
            if (moment().hour() < "10") {
                bugContest = "Now"
                LakeofRage = moment().day(3).hour(10).minute(03).fromNow()
                laprasEvent = moment().day(5).hour(10).minute(03).fromNow()
                toOlivine = moment().day(2).hour(10).minute(03).fromNow()
                toVermilion = "Now"
                moomoo = moment().day(3).hour(10).minute(03).fromNow()
                today = "Monday"
        
            } else {
                bugContest = moment().day(4).hour(10).minute(03).fromNow()
                LakeofRage = moment().day(3).hour(10).minute(03).fromNow()
                laprasEvent = moment().day(5).hour(10).minute(03).fromNow()
                toOlivine = "Now"
                toVermilion = moment().day(3).hour(10).minute(03).fromNow()
                moomoo = moment().day(3).hour(10).minute(03).fromNow()
                today = "Tuesday"
        
            }
        } else
        if (moment().day() == "3") {
            if (moment().hour() < "10") {
                bugContest = moment().day(4).hour(10).minute(03).fromNow()
                LakeofRage = moment().day(3).hour(10).minute(03).fromNow()
                laprasEvent = moment().day(5).hour(10).minute(03).fromNow()
                toOlivine = "Now"
                toVermilion = moment().day(3).hour(10).minute(03).fromNow()
                moomoo = moment().day(3).hour(10).minute(03).fromNow()
                today = "Tuesday"
        
            } else {
                bugContest = moment().day(4).hour(10).minute(03).fromNow()
                LakeofRage = "Now"
                laprasEvent = moment().day(5).hour(10).minute(03).fromNow()
                toOlivine = moment().day(4).hour(10).minute(03).fromNow()
                toVermilion = "Now"
                moomoo = "Now"
                today = "Wednesday"
        
            }
        } else
        if (moment().day() == "4") {
            if (moment().hour() < "10") {
                bugContest = moment().day(4).hour(10).minute(03).fromNow()
                LakeofRage = "Now"
                laprasEvent = moment().day(5).hour(10).minute(03).fromNow()
                toOlivine = moment().day(4).hour(10).minute(03).fromNow()
                toVermilion = "Now"
                moomoo = "Now"
                today = "Wednesday"
        
            } else {
                bugContest = "Now"
                LakeofRage = moment().day(3).hour(10).minute(03).fromNow()
                laprasEvent = moment().day(5).hour(10).minute(03).fromNow()
                toOlivine = "Now"
                toVermilion = moment().day(5).hour(10).minute(03).fromNow()
                moomoo = moment().day(0).hour(10).minute(03).fromNow()
                today = "Thursday"
        
            }
        } else
        if (moment().day() == "5") {
            if (moment().hour() < "10") {
                bugContest = "Now"
                LakeofRage = moment().day(3).hour(10).minute(03).fromNow()
                laprasEvent = moment().day(5).hour(10).minute(03).fromNow()
                toOlivine = "Now"
                toVermilion = moment().day(5).hour(10).minute(03).fromNow()
                moomoo = moment().day(0).hour(10).minute(03).fromNow()
                today = "Thursday"
        
            } else {
                bugContest = moment().day(6).hour(10).minute(03).fromNow()
                LakeofRage = moment().day(3).hour(10).minute(03).fromNow()
                laprasEvent = "Now"
                toOlivine = moment().day(6).hour(10).minute(03).fromNow()
                toVermilion = "Now"
                moomoo = moment().day(0).hour(10).minute(03).fromNow()
                today = "Friday"
        
            }
        } else
        if (moment().day() == "6") {
            if (moment().hour() < "10") {
                bugContest = moment().day(6).hour(10).minute(03).fromNow()
                LakeofRage = moment().day(3).hour(10).minute(03).fromNow()
                laprasEvent = "Now"
                toOlivine = moment().day(6).hour(10).minute(03).fromNow()
                toVermilion = "Now"
                moomoo = moment().day(0).hour(10).minute(03).fromNow()
                today = "Friday"
        
            } else {
                bugContest = "Now"
                LakeofRage = moment().day(3).hour(10).minute(03).fromNow()
                laprasEvent = moment().day(5).hour(10).minute(03).fromNow()
                toOlivine = "Now"
                toVermilion = moment().day(1).hour(10).minute(03).fromNow()
                moomoo = moment().day(0).hour(10).minute(03).fromNow()
                today = "Saturday"
        
            }
        }

        reply = {
            dailyReset: reset, 
            bug: bugContest,
            rage: LakeofRage,
            unioncaveb2f: laprasEvent,
            olivine: toOlivine,
            vermilion: toVermilion,
            moomoofarm: moomoo,
            day: today
        };
        response.send(reply)

    },
    quests: function(request, response) {
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
    },
    guilds: function(request, response) {
        var guilds = fs.readFileSync('./data/ingame/guilds.json')
        var guildsinfo = JSON.parse(guilds);
        var guildsData = request.params.search;
        var reply;
    
        if (guildsinfo[guildsData]) {
        reply = {
        status : "200",
        search: guildsData,
        data: guildsinfo[guildsData]
        }
        } else {
        reply = {
            status: "404",
            search: guildsData,
            info: "Not Found"
        };
        }
    
        response.send(reply)
    }
}