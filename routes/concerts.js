const express = require('express');
const router = express.Router();
const concertData = require('../data/concerts');

router.post("/", async(req, res) => {
	try {
		let peopleFound = await search.getPersonByName(req.body.personName);
		res.render("posts/search", { title: "People Found", peopleList: peopleFound, personName: req.body.personName });
	} catch (e) {
		res.status(400).render('posts/searchError', { title: "400 Error" , error: e });
		return;
	}
});