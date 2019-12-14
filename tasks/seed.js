const dbConnection = require('../config/mongoConnection');
const artists = require('../data/artists');
const concerts = require('../data/concerts');

const artistsData = require("./artists_with_site.json");
const concertsData = require("./concerts.json");
// only artists database seeding implemented

const main = async () => {
    const db = await dbConnection();
    await db.dropDatabase();

    let i;
    for (i = 0; i < artistsData.length; i++) {
        const row = artistsData[i];
        await artists.addArtist(row.name, row.genre, row.mtv);
    }

    for (index = 0; index < concertsData.length; index++) {
        const row = concertsData[index];
        await concerts.addConcert(row.title, row.artists, row.date, row.time, row.address, row.zipcode, row.venue, row.genre, row.description, row.ticketPrice);
    };


    await db.serverConfig.close();
};

main().catch(console.log);