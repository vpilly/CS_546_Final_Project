const dbConnection = require('../config/mongoConnection');
const artists = require('../data/artists');
const concerts = require('../data/concerts');
const artistsData = require("./artists_with_site.json");
// only artists database seeding implemented

const main = async () => {
    const db = await dbConnection();
    await db.dropDatabase();

    let artistsIds =[];
    for (let i = 0; i < artistsData.length; i++) {
        const row = artistsData[i];
        let newArtist = await artists.addArtist(row.name, row.genre, row.mtv);
        artistsIds.push(String(newArtist._id));
    };
    const artists1 = [artistsIds.pop(),artistsIds.pop()];
    const artists2 = [artistsIds.pop(),artistsIds.pop()];
    const artists3 = [artistsIds.pop(),artistsIds.pop()];
    const artists4 = [artistsIds.pop(),artistsIds.pop()];
    await concerts.addConcert('star', artists1, '2019-01-01', '20:00', '130 NY-22 Pawling, NY', '12564', 'Daryls House', ["pop", 'rock'], 'good', '100');
    await concerts.addConcert('moon', artists2, '2020-01-01', '20:00', '24 fifth street, hoboken, NJ', '07030', 'DebaunPAC', ["Hip-Hop", 'rock'], 'excellent', '200');
    await concerts.addConcert('sun', artists3, '2019-06-01', '20:00', '130 NY-22 Pawling, NY', '12564', 'Daryls House', ["pop", 'Country'], 'wonderful', '300');
    await concerts.addConcert('earth', artists4, '2020-06-01', '20:00', '24 fifth street, hoboken, NJ', '07030', 'DebaunPAC', ["rap", 'house'], 'perfect', '400');



    await db.serverConfig.close();
};

main().catch(console.log);