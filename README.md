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
- firebase: database, auth
- dotenv: manage env config

## use case

- [x] create user info
- [x] update user info
- [x] get user info
- [ ] create item info
- [ ] update item info
- [ ] get item info
- [x] sign up
  - [x] verify email
    - [ ] issue: hide link's api key
- [x] login
- [x] logout
- [ ] check islogin when using api
  - [x] add login checker to middleware
  - [ ] manage cookie

## Reference

### How to manage JWT in Firebase

- <https://firebase.google.com/docs/auth/admin/verify-id-tokens?authuser=0>
- <https://firebase.google.com/docs/auth/admin/manage-sessions?authuser=0>
- <https://firebase.google.com/docs/auth/admin/manage-cookies?authuser=0#sign_in>
