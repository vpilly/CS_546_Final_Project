var bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const secMap = require('../security/table');
const data = require('../data');
const userData = data.users;

router.get('/', async (req, res) => {
    if (req.session.auth) {
        res.redirect('/');
        return;
    }
    res.render('login/login', { title: 'Login' });
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
                const sec = await secMap.newCookie(user.email);
                req.session.auth = {
                    email: user.email,
                    secret: sec
                };
                res.redirect('/');
                return;
            }
        }
        res.render('login/login', {
            title: 'Login',
            errors: ["Invalid username or password"],
            hasErrors: true
        });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;