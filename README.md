![https://github.com/devalparikh/housinghelper/blob/master/public/Group%202.png?raw=true](https://github.com/devalparikh/housinghelper/blob/master/public/Group%202.png?raw=true)

A simple way to find a roommate and a buddy

[Application Design Notes - HousingHelper](https://www.notion.so/Application-Design-HousingHelper-83f2f97a2a284815b569f1685c8420bd)

## About

---

Find 3rd party housing and filter housing posts by company, location, and price.

## Built With

---

- NodeJS
- Express
- ReactJS
- MongoDB
- Docker
- NGINX

- (Heroku) -> 
- AWS EC2, AWS S3, Amazon EMR, Amazon Elasticsearch Service
- Spark MLlib
- Elasticsearch 

## WIP System Design

---

![https://github.com/devalparikh/housinghelper/blob/master/CurrentSystemDesign.png?raw=true](https://github.com/devalparikh/housinghelper/blob/master/CurrentSystemDesign.png?raw=true)

## API Routes

---

```bash
@route **Get /users**

@desc Gets all users, (_id, username, createdAt, updatedAt)
@access Public
```

```bash
@route **Get /posts**

@desc Gets all posts
@access Public
```

```bash
@route **GET /users/:id**

@desc Get a user by their username, (_id, username, createdAt, updatedAt)
@access Public
```

```bash
@route **POST /users/register**

@desc Register new user, body needs (email, username, password)
@access Public
```

```bash
@route **POST /auth/login**

@desc Login Autheniticate user, body needs (username, password)
@access Public
```

```bash
@route **GET /auth/user**

@desc Get all user data by jwt token
@access Private
```

```bash
@route **GET /posts/byuserid/:id**

@desc Get all user's post by user id
@access Public
```

```bash
@route **GET /posts/byuserid/:id**

@desc Get all user's post by user id
@access Public
```

```bash
@route **POST /auth/create**

@body
{
	"username"*, - String
	"user_id"*, - String
	"state"*, - String
	"city"*, - String
	"company"*, - String
	"privateBedroom"*, - Boolean
	"privateBathroom"*, - Boolean
	"rentPrice"*, - Number
	"moreInfo" - String
}
@desc Creates a post
@access Private
```

```bash
@route **DELETE /auth/delete**

@body 
{
	"postID"* - String
}
@desc Creates a post
@access Private
```

## Codebase

---

### Deployment - Docker

1) Build docker containers

Node

```bash
(backend) docker build -t housinghelper-nginx-react-docker .
```

React-nginx

```bash
docker build -t housinghelper-nginx-react-docker .
```

2) Spin up docker container 

note: (***-it***: interactive terminal for detached mode use -*d*, ***-p*:** port, ***9000***: machine port for docker, ***5000***: server port, ***node-docker***: docker image)

Node

```bash
(backend) docker run -it -p 9000:5000 housinghelper-node-docker
```

React-NGINX

```bash
docker run -p 3000:80 housinghelper-nginx-react-docker
```

List of running contianers

```bash
docker ps
```

### Dev Environment

Node

Start node development server with nodemon on [http://localhost:5000/](http://localhost:5000/)

```bash
(backend) nodemon server
```

React

Start the react development client on [http://localhost:3000/](http://localhost:3000/)

```bash
npm run start
```
