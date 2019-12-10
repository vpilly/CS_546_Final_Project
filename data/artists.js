const mongoCollections = require("../config/mongoCollections");
const artists = mongoCollections.artists;
const users = mongoCollections.users;
const userData = require('./users');
const { ObjectId } = require('mongodb');

async function addArtist(name, genre) {
    if (arguments.length !== 2) throw `Error: function artists.addArtist() expected 2 parameters but instead received ${arguments.length}`;
    if (typeof (name) !== 'string') throw `Error: function artists.addArtist() expected name to be a string but instead recieved a ${typeof (name)}`;
    if (typeof (genre) !== 'string') throw `Error: function artists.addArtist() expected genre to be a string but instead recieved a ${typeof (genre)}`;
    
    details = {
        name: name,
        genre: genre,
        concertsPerformed: [],
        concertsToPerform: []
    }

    insert = {
        details: details,
        comments: []
    }

    const artistsCollection = await artists();
    const insertArtist = await artistsCollection.insertOne(insert);

    if (insertArtist.insertedCount === 0) throw `could not insert artist ${name} into database`;

    return insert;
}

async function getArtistByID(artistId) {
    if (arguments.length !== 1) throw `Error: function artists.getArtistByID() expected 1 parameter but instead received ${arguments.length}`;
    if (typeof (artistId) !== 'string') throw `Error: function artists.getArtistByID() expected artistId to be a string but instead recieved a ${typeof (artistId)}`;

    const objId = ObjectId.createFromHexString(artistId);
    if (!ObjectId.isValid(objId)) throw `Error: function artists.getArtistByID() received an invalid artistId: ${artistId}`;

    const artistsCollection = await artists();
    const artist = await artistsCollection.findOne({ _id: objId });
    if (artist === null) throw `Error: function artists.getArtistByID() could not find an artist with the artistId: ${artistId}`;

    return artist;
}

async function getAllArtists() {
    if (arguments.length !== 0) throw `Error: function artists.getAllArtists() expected 0 parameters but instead received ${arguments.length}`;

    const artistsCollection = await artists();
    const artistList = await artistsCollection.find({}).toArray();

    return artistList;
}

async function searchArtists(searchstring) {
    if (!searchstring) {
        throw `The search string was not defined.`;
    }

    if (typeof(searchstring) != "string") {
        throw `The given search string is not a number.`;
    } 

    var artists = [];
    let search = searchstring.toLowerCase();

    const artistList = await this.getAllArtists();

    for (let i = 0; i < artistList.length; i++) {
        let artist = artistList[i];
        if (artist.details.name.toLowerCase().includes(search)) {
            artists.push(artist);
        }
    }

    return artists;

}

async function getArtistsByGenre(genre) {
    if (arguments.length !== 1) throw `Error: function artists.getArtistsByGenre() expected 1 parameter but instead received ${arguments.length}`;
    if (typeof (genre) !== 'string') throw `Error: function artists.getArtistsByGenre() expected genre to be a string but instead recieved a ${typeof (genre)}`;

    const artistsCollection = await artists();
    const artistList = await artistsCollection.find({ "details.genre": genre }).toArray();
    if (artistList === null) throw `Error: function artists.getArtistsByGenre() could not find artists with the genre: ${genre}`;

    return artistList;
}

async function getArtistByConcertPerformed(concertId) {
    if (arguments.length !== 1) throw `Error: function artists.getArtistByConcertPerformed() expected 1 parameter but instead received ${arguments.length}`;
    if (typeof (concertId) !== 'string') throw `Error: function artists.getArtistByConcertPerformed() expected concertId to be a string but instead recieved a ${typeof (concertId)}`;

    const objId = ObjectId.createFromHexString(concertId);
    if (!ObjectId.isValid(objId)) throw `Error: function artists.getArtistByConcertPerformed() received an invalid concertId: ${concertId}`;

    const artistsCollection = await artists();
    const artists = await artistsCollection.find({ "details.concertsPerformed": objId }).toArray();
    if (artists === null) throw `Error: function artists.getArtistByConcertPerformed() could not find artists who have performed at the concert with concertId: ${concertId}`;

    return artists;
}

