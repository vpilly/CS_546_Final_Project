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
    const artists1 = [artistsIds.shift(),artistsIds.shift()];
    const artists2 = [artistsIds.shift(),artistsIds.shift()];
    const artists3 = [artistsIds.shift(),artistsIds.shift()];
    const artists4 = [artistsIds.shift(),artistsIds.shift()];
    const concert1 = await concerts.addConcert('star', artists1, '2019-01-01', '20:00', '130 NY-22 Pawling, NY', '12564', 'Daryls House', ["pop", 'rock'], 'good', '100');
    const concert2 = await concerts.addConcert('moon', artists2, '2020-01-01', '20:00', '24 fifth street, hoboken, NJ', '07030', 'DebaunPAC', ["Hip-Hop", 'rock'], 'excellent', '200');
    const concert3 = await concerts.addConcert('sun', artists3, '2019-06-01', '20:00', '130 NY-22 Pawling, NY', '12564', 'Daryls House', ["pop", 'Country'], 'wonderful', '300');
    const concert4 = await concerts.addConcert('earth', artists4, '2020-06-01', '20:00', '24 fifth street, hoboken, NJ', '07030', 'DebaunPAC', ["rap", 'house'], 'perfect', '400');
    for (index = 0; index < concert1.concertInfo.artists.length; index++) {
        let artist = concert1.concertInfo.artists[index];
        await artists.addConcertPerformed(artist,String(concert1._id))
    };
    for (index = 0; index < concert2.concertInfo.artists.length; index++) {
        let artist = concert2.concertInfo.artists[index];
        await artists.addConcertToPerform(artist,String(concert2._id))
    };
    for (index = 0; index < concert3.concertInfo.artists.length; index++) {
        let artist = concert3.concertInfo.artists[index];
        await artists.addConcertPerformed(artist,String(concert3._id))
    };
    for (index = 0; index < concert4.concertInfo.artists.length; index++) {
        let artist = concert4.concertInfo.artists[index];
        await artists.addConcertToPerform(artist,String(concert4._id))
    };

    await db.serverConfig.close();
};

main().catch(console.log);