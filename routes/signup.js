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

    const errors = [];

    if (!formData.firstName) errors.push("No first name provided")

    if (!formData.lastName) errors.push("No last name provided")

    if (!formData.email) errors.push("No email provided")

    if (!formData.password) errors.push("No password provided")


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
        await userData.getUserByEmail(formData.email);

        errors.push("Email has already been used before to create an account");
        res.render('signup', {
            title: 'Signup',
            errors: errors,
            hasErrors: true
        });
        return;
    } catch (e) {
        const expected = `Error: function getUserByEmail() could not find a user with the email: ${formData.email}`;
        if (e !== expected) {
            res.status(500).json({ error: e });
            return;
        }
    }


    try {
        const hash = await bcrypt.hash(formData.password, saltRounds);
        await userData.addUser(formData.firstName, formData.lastName, formData.email, hash);
        res.redirect('/');
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;