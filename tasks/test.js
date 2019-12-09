const dbConnection = require('../config/mongoConnection');
const artists = require('../data/artists');
const data = require("./artists.json");

const main = async () => {
    const db = await dbConnection();
    await db.dropDatabase();

    try {
        console.log(data[0]);
        const x = await artists.addArtist(data[0].name, data[0].genre);
        console.log(x);
    } catch(e) {
        console.log(e);
        return;
    }

    await db.serverConfig.close();
  };
  
  main().catch(console.log);