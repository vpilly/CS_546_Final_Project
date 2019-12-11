const express = require('express');
const router = express.Router();
const artistData = require('../data/artists');

router.get('/', async (req, res) => {
    res.render("artists/artistSearch");
});

router.get('/details/:id', async (req, res) => {
    try {
        const artist = await artistData.getArtistByID(req.params.id);
        res.render('artists/detailedArtist', { artist: artist });
    } catch (e) {
        res
            .status(500)
            .json({ error: e });
    }
});

router.post('/', async (req, res) => {
    let artData = req.body;
    let errors = [];

    if (!artData.artistName || artData.artistName.length === 0) {
        errors.push('No artist name provided');
    }

    if (typeof (artData.artistName) != "string") {
        errors.push('Input provided is of invalid type, must be a string.');
    }

    if (errors.length > 0) {
        res
            .status(400)
            .render('artists/artistSearch', {
                errors: errors,
                hasErrors: true,
                artistData: artData
            });
        return;
    }

    try {
        const artists = await artistData.searchArtists(artData.artistName);
        res.render("artists/artistSearchResults", {
            artists: artists,
            artistName: artData.artistName
        });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;