var bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const userData = require('../data/users');

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

    try {
        const user = await userData.getUserByEmail(formData.email);
        bcrypt.compare(formData.password, user.hashedPassword, function (err, res) {
            if (!res) {
                return response.status(400).send({ message: "The password is invalid" });
            }
        });

        res.send({ message: "The username and password combination is correct!" });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;