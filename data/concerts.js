const mongoCollections = require("../config/mongoCollections");
const concerts = mongoCollections.concerts;
const artists = mongoCollections.artists;
const { ObjectId } = require('mongodb');

async function addConcert(title, artists, date, time, address, zipcode, venue, genre, description, ticketPrice) {
    if (arguments.length !== 10) throw `Error: function addConcert() expected 10 parameters but instead received ${arguments.length}`;
    if (typeof (title) !== 'string') throw `Error: function addConcert() expected title to be a string but instead recieved a ${typeof (title)}`;
    // if (Array.isArray(artists)) throw `Error: function addConcert() expected artists to be an array but instead recieved a ${typeof (artists)}`;
    if (typeof (date) !== 'string') throw `Error: function addConcert() expected date to be a string but instead recieved a ${typeof (date)}`;
    if (typeof (time) !== 'string') throw `Error: function addConcert() expected time to be a string but instead recieved a ${typeof (time)}`;
    if (typeof (address) !== 'string') throw `Error: function addConcert() expected address to be a string but instead recieved a ${typeof (address)}`;
    if (typeof (zipcode) !== 'string') throw `Error: function addConcert() expected zipcode to be a string but instead recieved a ${typeof (zipcode)}`;
    if (typeof (venue) !== 'string') throw `Error: function addConcert() expected venue to be a string but instead recieved a ${typeof (venue)}`;
    // if (Array.isArray(genre)) throw `Error: function addConcert() expected genre to be a string but instead recieved a ${typeof (genre)}`;
    if (typeof (description) !== 'string') throw `Error: function addConcert() expected description to be a string but instead recieved a ${typeof (description)}`;
    if (typeof (ticketPrice) !== 'string') throw `Error: function addConcert() expected ticketPrice to be a string but instead recieved a ${typeof (ticketPrice)}`;

    concertInfo = {
        title: title.toLowerCase(),
        artists: artists,
        date: date,
        time: time,
        address: address.toLowerCase(),
        zipcode: zipcode.toLowerCase(),
        venue: venue.toLowerCase(),
        genre: genre,
        description: description,
        ticketPrice: Number(ticketPrice)
    }

    newConcert = {
        concertInfo: concertInfo
    }

    const concertsCollection = await concerts();
    const insertInfo = await concertsCollection.insertOne(newConcert);

    if (insertInfo.insertedCount === 0) throw `Error: could not insert concert ${title} into database`;

    const newId = insertInfo.insertedId;
    const concert = await this.getConcertByID(String(newId));
    
    return concert;
}

async function getConcertByID(concertID){
    if (arguments.length !== 1) throw `Error: function getConcertByID() expected 1 parameter but instead received ${arguments.length}`;
    if (typeof (concertID) !== 'string') throw `Error: function getConcertByID() expected concertID to be a string but instead recieved a ${typeof (concertID)}`;
    
    const objId = ObjectId.createFromHexString(concertID);
    if (!ObjectId.isValid(objId)) throw `Error: function getConcertByID() received an invalid concertID: ${concertID}`;

    const concertsCollection = await concerts();
    const concert = await concertsCollection.findOne({ _id: objId });
    if (concert === null) throw `Error: function getConcertByID() could not find a concert with the concertID: ${concertID}`;

    return concert;
}

async function getAllConcerts(){
    if (arguments.length !== 0) throw `Error: function getAllConcerts() expected 0 parameters but instead received ${arguments.length}`;
    
    const concertsCollection = await concerts();
    const concertList = await concertsCollection.find({}).toArray();

    return concertList;
}

async function removeConcert(concertID){
    if (arguments.length !== 1) throw `Error: function removeConcert() expected 1 parameter but instead received ${arguments.length}`;
    if (typeof (concertID) !== 'string') throw `Error: function removeConcert() expected concertID to be a string but instead recieved a ${typeof (concertID)}`;

    const objId = ObjectId.createFromHexString(concertID);
    if (!ObjectId.isValid(objId)) throw `Error: function removeConcert() received an invalid concertId: ${concertID}`;
    const concertsCollection = await concert();

    const concert = await concertsCollection.findOne({ _id: objId });
    if (concert === null) throw `Error: function removeConcert() could not find a concert with the concertId: ${concertID}`;

    const deletionInfo = await concertsCollection.removeOne({ _id: objId });

    if (deletionInfo.deletedCount === 0) throw `Error: function removeConcert() could not succesfully remove concert with the concertId: ${concertID}`;

    return concert;
}

