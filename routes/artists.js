const express = require('express');
const router = express.Router();
const artistData = require('../data/artists');
const userData = require('../data/users');

router.get('/', async (req, res) => {
    res.render("artists/artistSearch", { title: "Artists" });
});

router.get('/details/:id/:liked', async (req, res) => {
    try {
        const email = req.session.auth.email;
        const user = await userData.getUserByEmail(email);
        const user_id = user._id.toHexString();
        const artist = await artistData.getArtistByID(req.params.id);
        const artist_id = artist._id.toHexString();

        let likeFlag = req.params.liked;
        
        if(likeFlag == "yes") {
            await userData.removeFavArtist(user_id, artist_id);
        } else {
            await userData.addFavArtist(user_id, artist_id);
        }

        const test = await userData.getUserByEmail(email);

        res.redirect('/artists/details/' + req.params.id);
    } catch (e) {
        res
            .status(500)
            .json({ error: e });
    }
});

router.get('/details/:id', async (req, res) => {
    try {
        const email = req.session.auth.email;
        const user = await userData.getUserByEmail(email);
        const artist = await artistData.getArtistByID(req.params.id);
        const artist_id = artist._id.toHexString();

        const likes = user.profile.favoriteArtists;
        let likeFlag = false;
        for(let i = 0; i < likes.length; i++) {
            if(likes[i] == artist_id) {
                likeFlag = true;
            }
        }

        res.render('artists/detailedArtist', { title: "Artists", artist: artist, likeFlag: likeFlag });
    } catch (e) {
        res
            .status(500)
            .json({ error: e });
    }
});

router.get('/genre/:genre', async (req, res) => {
    try {
        let genre = req.params.genre;

        const artists = await artistData.getArtistsByGenre(genre);
        res.render('artists/genreResults', { title: "Artists", artists: artists, genre: genre });
    } catch (e) {
        res
            .status(500)
            .json({ error: e });
    }
});

router.get('/genre/:genre/:subgenre', async (req, res) => {
    try {
        let genre = req.params.genre + "/" + req.params.subgenre;

        const artists = await artistData.getArtistsByGenre(genre);
        res.render('artists/genreResults', { title: "Artists", artists: artists, genre: genre });
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
                title: "Artists",
                errors: errors,
                hasErrors: true,
                artistData: artData
            });
        return;
    }

    try {
        const artists = await artistData.searchArtists(artData.artistName);
        res.render("artists/artistSearchResults", {
            title: "Artists",
            artists: artists,
            artistName: artData.artistName
        });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;