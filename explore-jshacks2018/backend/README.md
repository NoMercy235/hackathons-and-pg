Exploore API
==================================


Getting Started
---------------

```sh
# clone it
TBA

# Navigate to it
cd exploore

# Install dependencies
npm install

# Start development:
npm start
```

Create a `config.js` file in the `src` directory with the following template:

```javascript
{
    "secret": "secret_string for password encryption",
    "database": "mongo url"
}
```


Docker Support
------

For best experience, you should use the `docker-compose` command.

```sh
cd exploore

# Build your docker
docker build -t exploore .
#            ^           ^
#            tag name    Dockerfile location

# run your docker
docker run -p 8080:8080 exploore
#          ^            ^
#          bind the     container tag
#          port to your
#          host machine port

```

Or you can use `docker-compose` in order to spin up both the app and the mongo db and create a network with the two of them:

```sh
cd exploore

docker-compose build
docker-compose up -d

# For shutdown and cleanup
docker-compose down

```

License
-------

MIT
