const express = require('express')
const router = new express.Router()

router.get("/", (req, res) => {
    res.render('login');
});

router.get("/dashboard", (req, res) => {
    res.render('dashboard');
});

router.get("/game", (req, res) => {
    res.render('game');
});

module.exports = router