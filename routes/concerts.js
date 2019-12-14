const express = require('express');
const router = express.Router();
const concertData = require('../data/concerts');
const artistData = require('../data/artists');

router.get("/", async(req, res) => {
	try {
		const recommendConcerts = await concertData.getRecommendConcerts();
		for(i = 0; i < recommendConcerts.length; i++){
			let artistIdList = recommendConcerts[i].concertInfo.artists;
			for(j = 0; j < artistIdList.length; j++){
				let artist = await artistData.getArtistByID(artistIdList[j]);
				artistIdList[j] = artist.details.name;
			};
		};
		res.render('concerts/concertSearch', { title: "Concert Searching" , recommendConcerts: recommendConcerts });
	} catch (e) {
		res.status(400).render('concerts/error', { title: "400 Error" , error: e });
		return;
	}

	
});

router.post("/", async(req, res) => {
	let newConcert = req.body;

	if (!newConcert) {
		res.status(400).render('concerts/error', { title: "404 Error" , error: 'You must provide data to creat a concert!' });
	  	return;
	};

	try {
		const addedconcert = await concertData.addConcert(newConcert.title, newConcert.artists, newConcert.date, newConcert.time, newConcert.address, newConcert.zipcode, newConcert.venue, newConcert.genre, newConcert.description, newConcert.ticketPrice);
		res.render('concerts/detailedConcert', { title: "new Concert", concert: addedconcert });
	} catch (e) {
		res.status(400).render('concerts/error', { title: "400 Error" , error: e });
		return;
	}
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

		let artistIdList = concert.concertInfo.artists;
		for(j = 0; j < artistIdList.length; j++){
			let artist = await artistData.getArtistByID(artistIdList[j]);
			concert.concertInfo.artists[j] = artist.details.name;
		};	
        res.render('concerts/detailedConcert', { title: "Concert Details", concert: concert });
    } catch (e) {
        res.status(500).render('concerts/error', { title: "500 Error" , error: e });
		return;
    }
});

router.post("/search", async(req, res) => {
	try {
		let body = req.body;
		let filter = body.searchFilter

		let concertsFound = [];
		if(filter == "title") concertsFound = await concertData.getConcertByTitle(body.searchContent,body);
		if(filter == "artist") concertsFound = await concertData.getConcertByArtistName(body.searchContent,body);
		if(filter == "address") concertsFound = await concertData.getConcertByAddress(body.searchContent,body);
		if(filter == "genre") concertsFound = await concertData.getConcertByGenre(body.searchContent,body);
		if(filter == "venue") concertsFound = await concertData.getConcertByVenue(body.searchContent,body);
		for(i = 0; i < concertsFound.length; i++){
			let artistIdList = concertsFound[i].concertInfo.artists;
			for(j = 0; j < artistIdList.length; j++){
				let artist = await artistData.getArtistByID(artistIdList[j]);
				let newObj = {
					name: artist.details.name,
					id:artistIdList[j]
				};
				artistIdList[j] = newObj;
			};
			console.log(artistIdList);
		};

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

router.get('/genre/:genre', async (req, res) => {
    try {
        let genre = req.params.genre;

        const concerts = await concertData.getByGenre(genre);
        res.render('concerts/genreResults', { title: "Concerts", concerts: concerts, genre: genre });
    } catch (e) {
        res.status(400).render('concerts/error', { title: "400 Error" , error: e });
		return;
    }
});

router.get('/venue/:venue', async (req, res) => {
    try {
        let venue = req.params.venue;

        const concerts = await concertData.getByVenue(venue);
        res.render('concerts/venueResults', { title: "Concerts", concerts: concerts, venue: venue });
    } catch (e) {
        res.status(400).render('concerts/error', { title: "400 Error" , error: e });
		return;
    }
});

module.exports = router;