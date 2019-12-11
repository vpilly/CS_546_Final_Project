const express = require('express');
const router = express.Router();
const secMap = require('../security/table');

router.get('/', async (req, res) => {
    if (req.session.auth) {
        const confirm = await secMap.deleteCookie(req.session.auth.email, req.session.auth.secret);
        if (confirm) req.session.destroy();
    }
    res.redirect('/login');
});


module.exports = router;