async function updateConcert(concertID, updateinfo){
    if (arguments.length !== 2) throw `Error: function updateConcert() expected 2 parameters but instead received ${arguments.length}`;
    if (typeof (concertID) !== 'string') throw `Error: function updateConcert() expected concertID to be a string but instead recieved a ${typeof (concertID)}`;
    if (typeof (updateinfo) !== 'object') throw `Error: function updateConcert() expected updateinfo to be a object but instead recieved a ${typeof (updateinfo)}`;

    const objId = ObjectId.createFromHexString(concertID);
    if (!ObjectId.isValid(objId)) throw `Error: function updateConcert() received an invalid concertID: ${concertID}`;
    const concertsCollection = await concert();

    const concert = await concertsCollection.findOne({ _id: objId });
    if (concert === null) throw `Error: function updateConcert() could not find a concert with the concertID: ${concertID}`;
    
    const updatedConcert = {};
    if (updateinfo.title) updatedConcert.title = updateinfo.title;
    if (updateinfo.artist) updatedConcert.artist = updateinfo.artist;
    if (updateinfo.date) updatedConcert.date = updateinfo.date;
    if (updateinfo.time) updatedConcert.time = updateinfo.time;
    if (updateinfo.address) updatedConcert.address = updateinfo.address;
    if (updateinfo.zipcode) updatedConcert.zipcode = updateinfo.zipcode;
    if (updateinfo.venue) updatedConcert.venue = updateinfo.venue;
    if (updateinfo.genre) updatedConcert.genre = updateinfo.genre;
    if (updateinfo.description) updatedConcert.description = updateinfo.description;
    if (updateinfo.ticketPrice) updatedConcert.ticketPrice = updateinfo.ticketPrice;

    const updatedInfo = await concertsCollection.updateOne({ _id: objId }, {$set:updatedConcert});
    
    if (updatedInfo.modifiedCount === 0) throw `Error: function updateConcert() could not succesfully update concert with the concertID: ${concertID}`;
    return await concertsCollection.findOne({ _id: objId });;
}

async function getRecommendConcerts(){
    if (arguments.length !== 0) throw `Error: function getRecommendConcerts() expected 0 parameters but instead received ${arguments.length}`;
    
    const concertsCollection = await concerts();

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    let recommendConcerts = await concertsCollection.find({ 'concertInfo.date': { $gte: today } }).toArray();
    if (recommendConcerts.length > 5){recommendConcerts.length = 3;}
    return recommendConcerts;
}

async function getConcertByTitle(title, dateAndPrice){
    if (arguments.length !== 2) throw `Error: function getConcertByTitle() expected 2 parameter but instead received ${arguments.length}`;
    if (typeof (title) !== 'string') throw `Error: function getConcertByTitle() expected title to be a string but instead recieved a ${typeof (title)}`;
    console.log(dateAndPrice.fromDate);
    console.log(dateAndPrice.toDate);
    let search = title.toLowerCase();
    const concertsCollection = await concerts();
    const allConcerts = await concertsCollection.find({
        $and: [ { 'concertInfo.ticketPrice': { $lte: Number(dateAndPrice.toPrice) } }, { 'concertInfo.ticketPrice': { $gte: Number(dateAndPrice.fromPrice) }},{'concertInfo.date': { $gte: dateAndPrice.fromDate }}, {'concertInfo.date': { $lte: dateAndPrice.toDate } } ]
    })
    .toArray();
    if (allConcerts === null) throw `Error: function getConcertByTitle() could not find concert with the title: ${title}`;
    let concertsList = [];
    for (index = 0; index < allConcerts.length; index++) { 
        let concert = allConcerts[index];
        if(concert.concertInfo.title.includes(search)){
            concertsList.push(concert);
        };
    };
    return concertsList;
}

