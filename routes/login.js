var bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const userData = require('../data/users');
const secMap = require('../security/table');

router.get('/', async (req, res) => {
    res.render('login', { title: 'Login' });
});

router.post('/', async (req, res) => {
    const formData = req.body;
    // console.log(formData);

    if (!formData.email || !formData.password) {
        res.status(400);
        return;
    }

    formData.email = formData.email.toLowerCase();

    try {
        let confirm = false;
        const user = await userData.getUserByEmail(formData.email);
        if (user) {
            confirm = await bcrypt.compare(formData.password, user.hashedPassword);
            if (confirm === true) {
                req.session.auth = {
                    email: user.email,
                    secret: await secMap.newCookie(user.email)
                };
                res.redirect('/home');
                return;
            }
        }
        res.send({ message: "The username and password combination is incorrect." });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;