const authMap = new Map();

async function generateHexString(length) {
    if (typeof (length) !== 'number') throw 'Error';

    // got this from https://stackoverflow.com/questions/5398737/how-can-i-make-a-simple-wep-key-generator-in-javascript
    let secret = "";
    while (secret.length < length) {
        secret += Math.random().toString(16).substring(2);
    }
    return secret.substring(0, length);
}

async function newCookie(email) {
    const secret = await generateHexString(128);
    authMap.set(email, secret);
    return secret;
}

async function deleteCookie(email, secret) {
    if (authMap.has(email) && authMap.get(key) === secret) {
        authMap.delete(email);
        return true;
    }

    return false;
}

async function verifyCookie(email, secret) {
    return (authMap.has(email) && authMap.get(email) === secret);
}

module.exports = {
    newCookie,
    deleteCookie,
    verifyCookie
}