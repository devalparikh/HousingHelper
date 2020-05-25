# Housing Helper

A simple way to find a roommate and a carpool buddy

[Application Design - HousingHelper](https://www.notion.so/Application-Design-HousingHelper-83f2f97a2a284815b569f1685c8420bd)

## Idea

---

Find 3rd party housing and filter housing posts by company, location, and price.(helps commuting etc)

## Technologies Used

---

- NodeJS
- Express
- ReactJS
- MongoDB
- Docker
- NGINX

## API Routes

---

@route **Get /users**

@desc Gets all users, (_id, username, createdAt, updatedAt)

@access Public

// @route **GET /users/:id**

// @desc Get a user by their username, (_id, username, createdAt, updatedAt)

// @access Public

// @route **POST /users/register**

// @desc Register new user, body needs (email, username, password)

// @access Public

// @route **POST** **/auth/login**

// @desc Login Autheniticate user, body needs (username, password)

// @access Public

// @route **GET /auth/user**

// @desc Get all user data by jwt token

// @access Private

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
