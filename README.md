# Backend API for BuildingBlock Application

## Environment Setup

This project is based on [this blogpost](https://www.freecodecamp.org/news/learn-how-to-handle-authentication-with-node-using-passport-js-4a56ed18e81e/).


Clone the repo from GitHub. In order to download the related dependencies.
```
NPM install
``` 

Ask me for the keys.js file which contains the key and link for my MongoDB database. And put it under config directory. Need to install Nodemon as development dependencies.

```
npm intall -D nodemon
```

Start the development environment.
```
npm run dev
```

The Nodemon will automatically restart the terminal commands when you save the files.

## Use the API

The api will be running at http://localhost:8000/. The current version has three routes. You can use [Postman](https://www.postman.com/downloads/) to test the routes.

### Updated December 5th
I have added the challenge API. You can perform "get, insert, update, and delete" operations at http://localhost:8000/api/challenges/. 
For example, if you want to add one challenge into the database, perform a post request on http://localhost:8000/api/challenges/insertOne. 

### Create a user
We use "post" request at http://localhost:8000/api/users/. 
```
POST http://localhost:8000/api/users/
```
We need to add a raw JSON body to the POST request. The format should be similar to the following example:
- You need at least an email and a password to create a user.
```
{
    "user": {
        "email": "kimchi12@emory.edu",
        "password": "testaaaaa",
        "date": "01/12/2021",
        "wellness_point": 0,
        "study_point": 0,
        "buildings": [],
        "tasks": []
    }
}
```
![screenshot](img/img1.png)
### Login using the email and password
We use "post" request at http://localhost:8000/api/users/login/. For example:
```
POST http://localhost:8000/api/users/login
```
We need to add a raw JSON body to the POST request. By doing this we also get a new JWT token.
- You need at least an email and a password to login a user.
```
{
    "user": {
        "email": "kimchi12@emory.edu",
        "password": "testaaaaa"
    }
}
```
![screenshot](img/img2.png)
### Get the user information 
We use "get" request at http://localhost:8000/api/users/current/.
```
GET http://localhost:8000/api/users/current
```
In order to visit the protected "current" route. we will now use the token we previously got and add it to our “Headers” in Postman’s configuration.
![screenshot](img/img3.png)
The response will be:
```
{
    "user": {
        "_id": "6192995e19bd5a58c0c6493f",
        "email": "kimchi1@emory.edu",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbWNoaTFAZW1vcnkuZWR1IiwiaWQiOiI2MTkyOTk1ZTE5YmQ1YTU4YzBjNjQ5M2YiLCJleHAiOjE2NDIxOTc1NzQsImlhdCI6MTYzNzAxMzU3NH0.cC3_g7r0PZpnF59GJEAprMInC0WGZ-zEGdNHAOjgwHo",
        "date": "2021-01-12T05:00:00.000Z",
        "wellness_point": 0,
        "study_point": 0,
        "buildings": [],
        "tasks": []
    }
}
```
### Update tasks and buildings information
We use "put" request at http://localhost:8000/api/users/update. Here we need to use the JWT in the header, but we do not need the email or password.
```
PUT http://localhost:8000/api/users/update
```
![screenshot](img/img4.png)