const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const saltRounds = 10;
const secMap = require('../security/table');
const data = require('../data');
const userData = data.users;

//https://stackoverflow.com/questions/5778020/check-whether-an-input-string-contains-a-number-in-javascript
function hasNumber(s) {
    return /\d/.test(s);
}

function noUppercase(s) {
    return s == s.toLowerCase();
}

//https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

router.get('/', async (req, res) => {
    if (req.session.auth) {
        res.redirect('/');
        return;
    }
    res.render('login/signup', { title: 'Signup' });
});

router.post('/', async (req, res) => {
    const formData = req.body;
    // console.log(formData);

    const errors = [];

    if (!formData.firstName) errors.push("No first name provided")

    if (!formData.lastName) errors.push("No last name provided")

    if (!formData.email) errors.push("No email provided")

    if (!formData.password) errors.push("No password provided")

    if (typeof (formData.firstName) !== 'string') {
        res.status(400).json({ error: "Invalid Json" });
        return;
    }
    if (typeof (formData.lastName) !== 'string') {
        res.status(400).json({ error: "Invalid Json" });
        return;
    }
    if (typeof (formData.email) !== 'string') {
        res.status(400).json({ error: "Invalid Json" });
        return;
    }
    if (typeof (formData.password) !== 'string') {
        res.status(400).json({ error: "Invalid Json" });
        return;
    }

    if (!validateEmail(formData.email)) {
        // console.log('validateEmail');
        res.status(400).json({ error: "Invalid Json" });
        return;
    }
    if (formData.password.length < 7) {
        // console.log('length');
        res.status(400).json({ error: "Invalid Json" });
        return;
    }
    if (noUppercase(formData.password)) {
        // console.log('case');
        res.status(400).json({ error: "Invalid Json" });
        return;
    }
    if (!hasNumber(formData.password)) {
        // console.log('number');
        res.status(400).json({ error: "Invalid Json" });
        return;
    }


    if (errors.length > 0) {
        res.render('signup', {
            title: 'Signup',
            errors: errors,
            hasErrors: true
        });
        return;
    }

    formData.email = formData.email.toLowerCase();

    try {
        const checkEmail = await userData.getUserByEmail(formData.email);
        if (checkEmail) {
            errors.push("Email has already been used before to create an account");
            res.render('signup', {
                title: 'Signup',
                errors: errors,
                hasErrors: true
            });
            return;
        }
    } catch (e) {
        res.status(500).json({ error: e });
        return;
    }


    try {
        const hash = await bcrypt.hash(formData.password, saltRounds);
        await userData.addUser(formData.firstName, formData.lastName, formData.email, hash);
        const sec = await secMap.newCookie(formData.email);
        req.session.auth = {
            email: formData.email,
            secret: sec
        };
        res.redirect('/');
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

// for ajax
router.post('/email', async (req, res) => {
    const formData = req.body;
    if (!formData.email) errors.push("No email provided")

    formData.email = formData.email.toLowerCase();

    try {
        const checkEmail = await userData.getUserByEmail(formData.email);
        if (checkEmail) {
            res.json({ ok: false });
            return;
        }
    } catch (e) {
        res.status(500).json({ ok: false, error: e });
        return;
    }

    res.json({ ok: true });
});

module.exports = router;