async function getConcertByArtistName(artistName, dateAndPrice){
    if (arguments.length !== 2) throw `Error: function getConcertByArtistName() expected 2 parameter but instead received ${arguments.length}`;
    if (typeof (artistName) !== 'string') throw `Error: function getConcertByArtistName() expected artistName to be a string but instead recieved a ${typeof (artistName)}`;
    
    
    let name = artistName.toLowerCase();

    const artistsCollection = await artists();
    const allArtist = await artistsCollection.find({}).toArray();
    let artistsList = [];
    for(index = 0; index < allArtist.length; index++){
        let artist = allArtist[index];
        if(artist.details.name.toLowerCase().includes(name)){
            artistsList.push(artist._id);
        };
    };
    
    const concertsCollection = await concerts();
    let concertsList = [];
    for(index = 0; index < artistsList.length; index++){
        let artist = artistsList[index];
        let subConcertList = await concertsCollection.find({
            $and: [ {'consertInfo.artists': artist},{ 'concertInfo.ticketPrice': { $lte: Number(dateAndPrice.toPrice) } }, { 'concertInfo.ticketPrice': { $gte: Number(dateAndPrice.fromPrice) }}, {'concertnfo.date': { $gte: dateAndPrice.fromDate }}, {'concertInfo.date': { $lte: dateAndPrice.toDate } } ]
        })
        .toArray();
        concertsList.concat(subConcertList);
    }
    return concertsList
}

async function getConcertByAddress(address, dateAndPrice){
    if (arguments.length !== 2) throw `Error: function getConcertByAddress() expected 2 parameter but instead received ${arguments.length}`;
    if (typeof (address) !== 'string') throw `Error: function getConcertByAddress() expected address to be a string but instead recieved a ${typeof (address)}`;

    let search = address.toLowerCase();
    const concertsCollection = await concerts();
    const allConcerts = await concertsCollection.find({
        $and: [ { 'concertInfo.ticketPrice': { $lte: Number(dateAndPrice.toPrice) } }, { 'concertInfo.ticketPrice': { $gte: Number(dateAndPrice.fromPrice) }},{'concertInfo.date': { $gte: dateAndPrice.fromDate }}, {'concertInfo.date': { $lte: dateAndPrice.toDate } } ]
    })
    .toArray();
    if (allConcerts === null) throw `Error: function getConcertByAddress() could not find concert with the address: ${address}`;
    let concertsList = [];
    for (index = 0; index < allConcerts.length; index++) { 
        let concert = allConcerts[index];
        if(concert.concertInfo.address.includes(search)){
            concertsList.push(concert);
        };
    };
    return concertsList;
}

async function getConcertByGenre(genre, dateAndPrice){
    if (arguments.length !== 2) throw `Error: function getConcertByGenre() expected 2 parameter but instead received ${arguments.length}`;
    if (typeof (genre) !== 'string') throw `Error: function getConcertByGenre() expected genre to be a string but instead recieved a ${typeof (genre)}`;
    let search = genre.toLowerCase();
    const concertsCollection = await concerts();
    const concertsList = await concertsCollection.find({
        $and: [ {'concertInfo.genre':genre}, { 'concertInfo.ticketPrice': { $lte: Number(dateAndPrice.toPrice) } }, { 'concertInfo.ticketPrice': { $gte: Number(dateAndPrice.fromPrice) }}, {'concertInfo.date': { $gte: dateAndPrice.fromDate }}, {'concertInfo.date': { $lte: dateAndPrice.toDate } } ]
    })
    .toArray();
    if (concertsList === null) throw `Error: function getConcertByGenre() could not find concert with the genre: ${genre}`;

    return concertsList;
}

async function getConcertByVenue(venue, dateAndPrice){
    if (arguments.length !== 2) throw `Error: function getConcertByVenue() expected 2 parameter but instead received ${arguments.length}`;
    if (typeof (venue) !== 'string') throw `Error: function getConcertByVenue() expected venue to be a string but instead recieved a ${typeof (venue)}`;

    let search = venue.toLowerCase();
    const concertsCollection = await concerts();
    const allConcerts = await concertsCollection.find({
        $and: [ { 'concertInfo.ticketPrice': { $lte: Number(dateAndPrice.toPrice) } }, { 'concertInfo.ticketPrice': { $gte: Number(dateAndPrice.fromPrice) }},{'concertInfo.date': { $gte: dateAndPrice.fromDate }}, {'concertInfo.date': { $lte: dateAndPrice.toDate } } ]
    })
    .toArray();
    if (allConcerts === null) throw `Error: function getConcertByVenue() could not find concert with the venue: ${venue}`;
    let concertsList = [];
    for (index = 0; index < allConcerts.length; index++) { 
        let concert = allConcerts[index];
        if(concert.concertInfo.venue.includes(search)){
            concertsList.push(concert);
        };
    };
    return concertsList;
}

module.exports ={
    addConcert,
    getConcertByID,
    getAllConcerts,
    removeConcert,
    updateConcert,
    getRecommendConcerts,
    getConcertByTitle,
    getConcertByArtistName,
    getConcertByAddress,
    getConcertByGenre,
    getConcertByVenue,
}

