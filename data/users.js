const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const { ObjectId } = require('mongodb');

// Basic Mongo Functions

async function addUser(firstName, lastName, password) {
    if (arguments.length !== 3) throw `Error: function addUser() expected 3 parameters but instead received ${arguments.length}`;
    if (typeof (firstName) !== 'string') throw `Error: function addUser() expected firstName to be a string but instead recieved a ${typeof (firstName)}`;
    if (typeof (lastName) !== 'string') throw `Error: function addUser() expected lastName to be a string but instead recieved a ${typeof (lastName)}`;
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

module.exports = {
    addUser,
    getUser,
    getAllUsers,
    removeUser,
    renameUser
};