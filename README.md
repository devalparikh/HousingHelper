# Housing Helper (Roommate)

Roommate Finder By Company

---

**Idea:** Find 3rd party housing and filter by company, location, and price.(helps commuting etc)

---

- Framework

    **Web Application:** User creates post for open room

    - Post
        - company
        - location
        - bed/bath (1 bath, 1 shared bath)
        - (optional) has transportation / needs transportation
        - price
    - User
        - info: username, email (private until matched), password (always private)
        - posts
        - matched users (when users matched)
    - Matches
        - pending matches: ppl requested to match w ur room
            - poster: shows accept or decline button
            - seeker: shows requested
        - accepted matches:
            - shows email address

    **API:** Handles posts, users, matches

    - Posts
        - get all
        - get by filter
            - [https://softauthor.com/firebase-querying-sorting-filtering-database-with-nodejs-client](https://softauthor.com/firebase-querying-sorting-filtering-database-with-nodejs-client)
            - company
                - *companyName*
            - location
                - *cityName*
                - *stateName*
            - price
                - *priceValue*
    - User
        - get all user's posts
    - Matches
        - Poster
            - get all requested user
            - get all matched
        - Seeker
            - get all (seeker) requested user
            - get all matched

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
