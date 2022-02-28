# Node.js Firebase Application

## Command

- install dependency

```shell
yarn
```

- start server

```shell
yarn start
```

- start dev server

```shell
yarn serve
```

## Package

- express: http web server
  - cookie-parser: parse http cookie
  - csurf: handle CSRF attack
  - cors: handle CORS
- firebase: database, auth
- firebase-admin: admin SDK to manage user
- dotenv: manage env config

## Structure

- admin.js: initialize firebase admin app
- config.js: manage environment variables
- firebase.js: initialize firebase app
- index.js: start express web app
- userInfo.js: handle user's information data

## use case

### user information

- [x] create user info
- [x] update user info
- [x] get user info
  - [x] return cache data if don't update info: use LRU cache

### item information

- [ ] create item info
- [ ] update item info
- [ ] get item info

### Authorization

#### Server

- [x] sign up
  - [x] verify email
    - [ ] issue: hide link's api key
- [ ] check logged when using api
  - [x] add login checker to middleware
  - [x] manage cookie
  - [x] add csrf
  - [ ] refresh expiration token
- [x] Session
  - [x] Login
    - [ ] After cookie expires, actions?
    - [ ] Its check speed is too late... (about 1sec)
  - [x] Logout

#### Client

- [x] login
- [x] logout

## Reference

### How to manage JWT in Firebase

- <https://firebase.google.com/docs/auth/admin/verify-id-tokens?authuser=0>
- <https://firebase.google.com/docs/auth/admin/manage-sessions?authuser=0>
- <https://firebase.google.com/docs/auth/admin/manage-cookies?authuser=0#sign_in>

### Apply CSURF to Backend & Frontend to block CSRF

- <https://www.youtube.com/watch?v=N5U7KtxvVto>
- Backend
  - <https://github.com/jimmythecode/CSURF-Tutorial-Back-End>
- Frontend
  - <https://github.com/jimmythecode/CSURF-Tutorial-Front-End>

### Firebase Login Form Error

- <https://stackoverflow.com/questions/38860900/firebase-project-results-in-auth-network-request-failed-error-on-login>

## Todo

### Web

- [x] Login Web page
- [x] Session Login
- [x] Session Logout
- [x] Get user information
- [x] Login Form

## Study

- cookie
- sameSite
- CORS
- CSRF
- credential
- set-cookie
- cross-site
