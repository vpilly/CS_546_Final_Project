const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const { ObjectId } = require('mongodb');

// Basic Mongo Functions

async function addUser(firstName, lastName, email, password) {
    if (arguments.length !== 4) throw `Error: function addUser() expected 4 parameters but instead received ${arguments.length}`;
    if (typeof (firstName) !== 'string') throw `Error: function addUser() expected firstName to be a string but instead recieved a ${typeof (firstName)}`;
    if (typeof (lastName) !== 'string') throw `Error: function addUser() expected lastName to be a string but instead recieved a ${typeof (lastName)}`;
    if (typeof (email) !== 'string') throw `Error: function addUser() expected email to be a string but instead recieved a ${typeof (lastName)}`;
    if (typeof (password) !== 'string') throw `Error: function addUser() expected password to be a string but instead recieved a ${typeof (password)}`;

    // Encrypt Password Maybe

    baseProfile = {
        name: firstName + ' ' + lastName,
        friends: [],
        favoriteArtists: [],
        concertsAttended: [],
        concertsToAttend: [],
        // _id: "To be implemented"
    }

    insert = {
        email: email,
        hashedPassword: password,
        profile: baseProfile
    }

    const usersCollection = await users();
    const insertInfo = await usersCollection.insertOne(insert);

    if (insertInfo.insertedCount === 0) throw `could not insert user ${firstName + ' ' + lastName}  into database`;

    return insert;
}

async function getUser(userId) {
    if (arguments.length !== 1) throw `Error: function getUser() expected 1 parameter but instead received ${arguments.length}`;
    if (typeof (userId) !== 'string') throw `Error: function getUser() expected userId to be a string but instead recieved a ${typeof (userId)}`;

    const objId = ObjectId.createFromHexString(userId);
    if (!ObjectId.isValid(objId)) throw `Error: function getUser() received an invalid userId: ${userId}`;
    const usersCollection = await users();
    const user = await usersCollection.findOne({ _id: objId });
    if (user === null) throw `Error: function getUser() could not find a user with the userId: ${userId}`;

    return user;
}

async function getAllUsers() {
    if (arguments.length !== 0) throw `Error: function getAllUsers() expected 0 parameters but instead received ${arguments.length}`;

    const usersCollection = await users();
    const userList = await usersCollection.find({}).toArray();

    return userList;
}

async function removeUser(userId) {
    if (arguments.length !== 1) throw `Error: function removeUser() expected 1 parameter but instead received ${arguments.length}`;
    if (typeof (userId) !== 'string') throw `Error: function removeUser() expected userId to be a string but instead recieved a ${typeof (userId)}`;

    const objId = ObjectId.createFromHexString(userId);
    if (!ObjectId.isValid(objId)) throw `Error: function removeUser() received an invalid userId: ${userId}`;
    const usersCollection = await users();

    const user = await usersCollection.findOne({ _id: objId });
    if (user === null) throw `Error: function removeUser() could not find a user with the userId: ${userId}`;

    const deletionInfo = await usersCollection.removeOne({ _id: objId });

    if (deletionInfo.deletedCount === 0) throw `Error: function removeUser() could not succesfully remove user with the userId: ${userId}`;

    return user;
}

// Advanced Mongo Functions

async function renameUser(userId, firstName, lastName) {
    if (arguments.length !== 3) throw `Error: function renameUser() expected 3 parameters but instead received ${arguments.length}`;
    if (typeof (userId) !== 'string') throw `Error: function renameUser() expected userId to be a string but instead recieved a ${typeof (userId)}`;
    if (typeof (firstName) !== 'string') throw `Error: function renameUser() expected firstName to be a string but instead recieved a ${typeof (firstName)}`;
    if (typeof (lastName) !== 'string') throw `Error: function renameUser() expected lastName to be a string but instead recieved a ${typeof (lastName)}`;

    const objId = ObjectId.createFromHexString(userId);
    if (!ObjectId.isValid(objId)) throw `Error: function renameUser() received an invalid userId: ${userId}`;
    const usersCollection = await users();

    const user = await usersCollection.findOne({ _id: objId });
    if (user === null) throw `Error: function renameUser() could not find a user with the userId: ${userId}`;

    const updateInfo = await usersCollection.updateOne({ _id: objId }, { $set: { "profile.name": (firstName + ' ' + lastName) } });
    if (updateInfo.modifiedCount === 0) throw `Error: function renameUser() could not succesfully update name of user with the userId: ${userId}`;

    return await usersCollection.findOne({ _id: objId });;
}

