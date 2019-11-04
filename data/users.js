const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const { ObjectId } = require('mongodb');

async function addUser(firstName, lastName, password) {
    if (arguments.length !== 3) throw `Error: function addUser() expected 3 parameters but instead received ${arguments.length}`;
    if (typeof (firstName) !== 'string') throw `Error: function addUser() expected firstName to be a string but instead recieved a ${typeof (firstName)}`;
    if (typeof (lastName) !== 'string') throw `Error: function addUser() expected lastName to be a string but instead recieved a ${typeof (lastName)}`;
    if (typeof (password) !== 'string') throw `Error: function addUser() expected password to be a string but instead recieved a ${typeof (password)}`;

    // Encrypt Password Maybe
    // password = Encrypt(password)

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

module.exports = {
    addUser
};