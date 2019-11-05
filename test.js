const users = require('./data/users');
const connection = require("./config/mongoConnection");


async function main() {
    const user1 = await users.addUser("Varun", "Pilly", "pass");
    console.log(user1)
    console.log();

    const user2 = await users.addUser("Daniel", "Collins", "pass");
    console.log(user2)
    console.log();

    await users.addUser("Shaopeng", "Ge", "pass");

    console.log(await users.addFriend(String(user1._id), String(user2._id)));
    console.log(await users.removeFriend(String(user1._id), String(user2._id)));

    console.log(await users.getAllUsers());
    console.log();

    console.log(await users.removeUser(String(user1._id)));

    console.log(await users.getAllUsers());
    console.log();

    console.log(await users.renameUser(String(user2._id), "Jonathan", "Alcantara"));
    console.log();

    console.log(await users.getAllUsers());
}

// Not quite sure if this is the correct way to do promises
main().catch(function (error) {
    console.error(error);
}).then(async function () {
    const db = await connection();
    await db.serverConfig.close();
});

