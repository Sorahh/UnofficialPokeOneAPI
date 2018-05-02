const express = require('express');
const fs = require("fs")
const moment = require("moment")

module.exports = {
    userToken: function(request, response) {
        let tokens = fs.readFileSync('./tokens/token.json')
        let fulltokens = JSON.parse(tokens);
        var findusername = request.query.username
        var findpassword = request.query.password

        var reply;

        if (fulltokens[findusername]) {
            if (fulltokens[findusername].password == findpassword) {
                reply = {
                    token: fulltokens[findusername].token
                }
            } else {
                reply = {
                    Error: "Password does not match"
                }
            }
        } else {
            reply = {
                Error: "That user is not in our Database"
            }
        }

        response.send(reply)
    },
    tokenCheck: function(request, response, next) {
        let tokens = fs.readFileSync('./tokens/users.json')
        let fulltokens = JSON.parse(tokens);
        var checkToke = request.query.token
        var reply;
        if (!checkToke) {
            response.send("Token Required")
        }
        if (!fulltokens[checkToke]) {
            response.send("Invalid Token")
        } else {
            next()
        }
    },
    banned: function(request, response, next) {
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
    }
}