async function getArtistByConcertToPerform(concertId) {
    if (arguments.length !== 1) throw `Error: function artists.getArtistByConcertToPerform() expected 1 parameter but instead received ${arguments.length}`;
    if (typeof (concertId) !== 'string') throw `Error: function artists.getArtistByConcertToPerform() expected concertId to be a string but instead recieved a ${typeof (concertId)}`;

    const objId = ObjectId.createFromHexString(concertId);
    if (!ObjectId.isValid(objId)) throw `Error: function artists.getArtistByConcertToPerform() received an invalid concertId: ${concertId}`;

    const artistsCollection = await artists();
    const artists = await artistsCollection.find({ "details.concertsToPerform": objId }).toArray();
    if (artists === null) throw `Error: function artists.getArtistByConcertToPerform() could not find artists who will perform at the concert with concertId: ${concertId}`;

    return artists;
}

async function removeArtistByID(artistId) {
    if (arguments.length !== 1) throw `Error: function artists.removeArtistByID() expected 1 parameter but instead received ${arguments.length}`;
    if (typeof (artistId) !== 'string') throw `Error: function artists.removeArtistByID() expected artistId to be a string but instead recieved a ${typeof (artistId)}`;

    const objId = ObjectId.createFromHexString(artistId);
    if (!ObjectId.isValid(objId)) throw `Error: function artists.removeArtistByID() received an invalid artistId: ${artistId}`;

    const artist = await this.getArtistByID(artistId);

    const artistsCollection = await artists();
    const deletionInfo = await artistsCollection.removeOne({ _id: objId });

    if (deletionInfo.deletedCount === 0) throw `Error: function artists.removeArtistByID() could not succesfully remove artist with the artistId: ${artistId}`;

    return artist;
}

async function renameArtist(artistId, newName) {
    if (arguments.length !== 3) throw `Error: function artists.renameArtist() expected 2 parameters but instead received ${arguments.length}`;
    if (typeof (artistId) !== 'string') throw `Error: function artists.renameArtist() expected userId to be a string but instead recieved a ${typeof (artistId)}`;
    if (typeof (firstName) !== 'string') throw `Error: function artists.renameArtist() expected firstName to be a string but instead recieved a ${typeof (newName)}`;

    const objId = ObjectId.createFromHexString(artistId);
    if (!ObjectId.isValid(objId)) throw `Error: function artists.renameArtist() received an invalid artistId: ${artistId}`;

    const artist = await this.getArtistByID(artistId);

    const artistsCollection = await artists();
    const updateInfo = await artistsCollection.updateOne({ _id: objId }, { $set: { "details.name": newName } });
    if (updateInfo.modifiedCount === 0) throw `Error: function artists.renameArtist() could not succesfully update name of artist with the artistId: ${artistId}`;

    return await artistsCollection.findOne({ _id: objId });
}

async function addConcertPerformed(artistId, concertId) {
    if (arguments.length !== 2) throw `Error: function artists.addConcertPerformed() expected 2 parameters but instead received ${arguments.length}`;
    if (typeof (artistId) !== 'string') throw `Error: function artists.addConcertPerformed() expected artistId to be a string but instead recieved a ${typeof (artistId)}`;
    if (typeof (concertId) !== 'string') throw `Error: function artists.addConcertPerformed() expected concertId to be a string but instead recieved a ${typeof (concertId)}`;

    const objId = ObjectId.createFromHexString(artistId);
    if (!ObjectId.isValid(objId)) throw `Error: function artists.addConcertPerformed() received an invalid artistId: ${artistId}`;

    const artist = await this.getArtistByID(artistId);

    const artistsCollection = await artists();
    const updateInfo = await artistsCollection.updateOne({ _id: objId }, { $addToSet: { "details.concertsPerformed": concertId } });
    if (updateInfo.modifiedCount === 0) throw `Error: function artists.addConcertPerformed() could not succesfully add concert performed by artist with the artistId: ${artistId}`;

    return await artistsCollection.findOne({ _id: objId });
}

