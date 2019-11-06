const express = require('express');
const router = express.Router();
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
        console.log(await userData.addUser(formData.firstName, formData.lastName, formData.email, formData.password));
        // res.render('home', { title: 'SignedUp' });
        res.redirect('/');
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;