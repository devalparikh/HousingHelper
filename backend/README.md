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