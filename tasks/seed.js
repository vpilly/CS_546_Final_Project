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

    await concerts.addConcert('star', ['5df517a3dc7bf36d8f9574d3','5df517a3dc7bf36d8f9574d4'], '2019-01-01', '20:00', '130 NY-22 Pawling, NY', '12564', 'Daryls House', ["pop", 'rock'], 'good', '100');
    await concerts.addConcert('moon', ['5df517a3dc7bf36d8f9574d5','5df517a3dc7bf36d8f9574d6'], '2020-01-01', '20:00', '24 fifth street, hoboken, NJ', '07030', 'DebaunPAC', ["Hip-Hop", 'rock'], 'excellent', '200');
    await concerts.addConcert('sun', ['5df517a3dc7bf36d8f9574d6','5df517a3dc7bf36d8f9574d3'], '2019-06-01', '20:00', '130 NY-22 Pawling, NY', '12564', 'Daryls House', ["pop", 'Country'], 'wonderful', '300');
    await concerts.addConcert('earth', ['5df517a3dc7bf36d8f9574d7','5df517a3dc7bf36d8f9574d5'], '2020-06-01', '20:00', '24 fifth street, hoboken, NJ', '07030', 'DebaunPAC', ["rap", 'house'], 'perfect', '400');



    await db.serverConfig.close();
};

main().catch(console.log);