# Blog API

A robust RESTful API for a blogging platform, built with **Node.js**, **Express**, **Prisma**, and **TypeScript**. The project follows a feature-based architecture with a clear separation between public and admin routes.

---

## Features

* User authentication with **JWT** (Signup & Signin).
* JWT token validation.
* Full **CRUD** for posts (admin only).
* Separation of public routes (listing/reading) and admin routes (create/edit/delete).
* Image upload for post covers with **Multer**.
* Pagination for post listings.
* Automatic generation of unique slugs for post titles.
* Related post search by tags.
* Centralized and robust error handling.

---

## Tech Stack

* **Backend:** Node.js, Express.js
* **ORM:** Prisma
* **Database:** MySQL
* **Language:** TypeScript
* **Authentication:** Passport.js (with `passport-jwt` strategy)
* **File Uploads:** Multer
* **Validation:** Zod
* **Development Runtime:** `tsx`

---

## Getting Started

Follow these steps to run the project locally:

```bash
# 1. Clone the repository
git clone https://github.com/Jbampa/blog-api-node.git
cd blog-api-node

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env
# Edit the .env file and provide your own values

# 4. Run Prisma migrations
npx prisma migrate dev

# 5. Start the development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## Environment Variables

Create a `.env` file with the following variables:

| Variable       | Description                   | Example                            |
| -------------- | ----------------------------- | ---------------------------------- |
| `PORT`         | Port where the server runs    | `3000`                             |
| `DATABASE_URL` | MySQL connection string       | `mysql://root@localhost:3306/blog` |
| `JWT_SECRET`   | Secret key to sign JWT tokens | `1234`                             |
| `BASE_URL`      | Base URL for static files     | `http://localhost:3000/`           |

---

### Public Endpoints

#### `GET /posts`

List all published posts.

**Query Parameters:**

* `page` (optional): Page number.

**Response:**

```json
{
  "posts": [
    {
      "id": 1,
      "title": "Example Post",
      "createdAt": "2025-09-21T12:00:00Z",
      "cover": "cover.jpg",
      "authorName": "John Doe",
      "tags": ["node", "api"],
      "slug": "example-post"
    }
  ],
  "page": 1
}
```

#### `GET /posts/:slug`

Get a single published post.

**Response:**

```json
{
  "post": {
    "id": 1,
    "title": "Example Post",
    "createdAt": "2025-09-21T12:00:00Z",
    "cover": "cover.jpg",
    "authorName": "John Doe",
    "tags":"node, api",
    "body": "Post content...",
    "slug": "example-post"
  }
}
```

#### `GET /posts/related/:slug`

List published posts with similar tags.

**Response:**

```json
{
  "posts": [
    {
      "id": 2,
      "title": "Another Post",
      "createdAt": "2025-09-21T12:00:00Z",
      "cover": "cover2.jpg",
      "authorName": "Jane Doe",
      "tags": "node",
      "slug": "another-post"
    }
  ]
}
```

---

### Authentication Endpoints

#### `POST /auth/signup`

Register a new user.

**Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "strongpassword"
}
```

**Response:**

```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt-token"
}
```

#### `POST /auth/signin`

Authenticate an existing user.

**Body:**

```json
{
  "email": "john@example.com",
  "password": "strongpassword"
}
```

**Response:**

```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt-token"
}
```

#### `GET /validate`

Validate the JWT token and return the user data.

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### Admin Endpoints (JWT Required)

#### `GET /admin/posts`

List all posts (published and drafts).

**Headers:**

```
Authorization: Bearer <token>
```

**Query Parameters:**

* `page` (optional): Page number.

**Response:**

```json
{
  "posts": [
    {
      "id": 1,
      "status": "PUBLISHED",
      "title": "Example Post",
      "createdAt": "2025-09-21T12:00:00Z",
      "cover": "cover.jpg",
      "authorName": "John Doe",
      "tags": "node, api",
      "slug": "example-post"
    }
  ],
  "page": 1
}
```

#### `GET /admin/posts/:slug`

Retrieve a post (published or draft).

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "post": {
    "id": 1,
    "title": "Example Post",
    "createdAt": "2025-09-21T12:00:00Z",
    "cover": "cover.jpg",
    "authorName": "John Doe",
    "tags": "node, api",
    "body": "Post content...",
    "slug": "example-post"
  }
}
```

#### `POST /admin/posts`

Create a new post.

**Headers:**

```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Body:**

```
status: PUBLISHED | DRAFT
title: string
tags: comma-separated string
body: string
cover: file
```

**Response:**

```json
{
  "post": {
    "id": 2,
    "status": "PUBLISHED",
    "title": "New Post",
    "createdAt": "2025-09-21T12:00:00Z",
    "cover": "cover2.jpg",
    "authorName": "John Doe",
    "tags": "typescript",
    "slug": "new-post"
  }
}
```

#### `PUT /admin/posts/:slug`

Edit a post.

**Headers:**

```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Body (all optional):**

```
status: PUBLISHED | DRAFT
title: string
tags: comma-separated string
body: string
cover: file
```

**Response:**

```json
{
  "post": {
    "id": 2,
    "status": "PUBLISHED",
    "title": "Updated Post",
    "createdAt": "2025-09-21T12:00:00Z",
    "cover": "cover3.jpg",
    "authorName": "John Doe",
    "tags": "typescript",
    "slug": "updated-post"
  }
}
```

#### `DELETE /admin/posts/:slug`

Delete a post.

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```
204 No Content
```

---

## Author

**Jbampa**

