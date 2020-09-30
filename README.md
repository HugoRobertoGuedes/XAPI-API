# XAPI-API
API design to meet E-learning model standards Experience API


# This app using `REDIS` and `MongoDB`

- inform host and port do redis in `.env` file


# Steps to start app
 1. run comands

  ```bash
    yarn install
  ```
 
 2. create `.env` file and inform enviroments

```env
# SERVER
HOST=http://localhost:
PORT=3331
NODE_ENV=development

# MONGO DB
MONGO_HOST=
MONGO_PORT=
MONGO_AUTH=SCRAM-SHA-1
MONGO_USER=
MONGO_PASS=

# REDIS
REDIS_HOST=localhost
REDIS_PORT=7001

# KEYS
SECRET_KEY=
```

 3. run comand to test app

  ```bash
    yarn test
  ```

 4. run comand to start
  
  ```bash
    yarn start
  ```