const express = require('express');
const fs = require("fs")
const moment = require("moment")

module.exports = {
    privateLogger: function(request, response, next) {
        let searchUser = fs.readFileSync('./tokens/users.json')
        let user = JSON.parse(searchUser);
        var token = request.query.token

        if (!token) return;

        console.log(`[${moment().format('DD/MM/YYYY HH:mm:ss')}] -=- ${request.ip} -=- ${user[token]}`)
        next()
    },
    publicLogger: function(request, response, next) {
        console.log(`[${moment().format('DD/MM/YYYY HH:mm:ss')}] -=- ${request.ip}`)
        next()
    }
}