async function removeConcertPerformed(artistId, concertId) {
    if (arguments.length !== 2) throw `Error: function artists.removeConcertPerformed() expected 2 parameters but instead received ${arguments.length}`;
    if (typeof (artistId) !== 'string') throw `Error: function artists.removeConcertPerformed() expected artistId to be a string but instead recieved a ${typeof (artistId)}`;
    if (typeof (concertId) !== 'string') throw `Error: function artists.removeConcertPerformed() expected concertId to be a string but instead recieved a ${typeof (concertId)}`;

    const objId = ObjectId.createFromHexString(artistId);
    if (!ObjectId.isValid(objId)) throw `Error: function artists.removeConcertPerformed() received an invalid artistId: ${artistId}`;

    const artist = await this.getArtistByID(artistId);

    const artistsCollection = await artists();
    const updateInfo = await artistsCollection.updateOne({ _id: objId }, { $pull: { "details.concertsPerformed": concertId } });
    if (updateInfo.modifiedCount === 0) throw `Error: function artists.removeConcertPerformed() could not succesfully remove concert performed by artist with the artistId: ${artistId}`;

    return await artistsCollection.findOne({ _id: objId });
}

async function addConcertToPerform(artistId, concertId) {
    if (arguments.length !== 2) throw `Error: function artists.addConcertToPerform() expected 2 parameters but instead received ${arguments.length}`;
    if (typeof (artistId) !== 'string') throw `Error: function artists.addConcertToPerform() expected artistId to be a string but instead recieved a ${typeof (artistId)}`;
    if (typeof (concertId) !== 'string') throw `Error: function artists.addConcertToPerform() expected concertId to be a string but instead recieved a ${typeof (concertId)}`;

    const objId = ObjectId.createFromHexString(artistId);
    if (!ObjectId.isValid(objId)) throw `Error: function artists.addConcertToPerform() received an invalid artistId: ${artistId}`;

    const artist = await this.getArtistByID(artistId);

    const artistsCollection = await artists();
    const updateInfo = await artistsCollection.updateOne({ _id: objId }, { $addToSet: { "details.concertsToPerform": concertId } });
    if (updateInfo.modifiedCount === 0) throw `Error: function artists.addConcertToPerform() could not succesfully add upcoming concert to artist with the artistId: ${artistId}`;

    return await artistsCollection.findOne({ _id: objId });
}

async function removeConcertToPerform(artistId, concertId) {
    if (arguments.length !== 2) throw `Error: function artists.removeConcertToPerform() expected 2 parameters but instead received ${arguments.length}`;
    if (typeof (artistId) !== 'string') throw `Error: function artists.removeConcertToPerform() expected artistId to be a string but instead recieved a ${typeof (artistId)}`;
    if (typeof (concertId) !== 'string') throw `Error: function artists.removeConcertToPerform() expected concertId to be a string but instead recieved a ${typeof (concertId)}`;

    const objId = ObjectId.createFromHexString(artistId);
    if (!ObjectId.isValid(objId)) throw `Error: function artists.removeConcertToPerform() received an invalid artistId: ${artistId}`;

    const artist = await this.getArtistByID(artistId);

    const artistsCollection = await artists();
    const updateInfo = await artistsCollection.updateOne({ _id: objId }, { $pull: { "details.concertsToPerform": concertId } });
    if (updateInfo.modifiedCount === 0) throw `Error: function artists.removeConcertToPerform() could not succesfully remove upcoming concert to artist with the artistId: ${artistId}`;

    return await artistsCollection.findOne({ _id: objId });
}

