const express = require('express');
const router = express.Router();
const concertData = require('../data/concerts');

router.get('/', async (req, res) => {
    res.render("layouts/concertSearch");
});