async function addFriend(userId, friendId) {
    if (arguments.length !== 2) throw `Error: function addFriend() expected 2 parameters but instead received ${arguments.length}`;
    if (typeof (userId) !== 'string') throw `Error: function addFriend() expected userId to be a string but instead recieved a ${typeof (userId)}`;
    if (typeof (friendId) !== 'string') throw `Error: function addFriend() expected friendId to be a string but instead recieved a ${typeof (friendId)}`;

    const objId = ObjectId.createFromHexString(userId);
    if (!ObjectId.isValid(objId)) throw `Error: function addFriend() received an invalid userId: ${userId}`;
    const usersCollection = await users();

    const user = await usersCollection.findOne({ _id: objId });
    if (user === null) throw `Error: function addFriend() could not find a user with the userId: ${userId}`;

    const updateInfo = await usersCollection.updateOne({ _id: objId }, { $addToSet: { "profile.friends": friendId } });
    if (updateInfo.modifiedCount === 0) throw `Error: function addFriend() could not succesfully update name of user with the userId: ${userId}`;

    return await usersCollection.findOne({ _id: objId });;
}

async function addFavArtist(userId, artistId) {
    if (arguments.length !== 2) throw `Error: function addFavArtist() expected 2 parameters but instead received ${arguments.length}`;
    if (typeof (userId) !== 'string') throw `Error: function addFavArtist() expected userId to be a string but instead recieved a ${typeof (userId)}`;
    if (typeof (artistId) !== 'string') throw `Error: function addFavArtist() expected artistId to be a string but instead recieved a ${typeof (artistId)}`;

    const objId = ObjectId.createFromHexString(userId);
    if (!ObjectId.isValid(objId)) throw `Error: function addFavArtist() received an invalid userId: ${userId}`;
    const usersCollection = await users();

    const user = await usersCollection.findOne({ _id: objId });
    if (user === null) throw `Error: function addFavArtist() could not find a user with the userId: ${userId}`;

    const updateInfo = await usersCollection.updateOne({ _id: objId }, { $addToSet: { "profile.favoriteArtists": artistId } });
    if (updateInfo.modifiedCount === 0) throw `Error: function addFavArtist() could not succesfully update name of user with the userId: ${userId}`;

    return await usersCollection.findOne({ _id: objId });;
}

async function addConcAttend(userId, concertId) {
    if (arguments.length !== 2) throw `Error: function addConcAttend() expected 2 parameters but instead received ${arguments.length}`;
    if (typeof (userId) !== 'string') throw `Error: function addConcAttend() expected userId to be a string but instead recieved a ${typeof (userId)}`;
    if (typeof (concertId) !== 'string') throw `Error: function addConcAttend() expected concertId to be a string but instead recieved a ${typeof (artistId)}`;

    const objId = ObjectId.createFromHexString(userId);
    if (!ObjectId.isValid(objId)) throw `Error: function addConcAttend() received an invalid userId: ${userId}`;
    const usersCollection = await users();

    const user = await usersCollection.findOne({ _id: objId });
    if (user === null) throw `Error: function addConcAttend() could not find a user with the userId: ${userId}`;

    const updateInfo = await usersCollection.updateOne({ _id: objId }, { $addToSet: { "profile.concertsAttended": concertId } });
    if (updateInfo.modifiedCount === 0) throw `Error: function addConcAttend() could not succesfully update name of user with the userId: ${userId}`;

    return await usersCollection.findOne({ _id: objId });;
}

async function addConcToAttend(userId, concertId) {
    if (arguments.length !== 2) throw `Error: function addConcToAttend() expected 2 parameters but instead received ${arguments.length}`;
    if (typeof (userId) !== 'string') throw `Error: function addConcToAttend() expected userId to be a string but instead recieved a ${typeof (userId)}`;
    if (typeof (concertId) !== 'string') throw `Error: function addConcToAttend() expected concertId to be a string but instead recieved a ${typeof (artistId)}`;

    const objId = ObjectId.createFromHexString(userId);
    if (!ObjectId.isValid(objId)) throw `Error: function addConcToAttend() received an invalid userId: ${userId}`;
    const usersCollection = await users();

    const user = await usersCollection.findOne({ _id: objId });
    if (user === null) throw `Error: function addConcToAttend() could not find a user with the userId: ${userId}`;

    const updateInfo = await usersCollection.updateOne({ _id: objId }, { $addToSet: { "profile.concertsToAttend": concertId } });
    if (updateInfo.modifiedCount === 0) throw `Error: function addConcToAttend() could not succesfully update name of user with the userId: ${userId}`;

    return await usersCollection.findOne({ _id: objId });;
}

