const express = require('express');
const router = express.Router();
const secMap = require('../security/table');

router.get('/', async (req, res) => {
    if (req.session.auth) {
        try {
            const confirm = await secMap.deleteCookie(req.session.auth.id, req.session.auth.secret);
            if (confirm) {
                req.session.destroy();
            }
        } catch (error) {
            req.session.destroy();
        }
    }
    res.redirect('/login');
});


module.exports = router;