const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const saltRounds = 10;
const userData = require('../data/users');

router.get('/', async (req, res) => {
    res.render('signup', { title: 'Signup' });
});

router.post('/', async (req, res) => {
    const formData = req.body;
    // console.log(formData);

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        res.status(400);
        return;
    }

    try {
        bcrypt.hash(formData.password, saltRounds, async function (err, hash) {
            await userData.addUser(formData.firstName, formData.lastName, formData.email, hash);
            res.redirect('/');
        });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;