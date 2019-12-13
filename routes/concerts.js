const express = require('express');
const router = express.Router();
const concertData = require('../data/concerts');

router.get("/", async(req, res) => {
	res.render('concerts/concertSearch');
});

router.put('/:id', async (req, res) => {
	const updatedInfo = req.body;
  
	if (!updatedInfo) {
	  res.status(400).render('concerts/error', { title: "404 Error" , error: 'You must provide data to update a concert!' });
	  return;
	}
  
	try {
	  await concertData.getConcertByID(req.params.id);
	} catch (e) {
		res.status(404).render('concerts/error', { title: "404 Error" , error: e });
		return;
	}
  
	try {
	  const updatedConcert = await concertData.updateConcert(req.params.id, updatedInfo);
	  res.json(updatedConcert);
	} catch (e) {
		res.status(400).render('concerts/error', { title: "400 Error" , error: e });
		return;
	}
});

router.get('/details/:id', async (req, res) => {
    try {
        const concert = await concertData.getConcertByID(req.params.id);
        res.render('concerts/detailedConcert', { concert: concert });
    } catch (e) {
        res.status(500).render('concerts/error', { title: "500 Error" , error: e });
		return;
    }
});

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

router.delete('/:id', async (req, res) => {
	try {
	  const result = await concertData.removeConcert(req.params.id);
	  res.json(result);
	  return;
	} catch (e) {
	  res.status(404).render('concerts/error', { title: "404 Error" , error: e });
	  return;
	}
  });

module.exports = router;