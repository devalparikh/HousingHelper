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
- Docker

## Codebase

---

### Docker

Spin up docker container from image (***-it***: interactive terminal for detached mode used -*d*, ***-p*:** port, ***9000***: machine port for docker, ***5000***: server port, ***node-docker***: docker image)

node

```bash
(backend) docker run -it -p 9000:5000 housinghelper-node-docker
```

react-nginx

```bash
docker run -p 3000:80 housinghelper-nginx-react-docker
```

List of running contianers

```bash
docker ps
```

### React

Start the react development client

```bash
npm run start
```

### Node

Start node development server with nodemon

```bash
cd backend
nodemon server
```
