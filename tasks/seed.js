const dbConnection = require('../config/mongoConnection');
const artists = require('../data/artists');
const data = require("./artists.json");

// only artists database seeding implemented

const main = async () => {
    const db = await dbConnection();
    await db.dropDatabase();

    let i;
    for (i = 0; i < data.length; i++) {
        const row = data[i];
        await artists.addArtist(row.name, row.genre);
    }

    await db.serverConfig.close();
};

main().catch(console.log);