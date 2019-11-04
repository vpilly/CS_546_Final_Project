const users = require('./data/users');
const connection = require("./config/mongoConnection");


async function main() {
    const user = await users.addUser("Varun", "Pilly", "pass");
    console.log(user)

    const db = await connection();
    await db.serverConfig.close();
}

main().catch(function (error) {
    console.error(error);
});

