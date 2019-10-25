# Database Proposal

* Daniel Collins
* Varun Pilly
* Jonathan Alcantara
* Shaopeng Ge 

## Users

The user collection will store all users and their profiles. Users will be able to login, update their profile, and explore the music website.

```
{
    "_id":"7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    "hashedPassword":"$2a$08$XdvNkfdNIL8Fq7l8xsuIUeSbNOFgK0M0iV5HOskfVn7.PWncShU.O",
    "profile":{
        "name":"Daniel Collins",
        "friends": ["4b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310", "3b7937a2-c0d2-2f8c-b27a-6a4d4b5b6310"],
        "favoriteArtists" : ["0b7997a2-c0d2-4f8c-b27a-6a1d425b6310", "7b7937a2-c0d2-2f8c-b27a-6a4d3b5b6310"],
        "concertsAttended" : ["1b7997a2-c0d2-4f8c-b27a-6a124b5b6310", "7b7937a2-c0d2-2f8c-b27a-624d4b5b6310"],
        "concertsToAttend" : ["3b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310", "7b7237a2-c0d2-2f8c-b27a-6a4d4b5b6310"],
        "_id":"c5d0fd67-7977-4fc5-9088-33d0347c932b"
    }
}
```

| Name | Type | Description |
|------|------|-------------|
| _id  | string | A globally unique identifier to represent the user |
| hashedPassword | string | A bcrypted string that is a hashed version of the user's password |
| profile | User Profile | The user's profile | 

## User Profile (subdocument; not stored in a collection)

This subdocument is used to describe the user's profile.

```
{
    "name":"Varun Pilly",
    "friends": ["7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310", "2b7937a2-c0d2-2f8c-b27a-6a4d4b5b6310"],
    "favoriteArtists" : ["0b7997a2-c0d2-4f8c-b27a-6a1d425b6310", "8b7937a2-c0d2-2f8c-b27a-6a4d3b5b6310"],
    "concertsAttended" : ["1b7997a2-c0d2-4f8c-b27a-6a124b5b6310", "6b7937a2-c0d2-2f8c-b27a-624d4b5b6310"],
    "concertsToAttend" : ["3b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310", "5b7237a2-c0d2-2f8c-b27a-6a4d4b5b6310"],
    "_id":"d5d0fd67-7977-4fc5-9088-33d0347c932b"
}
```

| Name | Type | Description |
|------|------|-------------|
| name | string | The user's name. | 
| friends | list of strings | List of strings of user IDs |
| favoriteArtists | list of strings | List of strings of artist IDs that the user has favorited|
| concertsAttended | list of strings | List of strings of concert IDs that the user has attended |
| concertsToAttend | list of strings | List of strings of concert IDs that the user will attend |
| _id  | string | A globally unique identifier to represent the user |

