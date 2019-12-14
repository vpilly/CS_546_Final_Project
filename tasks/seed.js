const dbConnection = require('../config/mongoConnection');
const artists = require('../data/artists');
const concerts = require('../data/concerts');
const artistsData = require("./artists_with_site.json");
// only artists database seeding implemented

const main = async () => {
    const db = await dbConnection();
    await db.dropDatabase();

    let i;
    for (i = 0; i < artistsData.length; i++) {
        const row = artistsData[i];
        await artists.addArtist(row.name, row.genre, row.mtv);
    }

    await concerts.addConcert('star', ['Adele','Sam Smith'], '2019-01-01', '20:00', '130 NY-22 Pawling, NY', '12564', 'Daryls House', ["pop", 'rock'], 'good', '100');
    await concerts.addConcert('moon', ['Mariah Carey','Rita Ora'], '2020-01-01', '20:00', '24 fifth street, hoboken, NJ', '07030', 'DebaunPAC', ["Hip-Hop", 'rock'], 'excellent', '200');
    await concerts.addConcert('sun', ['Adele','Mariah Carey'], '2019-06-01', '20:00', '130 NY-22 Pawling, NY', '12564', 'Daryls House', ["pop", 'Country'], 'wonderful', '300');
    await concerts.addConcert('earth', ['Sam Smith','Rita Ora'], '2020-06-01', '20:00', '24 fifth street, hoboken, NJ', '07030', 'DebaunPAC', ["rap", 'house'], 'perfect', '400');



    await db.serverConfig.close();
};

main().catch(console.log);