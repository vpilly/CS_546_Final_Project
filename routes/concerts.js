const express = require('express');
const router = express.Router();
const concertData = require('../data/concerts');

router.post("/", async(req, res) => {
	try {
		let filter = req.body.searchFilter;
		let concertsFound = [];
		if(filter == title) concertsFound = await concertData.getConcertByTitle(req.body.searchContent);
		if(filter == artist) concertsFound = await concertData.getConcertByArtistName(req.body.searchContent);
		if(filter == address) concertsFound = await concertData.getConcertByAddress(req.body.searchContent);
		if(filter == genre) concertsFound = await concertData.getConcertByGenre(req.body.searchContent);
		if(filter == venue) concertsFound = await concertData.getConcertByVenue(req.body.searchContent);
	
		res.render("concerts/concertSearchResults", { title: "Concerts Found", concertsList: concertsFound, searchContent: req.body.searchContent });
	} catch (e) {
		res.status(400).render('posts/searchError', { title: "400 Error" , error: e });
		return;
	}
});