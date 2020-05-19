# Housing Helper

Roommate Finder By Company

---

**Idea:** Find 3rd party housing and filter by company, location, and price.(helps commuting etc)

---

[Application Design - HousingHelper](https://www.notion.so/Application-Design-HousingHelper-83f2f97a2a284815b569f1685c8420bd)

### Technologies Used

- NodeJS
- Express
- ReactJS
- Docker

### Code Base

To spin up docker container from image (***-it***: interactive terminal for detached mode used -*d*, ***-p*:** port, ***9000***: machine port for docker, ***5000***: server port, ***node-docker***: docker image)

(backend)

```bash
docker run -it -p 9000:5000 node-docker
```

List of running contianers

```bash
docker ps
```

To start the react development client

```bash
npm run start
```

To start node development server with nodemon

```bash
cd backend
nodemon server
```
