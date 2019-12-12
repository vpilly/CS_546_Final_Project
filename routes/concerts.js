const express = require('express');
const router = express.Router();
const concertData = require('../data/concerts');

router.get("/", async(req, res) => {
	res.render('concerts/concertSearch');
});

// router.get('/details/:id', async (req, res) => {
//     try {
//         const artist = await artistData.getArtistByID(req.params.id);
//         res.render('artists/detailedArtist', { artist: artist });
//     } catch (e) {
//         res
//             .status(500)
//             .json({ error: e });
//     }
// });

router.post("/", async(req, res) => {
	try {
		let body = req.body;
		let filter = body.searchFilter;
		let concertsFound = [];
		if(filter == "title") concertsFound = await concertData.getConcertByTitle(body.searchContent,body);
		if(filter == "artist") concertsFound = await concertData.getConcertByArtistName(body.searchContent,body);
		if(filter == "address") concertsFound = await concertData.getConcertByAddress(body.searchContent,body);
		if(filter == "genre") concertsFound = await concertData.getConcertByGenre(body.searchContent,body);
		if(filter == "venue") concertsFound = await concertData.getConcertByVenue(body.searchContent,body);
	
		res.render("concerts/concertSearchResults", { title: "Concerts Found", concertsList: concertsFound, searchContent: body.searchContent });
	} catch (e) {
		res.status(400).render('concerts/error', { title: "400 Error" , error: e });
		return;
	}
});

module.exports = router;