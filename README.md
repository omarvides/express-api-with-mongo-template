# Ironman Express API with mongo generator template

This is a template to generate Express RESTful APIs that use mongo db. It uses ironman generator https://github.com/ironman-project/ironman

## Installing this generator

1. Install ironman https://github.com/ironman-project/ironman#install
1. Install this generator
```
ironman install https://github.com/omarvides/express-api-with-mongo-template.git
```

## Defining your variables

Create a yaml file with the parameters of the generator it could be a file named values.yaml containing the variables that the template expects

```example.yaml```

``` yaml
projectName: Some Project Name
projectDescription: Some project Descript
```

### This repository expected variables, to write your own instance of the file above, you can copy following snippet, write it down in a yaml file and modify it to meet your needs.

```variables.yaml```

``` yaml
version: 1.0.0
description: "This api is useful"
author: "User Name <username@mail.com>"
license: "MIT"
api_name: "example-api"
dbhost: "localhost"
dbuser: "root"
dbpassword: "root"
dbport: "27017"
nodeport: "4000"
```

#### Variables reference

| Variable    | Description                                                                               | Default value      |
|-------------|-------------------------------------------------------------------------------------------|--------------------|
| version     | The current API version something like 1.0.0 this will be written a the package.json file | 1.0.0              |
| description | A brief description of the API, this will be added to the package.json file               |                    |
| author      | Name and email of the API author, will be added to package.json                           |                    |
| license     | License to be written at the package.json for the app (MIT, GPL, etc)                     | MIT                |
| api_name    | The api name, must be a string separated with dashes (lower kebab case)                   | rest-express-mongo |
| dbhost      | The host for the mongo database (example: localhost)                                      |                    |
| dbuser      | The user of the mongo database (example: root)                                            |                    |
| dbpassword  | The password of the mongo database (example: root)                                        |                    |
| dbport      | The port of the mongo database (example: 27017)                                           |                    |
| nodeport    | The port which the API will use to listen to requests                                     | 3000               |
|             |                                                                                           |                    |

## Using it

Without a variables file

```
ironman generate express-api:api /directory/to/create/your-api
```

With a variables file defined

```
ironman generate express-api:api /directory/to/create/your-api -f variables.yaml
```

## Getting started with your new API

1. Move to your api directory 
``` bash
cd your-api-name
```
2. Install the dependencies
``` bash
yarn install
``` 
3. Run a mongo instance, you can use docker-compose and the following docker-compose.yml file
``` yaml
version: '3'
services:
  mongo:
    image: mongo:3.7
    environment:
      - MONGO_INITDB_ROOT_USERNAME=root
      - MONGO_INITDB_ROOT_PASSWORD=root
    ports:
      - "27017:27017"
```
4. Update your .env file, if using above docker-compose update it to
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_PORT=27017
```
5. Start your api
```
yarn start
```

## Builds

This generator creates repositories with a .drone.yml file, with the content 

```yml

pipeline:
  backend:
    image: node
    commands:
      - npm install
      - npm test
```

If you are tracking this repository with a drone CI server, it will automatically start building the first time you push your code, and will have buils for any commit at any branch you create, you can also add your favorite CI tool configuration files.

Start coding :)