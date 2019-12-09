const authMap = new Map();

async function generateHexString(length) {
    if (arguments.length !== 1) throw 'Error';
    if (typeof (length) !== 'number') throw 'Error';

    // got this from https://stackoverflow.com/questions/5398737/how-can-i-make-a-simple-wep-key-generator-in-javascript
    let secret = "";
    while (secret.length < length) {
        secret += Math.random().toString(16).substring(2);
    }
    return secret.substring(0, length);
}

// Errors are intentionally left vague

async function newCookie(email) {
    if (arguments.length !== 1) throw 'Error';
    if (typeof (email) !== 'string') throw 'Error';

    const secret = await generateHexString(128);
    authMap.set(email, secret);

    return secret;
}

async function deleteCookie(email, secret) {
    if (arguments.length !== 2) throw 'Error';
    if (typeof (email) !== 'string') throw 'Error';
    if (typeof (secret) !== 'string') throw 'Error';
    if (authMap.has(email) && authMap.get(key) === secret) {
        authMap.delete(email);
        return true;
    }

    return false;
}

async function verifyCookie(email, secret) {
    if (arguments.length !== 2) throw 'Error';
    if (typeof (email) !== 'string') throw 'Error';
    if (typeof (secret) !== 'string') throw 'Error';

    return (authMap.has(email) && authMap.get(email) === secret);
}

module.exports = {
    newCookie,
    deleteCookie,
    verifyCookie
}