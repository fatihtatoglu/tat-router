# TAT Router

TAT Router is a lightweight Node.js library for handling HTTP requests based on the URL path and HTTP method.

## Installation

```js
npm install tat-router
```

## Usage

### Creating a router instance

```js
const Router = require("router");

const router = new Router((res) => {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.write("404 - Not found!")
  res.end();
});
```

### Adding routes

```js
router.add("GET", "/", (res)=>{
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.write("Hello world!");
  res.end();
});

router.add("GET", "/users/:name", (res, params) => {
  const name = params.name;

  res.writeHead(200, {"Content-Type": "text/plain"});
  res.write(`Hello ${name}!`);
  res.end();
});

router.add("GET", "/users/:userId/posts/:postId?", (res, params)=>{
  const userId = params.userId;
  const postId = params.postId || "latest";

  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(`{userId: "${userId}", postId: "${postId}"}`);
  res.end();
});
```

### Handling requests

```js
const req = {
  method: "GET",
  url: "http://localhost"
};

router.navigate(req, res);
// Hello world!
```

```js
const req = {
  method: "GET",
  url: "http://localhost/users/fatih"
};

router.navigate(req, res);
// Hello fatih!
```

```js
const req = {
  method: "GET",
  url: "http://localhost/users/12/posts/"
};

router.navigate(req, res);
// {userId: "12", postId: "latest"}
```

```js
const req = {
  method: "GET",
  url: "http://localhost/users/12/posts/34"
};

router.navigate(req, res);
// {userId: "12", postId: "34"}
```

### Connecting with HTTP module

```js
http.createServer((req, res) => {
    router.navigate(req, res);
}).listen(3000);
```

## API

### Router(notFoundHandler)

- `notFoundHandler`: Function to be executed when no matching route is found.

Represents a router that can handle HTTP requests with specified routes and methods.

### router.add(method, pattern, handler)

- `method`: HTTP method of the route.
- `pattern`: URL path of the route (e.g., "/users/:id").
- `handler`: Function to be executed when the route is matched.

Adds a new route to the router with specified method, path and handler.

### router.navigate(method, url)

- `req`: The IncomingMessage object represents the request to the server.
- `res`: The ServerResponse object represents the writable stream back to the client.

Navigates to the route that matches.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](./LICENSE)
