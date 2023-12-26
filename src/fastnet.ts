import { EventEmitter } from "events";
import * as http from "http";
import { Request } from "./request";
import { Response } from "./response";

/** -----------Types-------------- */

declare module "http" {
	interface IncomingMessage {
		body: Record<string, any>;
		params: any;
	}
}

class Application extends EventEmitter {
	middleware: {
		path: string;
		method: string;
		callback: (req: any, res: any, next?: any) => void;
	}[];
	private request: Request;
	private response: Response;
	[key: string]: any;

	constructor(options?: any) {
		super();
		// middleware array
		this.middleware = [];
		this.request = Object.create(Request);
		this.response = Object.create(Response);
	}

	/* The `use` method in the code is used to add middleware to the application. It takes in any number of
arguments using the rest parameter syntax (`...args: any`). */
	use(...args: any) {
		let path: string;
		let callback: any;
		if (typeof args[0] === "string") {
			path = args[0];
			callback = args[1];
		} else {
			path = "";
			callback = args[0];
		}
		if (typeof callback !== "function") {
			throw TypeError("Middleware function must be a Function");
		}
		this.middleware.push({ path, method: "", callback });
	}

	/**
	 * The function creates an HTTP server and listens for incoming requests.
	 * @param {any} args - The `args` parameter is a rest parameter that allows you to pass any number of
	 * arguments to the `listen` method. These arguments will be forwarded to the `server.listen` method,
	 * which is responsible for starting the HTTP server and listening for incoming requests on a specified
	 * port and hostname.
	 * @returns The `listen` method is returning the result of calling `server.listen(...args)`.
	 */
	listen(...args: any) {
		const server = http.createServer(this._handleRequest());
		return server.listen(...args);
	}

	/**
	 * The function `_handleRequest` is a TypeScript function that handles incoming HTTP requests and
	 * processes them.
	 * @returns The function `_handleRequest` is returning the function `handleRequest`.
	 */
	private _handleRequest() {
		const handleRequest = async (
			req: http.IncomingMessage,
			res: http.ServerResponse
		): Promise<void> => {
			this.request = new Request(req);
			this.response = new Response(res);
			await this.process(0);
		};
		return handleRequest;
	}

	/**
	 * The `process` function is an asynchronous function that processes middleware layers based on the
	 * request URL and method.
	 * @param {number} index - The `index` parameter is the current index of the middleware array that is
	 * being processed. It is used to iterate through each middleware layer in a recursive manner.
	 * @returns a Promise<void>.
	 */
	private async process(index: number): Promise<void> {
		if (index < 0 || index >= this.middleware.length) {
			return Promise.resolve();
		}

		const layer = this.middleware[index];
		const next = async () => await this.process(index + 1);

		try {
			const url = this.request.url?.split("?")[0];
			const method = this.request.method.toLocaleLowerCase();
			const urlSegments = url?.split("/").filter(Boolean);
			const layerSegments = layer.path.split("/").filter(Boolean);
			console.log(urlSegments);
			console.log(layerSegments);

			if (
				layerSegments.length === urlSegments!.length &&
				layerSegments.every(
					(segment, i) => segment === urlSegments![i] || segment.startsWith(":")
				) &&
				layer.method === method
			) {
				this.request.params = {};
				// Extract route parameters and add them to the request object
				urlSegments!.forEach((segment, i) => {
					if (i < layerSegments.length && layerSegments[i].startsWith(":")) {
						const paramName = layerSegments[i].slice(1);
						this.request.params[paramName] = segment;
					}
				});

				// Execute the callback of the matched middleware layer
				layer.callback(this.request, this.response, next);
			} else {
				next();
			}
		} catch (err) {
			return Promise.reject(err);
		}
	}

	/**
	 * The function "get" adds a route to the application that listens for GET requests on the specified
	 * path and executes the provided callback function.
	 * @param {string} path - A string representing the URL path for the route. For example, "/users" or
	 * "/products".
	 * @param callback - A function that takes in any number of arguments and returns a Promise that
	 * resolves to void.
	 * @returns The `Application` object is being returned.
	 */
	get(path: string, callback: (req: Request, res: Response) => Promise<void>): Application {
		return this;
	}
	/**
	 * The post function in TypeScript adds a route to the application for handling HTTP POST requests.
	 * @param {string} path - A string representing the URL path for the route. For example, "/users" or
	 * "/products/123".
	 * @param callback - The callback parameter is a function that will be executed when the specified path
	 * is requested. It can take any number of arguments of any type.
	 * @returns The method is returning the current instance of the Application class.
	 */
	post(path: string, callback: (req: Request, res: Response) => void): Application {
		return this;
	}
	/**
	 * The `put` function is used to define a route for handling HTTP PUT requests.
	 * @param {string} path - A string representing the path or URL for the route.
	 * @param callback - A function that will be executed when the specified path is accessed. The function
	 * can take any number of arguments.
	 * @returns The `put` method is returning the current instance of the object.
	 */
	put(path: string, callback: (req: Request, res: Response) => void) {
		return this;
	}
	/**
	 * The function "patch" takes a path and a callback function as parameters and returns the current
	 * object.
	 * @param {string} path - A string representing the path or URL of the resource to be patched. This can
	 * be a relative or absolute path.
	 * @param callback - The callback parameter is a function that takes in any number of arguments and
	 * does not return anything.
	 * @returns The "this" keyword is being returned.
	 */
	patch(path: string, callback: (req: Request, res: Response) => void) {
		return this;
	}
	/**
	 * The delete function takes a path and a callback function as parameters and returns the current
	 * object.
	 * @param {string} path - A string representing the path of the resource to be deleted. This could be a
	 * file path or a URL path.
	 * @param callback - The callback parameter is a function that will be called once the delete operation
	 * is completed. It can take any number of arguments, but it doesn't return any value.
	 * @returns The `delete` method is returning `this`, which refers to the current object.
	 */
	delete(path: string, callback: (req: Request, res: Response) => void) {
		return this;
	}
}

const Methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

Methods.forEach((verb) => {
	Application.prototype[verb.toLowerCase()] = function (path: string, ...args: any): Application {
		const callback = args[0];
		this.middleware.push({ path, method: verb.toLowerCase(), callback });
		return this;
	};
});

export default Application;