async function addComment(artistId, userId, commentText) {
    if (arguments.length !== 3) throw `Error: function artists.addComment() expected 3 parameters but instead received ${arguments.length}`;
    if (typeof (artistId) !== 'string') throw `Error: function artists.addComment() expected artistId to be a string but instead recieved a ${typeof (artistId)}`;
    if (typeof (concertId) !== 'string') throw `Error: function artists.addComment() expected concertId to be a string but instead recieved a ${typeof (concertId)}`;
    if (typeof (commentText) !== 'string') throw `Error: function artists.addComment() expected commentText to be a string but instead recieved a ${typeof (commentText)}`;

    const objId = ObjectId.createFromHexString(artistId);
    if (!ObjectId.isValid(objId)) throw `Error: function artists.addComment() received an invalid artistId: ${artistId}`;

    const objId2 = ObjectId.createFromHexString(userId);
    if (!ObjectId.isValid(objId2)) throw `Error: function artists.addComment() received an invalid userId: ${userId}`;
    const usersCollection = await users();

    const artist = await this.getArtistByID(artistId);

    const usersCollection = await users();
    const user = await usersCollection.findOne({ _id: objId2 });
    if (user === null) throw `Error: function artists.addComment() could not find a user with the userId: ${userId}`;

    comment = {
        _id: ObjectId(),
        user: userId,
        comment: commentText,
        time: new Date().toUTCString()
    }

    const artistsCollection = await artists();
    const updateInfo = await artistsCollection.updateOne({ _id: objId }, { $addToSet: { "comments": comment } });
    if (updateInfo.modifiedCount === 0) throw `Error: function artists.addComment() could not succesfully add comment to artist with the artistId: ${artistId}`;

    return await artistsCollection.findOne({ _id: objId });
}

async function removeComment(artistId, userId, commentId) {
    if (arguments.length !== 2) throw `Error: function artists.removeComment() expected 2 parameters but instead received ${arguments.length}`;
    if (typeof (artistId) !== 'string') throw `Error: function artists.removeComment() expected artistId to be a string but instead recieved a ${typeof (artistId)}`;
    if (typeof (commentId) !== 'string') throw `Error: function artists.removeComment() expected commentId to be a string but instead recieved a ${typeof (commentId)}`;

    const objId = ObjectId.createFromHexString(artistId);
    if (!ObjectId.isValid(objId)) throw `Error: function artists.removeComment() received an invalid artistId: ${artistId}`;

    const objId3 = ObjectId.createFromHexString(userId);
    if (!ObjectId.isValid(objId3)) throw `Error: function artists.removeComment() received an invalid userId: ${userId}`;

    const objId2 = ObjectId.createFromHexString(commentId);
    if (!ObjectId.isValid(objId2)) throw `Error: function artists.removeComment() received an invalid commentId: ${commentId}`;

    const user = await userData.getUser(userId);
    
    const artist = await this.getArtistByID(artistId);

    const artistsCollection = await artists();
    const updateInfo = await artistsCollection.updateOne({ _id: objId }, { $pull: { "comments": { _id: objId2 } } });
    if (updateInfo.modifiedCount === 0) throw `Error: function artists.removeComment() could not succesfully remove upcoming concert to artist with the artistId: ${artistId}`;

    const usersCollection = await users();
    const updateInfo2 = await usersCollection.updateOne({ _id: objId3 }, { $pull: { "comments": { _id: objId2 } } });
    if (updateInfo2.modifiedCount === 0) throw `Error: function artists.removeComment() could not succesfully remove upcoming concert to user with the userId: ${userId}`;

    return await artistsCollection.findOne({ _id: objId });
}

module.exports = {
    addArtist,
    getArtistByID,
    getAllArtists,
    searchArtists,
    getArtistsByGenre,
    getArtistByConcertPerformed,
    getArtistByConcertToPerform,
    removeArtistByID,
    renameArtist,
    addConcertPerformed,
    removeConcertPerformed,
    addConcertToPerform,
    removeConcertToPerform,
    addComment,
    removeComment
};