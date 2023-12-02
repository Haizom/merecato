# Nodejs/expressjs/mongodb Server for merecato app

# Environment vars
This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|CORS           | Cors accepted values            | "*"      |
|PORT           |             | "*"      |
|MONGO_URI           | Database URL            | "*"      |
|JWT_SECRET           |             | "*"      |
|NODE_ENV           |             | "*"      |



# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 16.16.0.


# Getting started
- Clone the repository
```
git clone  <git lab template url> <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Make sure you have all the env variables
- Build and run the project locally in development mode
```
npm run dev
```
  Navigate to `http://localhost:5000`


## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **node_modules**         | Contains all  npm dependencies                                        
| **config**        | Contains application configuration including connecting to db and storage configurations
| **controllers**      | Controllers define functions to serve various express routes. 
| **utils**              | Common functions to be used across the app.  
| **middlewares**      | Express middlewares which process the incoming requests before handling them down to the routes
| **routes**           | Contain all express routes, separated by module of application                       
| **models**           | Models define schemas that will be used in storing and retrieving data from Application database  |
| **server.js**     | Entry point to express app                                                               |
| package.json             | Contains npm dependencies   | 


# API endpoints
- api/users
- api/categories
- api/products
