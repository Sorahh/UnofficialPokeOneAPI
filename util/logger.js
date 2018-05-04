const express = require('express');
const fs = require("fs")
const moment = require("moment")
const sql = require("sqlite");

module.exports = {
    privateLogger: function(request, response, next) {
        if (!request.query.token) return;
        if (request.query.token === "null") return; 
        sql.get(`SELECT * FROM users WHERE token ="${request.query.token}"`).then(row => {
            if (!row) {
                response.send("Invalid Token")
            } else {
                console.log(`[${moment().format('DD/MM/YYYY HH:mm:ss')}] -=- ${request.ip} -=- ${row.username}`)

                next()
                }
            })
    },
    publicLogger: function(request, response, next) {
        console.log(`[${moment().format('DD/MM/YYYY HH:mm:ss')}] -=- ${request.ip}`)
        next()
    }
}