async function removeFriend(userId, friendId) {
    if (arguments.length !== 2) throw `Error: function removeFriend() expected 2 parameters but instead received ${arguments.length}`;
    if (typeof (userId) !== 'string') throw `Error: function removeFriend() expected userId to be a string but instead recieved a ${typeof (userId)}`;
    if (typeof (friendId) !== 'string') throw `Error: function removeFriend() expected friendId to be a string but instead recieved a ${typeof (friendId)}`;

    const objId = ObjectId.createFromHexString(userId);
    if (!ObjectId.isValid(objId)) throw `Error: function removeFriend() received an invalid userId: ${userId}`;
    const usersCollection = await users();

    const user = await usersCollection.findOne({ _id: objId });
    if (user === null) throw `Error: function removeFriend() could not find a user with the userId: ${userId}`;

    const updateInfo = await usersCollection.updateOne({ _id: objId }, { $pull: { "profile.friends": friendId } });
    if (updateInfo.modifiedCount === 0) throw `Error: function removeFriend() could not succesfully update name of user with the userId: ${userId}`;

    return await usersCollection.findOne({ _id: objId });;
}

async function removeFavArtist(userId, artistId) {
    if (arguments.length !== 2) throw `Error: function removeFavArtist() expected 2 parameters but instead received ${arguments.length}`;
    if (typeof (userId) !== 'string') throw `Error: function removeFavArtist() expected userId to be a string but instead recieved a ${typeof (userId)}`;
    if (typeof (artistId) !== 'string') throw `Error: function removeFavArtist() expected artistId to be a string but instead recieved a ${typeof (artistId)}`;

    const objId = ObjectId.createFromHexString(userId);
    if (!ObjectId.isValid(objId)) throw `Error: function removeFavArtist() received an invalid userId: ${userId}`;
    const usersCollection = await users();

    const user = await usersCollection.findOne({ _id: objId });
    if (user === null) throw `Error: function removeFavArtist() could not find a user with the userId: ${userId}`;

    const updateInfo = await usersCollection.updateOne({ _id: objId }, { $pull: { "profile.favoriteArtists": artistId } });
    if (updateInfo.modifiedCount === 0) throw `Error: function removeFavArtist() could not succesfully update name of user with the userId: ${userId}`;

    return await usersCollection.findOne({ _id: objId });;
}

async function removeConcAttend(userId, concertId) {
    if (arguments.length !== 2) throw `Error: function removeConcAttend() expected 2 parameters but instead received ${arguments.length}`;
    if (typeof (userId) !== 'string') throw `Error: function removeConcAttend() expected userId to be a string but instead recieved a ${typeof (userId)}`;
    if (typeof (concertId) !== 'string') throw `Error: function removeConcAttend() expected concertId to be a string but instead recieved a ${typeof (artistId)}`;

    const objId = ObjectId.createFromHexString(userId);
    if (!ObjectId.isValid(objId)) throw `Error: function removeConcAttend() received an invalid userId: ${userId}`;
    const usersCollection = await users();

    const user = await usersCollection.findOne({ _id: objId });
    if (user === null) throw `Error: function removeConcAttend() could not find a user with the userId: ${userId}`;

    const updateInfo = await usersCollection.updateOne({ _id: objId }, { $pull: { "profile.concertsAttended": concertId } });
    if (updateInfo.modifiedCount === 0) throw `Error: function removeConcAttend() could not succesfully update name of user with the userId: ${userId}`;

    return await usersCollection.findOne({ _id: objId });;
}

async function removeConcToAttend(userId, concertId) {
    if (arguments.length !== 2) throw `Error: function removeConcToAttend() expected 2 parameters but instead received ${arguments.length}`;
    if (typeof (userId) !== 'string') throw `Error: function removeConcToAttend() expected userId to be a string but instead recieved a ${typeof (userId)}`;
    if (typeof (concertId) !== 'string') throw `Error: function removeConcToAttend() expected concertId to be a string but instead recieved a ${typeof (artistId)}`;

    const objId = ObjectId.createFromHexString(userId);
    if (!ObjectId.isValid(objId)) throw `Error: function removeConcToAttend() received an invalid userId: ${userId}`;
    const usersCollection = await users();

    const user = await usersCollection.findOne({ _id: objId });
    if (user === null) throw `Error: function removeConcToAttend() could not find a user with the userId: ${userId}`;

    const updateInfo = await usersCollection.updateOne({ _id: objId }, { $pull: { "profile.concertsToAttend": concertId } });
    if (updateInfo.modifiedCount === 0) throw `Error: function removeConcToAttend() could not succesfully update name of user with the userId: ${userId}`;

    return await usersCollection.findOne({ _id: objId });;
}

module.exports = {
    addUser,
    getUser,
    getAllUsers,
    removeUser,
    renameUser,
    addFriend,
    addFavArtist,
    addConcAttend,
    addConcToAttend,
    removeFriend,
    removeFavArtist,
    removeConcAttend,
    removeConcToAttend
};