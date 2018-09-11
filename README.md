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

| Variable     | Description                                                                                | Default value      |
|--------------|--------------------------------------------------------------------------------------------|--------------------|
| version      | The current API version something like 1.0.0 this will be written a the package.json file | 1.0.0              |
| description  | A brief description of the API, this will be added to the package.json file               |                    |
| author       | Name and email of the API author, will be added to package.json                           |                    |
| license      | License to be written at the package.json for the app (MIT, GPL, etc)                     | MIT                |
| api_name     | The api name, must be a string separated with dashes (lower kebab case)                   | rest-express-mongo |
| dbhost       | The host for the mongo database (example: localhost)                                      |                    |
| dbuser       | The user of the mongo database (example: root)                                            |                    |
| dbpassword   | The password of the mongo database (example: root)                                        |                    |
| dbport       | The port of the mongo database (example: 27017)                                           |                    |
| nodeport     | The port which the API will use to listen to requests                                     | 3000               |
| docker_user  | The usarname on dockerhub or the docker registry to use                                   | docker_user        |
| docker_image | The image of the docker image to publish to                                               | docker_image       |

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

This generator creates repositories with a .drone.yml file.

If you are tracking this repository with a drone CI server, it will automatically start building the first time you push your code, and will have buils for any commit at any branch you create, you can also add your favorite CI tool configuration files.

```.drone.yml file content:```

```yml

pipeline:
  backend:
    image: node
    environment:
      - DB_HOST=database
      - DB_USER=root
      - DB_PASSWORD=root
      - DB_PORT=27017
    commands:
      - sleep 15
      - npm install
      - npm test
      - npm run integration
    docker_publish:
      image: plugins/docker:17.12
      repo: docker_user/docker_image
      dockerfile: docker/Dockerfile
      auto_tag: true
      secrets: [docker_username, docker_password]
      when:
        event: [ tag ]
services:
  database:
    image: mongo:3
    environment:
      - MONGO_INITDB_ROOT_USERNAME=root
      - MONGO_INITDB_ROOT_PASSWORD=root
```

The .drone.yml file contains a service configuration to provide a docker container with a mongo database version 3 and sets some environment variables to guarantee that your api integration specs will be able to find and connect to the database.

This version of the .drone.yml file will also publish to a docker registry the application on a docker container, by default it will publish the
image when the repository is tagged, with the version of the tag, if the repository is tagged with ```1.0.0``` it will create the tags
```1.0``` and ```1``` and push them to the docker registry being used, by default dockerhub, when the repository is merged to master from a branch
the pipeline will create the ```latest``` tag and push it to the registry.



Start coding :)