# Backend API for BuildingBlock Application

## Environment Setup

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

The api will be running at http://localhost:8000/. The current version has three routes. 

### Create a user
We use "post" request at http://localhost:8000/api/users/. 
```
POST http://localhost:8000/api/users/
```

### Login using the email and password
We use "post" request at http://localhost:8000/api/users/login/.
```
POST http://localhost:8000/api/users/login
```
### Get the user information 
We use "get" request at http://localhost:8000/api/users/current/.
```
GET http://localhost:8000/api/users/current/
```


