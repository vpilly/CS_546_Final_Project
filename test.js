const users = require('./data/users');
const connection = require("./config/mongoConnection");

// testing in here
async function main() {
}

// Not quite sure if this is the correct way to do promises
main().catch(function (error) {
    console.error(error);
}).then(async function () {
    const db = await connection();
    await db.serverConfig.close();
});

