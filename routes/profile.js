const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const artistData = data.artists;
const concertData = data.concerts;

router.get('/', async (req, res) => {
    // res.render('profile', { title: "profile" });
    res.redirect('/profile/' + req.session.auth.id);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const account = await userData.getUser(id);
        const profile = account.profile;
        // console.table(profile);
        const friend = await userData.hasFriend(req.session.auth.id, id);
        const diff = id !== req.session.auth.id;

        const friends = [];
        let i = 0;
        for (i = 0; i < profile.friends.length; i++) {
            const obj = { id: profile.friends[i] };
            const temp = await userData.getUser(profile.friends[i]);
            obj.name = temp.profile.name;
            friends.push(obj);
        }
        // console.table(friends);

        const artists = [];

        for (i = 0; i < profile.favoriteArtists.length; i++) {
            const obj = { id: profile.favoriteArtists[i] };
            const temp = await artistData.getArtistByID(profile.favoriteArtists[i]);
            // console.log(temp);
            obj.name = temp.details.name;
            artists.push(obj);
        }
        // console.table(artists);

        const concertsA = [];
        for (i = 0; i < profile.concertsAttended.length; i++) {
            const obj = { id: profile.concertsAttended[i] };
            const temp = await concertData.getConcertByID(profile.concertsAttended[i]);
            // console.log(temp);
            obj.name = temp.concertInfo.title;
            concertsA.push(obj);
        }
        // console.table(concertsA);

        const concertsT = [];
        for (i = 0; i < profile.concertsToAttend.length; i++) {
            const obj = { id: profile.concertsToAttend[i] };
            const temp = await concertData.getConcertByID(profile.concertsToAttend[i]);
            // console.log(temp);
            obj.name = temp.concertInfo.title;
            concertsT.push(obj);
        }
        // console.table(concertsT);

        res.render('profile', {
            title: "profile",
            name: profile.name,
            diffUser: diff,
            isFriend: friend,
            id: id,
            friends: friends,
            artists: artists,
            concertsA: concertsA,
            concertsT: concertsT
        });
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

router.post('/:id/:isFriend', async (req, res) => {
    if (req.params.id === req.session.auth.id) {
        res.status(400).json({ error: "You cannot be friends with yourself" });
        return;
    }
    const id = req.params.id;
    try {
        await userData.getUser(id);
    } catch (e) {
        res.status(404).json({ error: e });
    }

    const friend = req.params.isFriend;
    let checkFriend = false;
    if (friend === 'friend' || friend === 'unfriend') {
        checkFriend = friend === 'friend';
    }
    else {
        res.status(404).json({ error: 'friend param missing' });
        return;
    }

    if (checkFriend) {
        try {
            await userData.addFriend(req.session.auth.id, id);
        } catch (e) {
            res.status(500).json({ error: e });
            return;
        }
    }
    else {
        try {
            await userData.removeFriend(req.session.auth.id, id);
        } catch (e) {
            res.status(500).json({ error: e });
            return;
        }

    }
    res.redirect('/profile/' + id);
});

module.exports = router;