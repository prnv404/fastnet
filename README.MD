[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest) [![ESLint](https://img.shields.io/badge/code_style-eslint-4A90E2.svg)](https://eslint.org/) [![Husky](https://img.shields.io/badge/git_hooks-Husky-ff8c00.svg)](https://typicode.github.io/husky/) [![TypeScript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://typescriptlang.org) [![Open Source? Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github)](https://github.com/prnv404/fastnet)


# FastNet - A Minimalistic Node.js Web Framework

FastNet is a lightweight and easy-to-use Node.js web framework designed to streamline the process of building web servers. With a focus on simplicity and speed, FastNet allows developers to quickly create RESTful APIs and web applications with minimal boilerplate code.

## Features

- **Simplicity:** FastNet is designed to be easy to use and understand, making it an excellent choice for both beginners and experienced developers.
- **Routing:** Define routes effortlessly and handle HTTP requests with a clean and intuitive syntax.
- **Middleware Support:** Easily integrate middleware functions for customizing request and response handling.
- **JSON Body Parsing:** Parse JSON request bodies with built-in support for handling incoming data.
- **HTTP Methods:** Support for common HTTP methods including GET, POST, PUT, and DELETE.
- **Flexibility:** Customize your server to fit your needs without unnecessary complexities.

## Installation

To get started with FastNet, install it using npm:

```bash
npm install fastnet
```

## Usage


```typescript
// Import FastNet and necessary types
import FastNet, { Request, Response } from 'fastnet';

// Create an instance of FastNet
const app = new FastNet();

// Define a sample route
app.get('/hello', (req: Request, res: Response) => {
  res.send('Hello, FastNet!');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

```
---

# Reference 
---
## Request Object 

The `Request` object is designed to encapsulate and provide convenient access to properties and methods of an HTTP request represented by the `IncomingMessage` class from the "http" module. This documentation outlines the various functionalities provided by the `Request` class.

## Constructor

### `Request(req: IncomingMessage)`

Creates a new `Request` instance with the provided `IncomingMessage` object representing the HTTP request.

## Properties

### `header`

- **Description:** Gets or sets the headers of the request.
- **Getter:** Returns the `headers` property of the `req` object.
- **Setter:** Sets the value of the `headers` property in the `req` object to the provided value.

### `url`

- **Description:** Gets the URL of the current request.
- **Getter:** Returns the `url` property of the `req` object.

### `method`

- **Description:** Gets or sets the HTTP method of the request.
- **Getter:** Returns the HTTP method of the request object or an empty string if not defined.
- **Setter:** Sets the value of the "method" property in the `req` object to the provided value if it is a string.

### `body`

- **Description:** Asynchronously retrieves and parses the JSON body of an HTTP request.
- **Getter:** Returns a Promise that resolves with the parsed JSON body.

### `path`

- **Description:** Gets or sets the pathname of the requested URL.
- **Getter:** Returns the `pathname` property of the parsed URL from the `req` object or an empty string if not available.
- **Setter:** Sets the path of a URL if it is different from the current path.

### `params`

- **Description:** Gets or sets the parameters of the request.
- **Getter:** Returns the `params` property of the `req` object.
- **Setter:** Sets the value of the `params` property in the `req` object to the provided value.


### Response Object 

The `Response` object is designed to encapsulate and provide convenient methods for handling the server's HTTP response represented by the `ServerResponse` class from the "http" module. This documentation outlines the various functionalities provided by the `Response` class.

## Constructor

### `Response(res: ServerResponse)`

Creates a new `Response` instance with the provided `ServerResponse` object representing the HTTP response.

## Properties

### `socket`

- **Description:** Gets the underlying socket associated with the response.
- **Getter:** Returns the `socket` property of the `res` object.

### `status`

- **Description:** Gets or sets the HTTP status code of the response.
- **Getter:** Returns the status code of the response.
- **Setter:** Sets the HTTP status code of the response to the provided value.

## Methods

### `send(data: any)`

- **Description:** Sends data as the response body.
- **Parameters:**
  - `data` (any): The data to be sent as the response body.
- **Behavior:**
  - If `data` is an object, it will be converted to JSON and sent with the "application/json" content type.
  - If `data` is a string, it will be sent with the "text" content type.
  - The response headers are set accordingly.
  - The response is ended after sending the data.

---


# Example of Todo Application

```typescript
import FastNet, { Request, Response } from '../src/index'

const app = new FastNet();

const PORT = 3000;

let todos = [
	{ id: 1, text: "Learn Node.js", done: false },
	{ id: 2, text: "Build a TODO app", done: false }
];

// Get all todos
app.get("/todos", async (req: Request, res: Response) => {
	res.send(todos);
});

// Get a specific todo by ID
app.get("/todos/:id", async (req: Request, res: Response) => {
	const todoId = parseInt(req.params.id);	
	const todo = todos.find((t) => t.id === todoId);

	if (todo) {
		res.send(todo);
	} else {
		res.send({ error: "Todo not found" });
	}
});

// Create a new todo
app.post("/todos", async (req: Request, res: Response) => {
	const { text } = (await req.body) as any;
	const newTodo = {
		id: todos.length + 1,
		text,
		done: false
	};
	todos.push(newTodo);
	res.send(newTodo);
});

// Update a todo
app.put("/todos/:id", async (req: Request, res: Response) => {
	const todoId = parseInt(req.params.id);
	const { text } = (await req.body) as any;
	const todo = todos.find((t) => t.id === todoId);

	if (todo) {
		todo.text = text;
		res.send(todo);
	} else {
		res.send({ error: "Todo not found" });
	}
});

// Delete a todo
app.delete("/todos/:id", (req: Request, res: Response) => {
	const todoId = parseInt(req.params.id);
	todos = todos.filter((t) => t.id !== todoId);
	res.send({ message: "Todo deleted successfully" });
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

```
----


# Contributing

Contributions are welcome! There is a need for a lot of improvement to this because it is very minimal. Please open an issue or submit a pull request