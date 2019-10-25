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


## Artists

The artist collection will store all artists and their details. Users will be able to view an artist's upcoming concerts, their music website to view songs, and see similar artists. Users will also be able to leave comments on the artist's page and favorite an artist to see all thier future concerts.

```
{
    "_id":"7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    "details":{
        "name":"Jonathan Alcantara",
        "genre": "Hip Hop",
        "concertsPerformed" : ["1b7997a2-c0d2-4f8c-b27a-6a124b5b6310", "7b7937a2-c0d2-2f8c-b27a-624d4b5b6310"],
        "concertsToPerform" : ["3b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310", "7b7237a2-c0d2-2f8c-b27a-6a4d4b5b6310"]
    },
    "comments":[{
        "_id":"",
        "user":"",
        "comment":""},
        {next comment}, ...]
}
```

| Name | Type | Description |
|------|------|-------------|
| _id  | string | A globally unique identifier to represent the artist |
| details | Artist Details | The artist's details | 
| comments | User Comments | List of comments on the artist left by users | 

## Artist Details (subdocument; not stored in a collection)

This subdocument is used to describe the artist's details.

```
{
     "name":"Jonathan Alcantara",
     "genre": "Hip Hop",
     "concertsPerformed" : ["1b7997a2-c0d2-4f8c-b27a-6a124b5b6310", "7b7937a2-c0d2-2f8c-b27a-624d4b5b6310"],
     "concertsToPerform" : ["3b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310", "7b7237a2-c0d2-2f8c-b27a-6a4d4b5b6310"]
}
```

| Name | Type | Description |
|------|------|-------------|
| name | string | The artist's name. | 
| genre | string | The artist's genre of music. | 
| concertsAttended | list of strings | List of strings of concert IDs that the artist has performed at |
| concertsToAttend | list of strings | List of strings of concert IDs that the artist will perform at |

## Artist Comments (subdocument; not stored in a collection)

This subdocument is used to hold comments made about the artist.

```
[
    {
        "_id":"",
        "user":"",
        "comment":""
    },
    {next comment}, 
    ...
]
```

| Name | Type | Description |
|------|------|-------------|
| _id  | string | A globally unique identifier to represent the comment | 
| user | string | The user who made the comment. | 
| comment | string | the text body of the comment |

## Concerts

The Concerts collection will store all the Concerts. 

```
{
    "_id":"5a5c4431-cdc9-4144-8429-fcb278c5c122",
    "info": {
        "title":"Rock Time",
        "artists":[1b7997a2-c0d2-4f8c-b27a-6a124b5b6, 1b7997a2-c0d2-4f823323-27a-6a124b5b6, 1b7997a2-c0d2-4fsadasd323-27a-6a124b5b6],
        "date": "11/1/2019",
        "Time": "20:00",
        "address": "Lincoln Center Plaza, New York, NY 10023",
        "zipcode": "10023",
        "vanue": "Lincoln Center for the Performing Arts"
        "type": ["rock", "hip-hop"],
        "description":"American best rock con!",
        "ticketPrice": 80
    }
}
```
| Name | Type | Description |
|------|------|-------------|
| _id  | string | A globally unique identifier to represent the concert |
| info | Concert Info | The concert's information |

## Concert Info (subdocument; not stored in a collection)

This subdocument is used to describe the concert's information.

```
{
    "title":"Rock Time",
    "artists":[1b7997a2-c0d2-4f8c-b27a-6a124b5b6, 1b7997a2-c0d2-4f823323-27a-6a124b5b6, 1b7997a2-c0d2-4fsadasd323-27a-6a124b5b6],
    "date": "11/1/2019",
    "Time": "20:00",
    "address": "Lincoln Center Plaza, New York, NY 10023",
    "zipcode": "10023",
    "vanue": "Lincoln Center for the Performing Arts"
    "type": ["rock", "hip-hop"],
    "description":"American best rock con!",
    "ticketPrice": 80
}
```
| Name | Type | Description |
|------|------|-------------|
| title | string | The task ID. | 
| artists | artists array | An array of artists' IDs of the concert. |
| date | string | The date of the concert. |
| time | string | The time of the concert. |
| address | string | The location of the concert. |
| zipcode | string | The zipcode of the concert. | 
| vanue | string | The vanue of the concert. |
| type | types array | The music typys of concert. |
| description | string | A longer description of the concert. |
| ticketPrice | number | The price of the concert. | 
