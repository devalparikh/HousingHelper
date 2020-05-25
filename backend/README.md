## API Routes

---

```bash
@route **Get /users**

@desc Gets all users, (_id, username, createdAt, updatedAt)
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