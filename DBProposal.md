# The Best ToDo List in the World

* Phil Barresi
* Jacqueline Sharpe
* Francis Underwood
* Heather Dunbar
* Douglas Stamper
* Seth Grayson

## Users

The user collection will store all users and their profiles. Users will be able to login, update their profile, and post tasks.

```
{
    "_id":"7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    "sessionId":"b3988882-627f-4c59-8d5d-54b7a43b030e",
    "hashedPassword":"$2a$08$XdvNkfdNIL8Fq7l8xsuIUeSbNOFgK0M0iV5HOskfVn7.PWncShU.O",
    "profile":{
        "name":"Phil Barresi",
        "hobby":"Coffee related tasks",
        "_id":"7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310"
    }
}
```

| Name | Type | Description |
|------|------|-------------|
| _id  | string | A globally unique identifier to represent the user |
| sessionId | string | A globally unique identifier to represent the user's current session |
| hashedPassword | string | A bcrypted string that is a hashed version of the user's password |
| profile | User Profile | The user's profile | 

## User Profile (subdocument; not stored in a collection)

This subdocument is used to describe the user's profile.

```
{
    "name":"Francis Underwood",
    "hobby":"Arguably hostile takeovers of democracy. Also, consumption of ribs.",
    "_id":"c5d0fd67-7977-4fc5-9088-33d0347c932b"
}
```

| Name | Type | Description |
|------|------|-------------|
| _id  | string | A globally unique identifier to represent the user |
| name | string | The user's name. | 
| friends | list of strings | List of strings of user IDs |
| favorite artists | list of strings | List of strings of artist IDs |
| concerts attended | list of strings | List of strings of concert IDs that the user has attended |
| concerts to attend | list of strings | List of strings of concert IDs that the user will attend |


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
| time | string | The date of the concert. |
| address | string | The location of the concert. |
| zipcode | string | The zipcode of the concert. | 
| vanue | string | The vanue of the concert. |
| type | types array | The music typys of concert. |
| description | string | A longer description of the concert. |
| ticketPrice | number | The price of the concert. | 
