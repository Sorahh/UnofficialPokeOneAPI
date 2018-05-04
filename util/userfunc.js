const express = require('express');
const fs = require("fs")
const moment = require("moment")
const sql = require("sqlite");


module.exports = {
    userToken: function(request, response) {
        var findusername = request.query.username
        var findpassword = request.query.password

        var reply;

        if (!request.query.username) return;
        if (!request.query.password) return;
        if (request.query.token === "null") {
            return response.send("Invalid Token")
        } 
        sql.get(`SELECT * FROM users WHERE username ="${findusername}"`).then(row => {
            if (!row) {
                response.send("User Does not Exist")
            } else {
                if (findpassword !== row.password) {
                    response.send("Incorrect Password")
                } else {
                    reply = {
                        User: row.username,
                        Token: row.token
                    }
                    response.send(reply)
                }
            }
        })

        
    },
    tokenCheck: function(request, response, next) {
        if (!request.query.token) return;
        if (request.query.token === "null") {
            return response.send("Invalid Token")
        } 
        sql.get(`SELECT * FROM users WHERE token ="${request.query.token}"`).then(row => {
            if (!row) {
                response.send("Invalid Token")
            } else {
                next()
                }
            })

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