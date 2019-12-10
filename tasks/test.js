const dbConnection = require('../config/mongoConnection');
const artists = require('../data/artists');
const data = require("./artists.json");

const main = async () => {
    const db = await dbConnection();
    await db.dropDatabase();

    let id;

    try {
        console.log("\nAdd Artist");
        const x = await artists.addArtist(data[0].name, data[0].genre);
        id = x._id.toHexString();
        console.log(x);
    } catch(e) {
        console.log(e);
        return;
    }

    try {
        console.log("\nGet Artist By ID");
        const x = await artists.getArtistByID(id);
        console.log(x);
    } catch(e) {
        console.log(e);
        return;
    }

    try {
        console.log("\nGet All Artists");
        const x = await artists.getAllArtists();
        console.log(x);
    } catch(e) {
        console.log(e);
        return;
    }

    try {
        console.log("\nSearch Artists");
        const x = await artists.searchArtists("Ade");
        console.log(x);
    } catch(e) {
        console.log(e);
        return;
    }

    try {
        console.log("\nGet Artists By Genre");
        const x = await artists.getArtistsByGenre("Pop");
        console.log(x);
    } catch(e) {
        console.log(e);
        return;
    }

    try {
        console.log("\nRemove Artist");
        const x = await artists.removeArtistByID(id);
        console.log(x);
    } catch(e) {
        console.log(e);
        return;
    }

    await db.serverConfig.close();
  };
  
  main().catch(console.log);