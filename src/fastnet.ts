import { EventEmitter } from "events";
import * as http from "http";
import Request from "./request";
import Response from "./response";

/** -----------Types-------------- */

declare module "http" {
	interface IncomingMessage {
		body: any;
	}
}

/**-------------------------------- */

/**
 * TODO:
 *
 * Middleware functionality
 * handle that http method request
 */

class Application extends EventEmitter {
	middleware: { path: string; method: string; callback: (req: any, res: any, next?: any) => void }[];
	private request: Request;
	private response: Response;
	public proxy: boolean;
	public env: string;
	[key: string]: any;

	constructor(options?: any) {
		super();
		this.middleware = [];
		this.env = options?.env || process.env.NODE_ENV || "development";
		this.proxy = options?.proxy || false;
		this.request = Object.create(Request);
		this.response = Object.create(Response);
	}

	/**
	 * The `use` function in TypeScript is used to add middleware to an array, with an optional path and
	 * callback function.
	 * @param {any} args - The `args` parameter is an array of any type. It represents the arguments
	 * passed to the `use` function.
	 */
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

	listen(...args: any) {
		const server = http.createServer(this._handleRequest());
		return server.listen(...args);
	}

	_handleRequest() {
		const handleRequest = async (req: http.IncomingMessage, res: http.ServerResponse): Promise<void> => {
			this.request = new Request(req);
			this.response = new Response(res);
			await this.dispatch(0);
		};
		return handleRequest;
	}

	private async dispatch(index: number): Promise<void> {
		if (index < 0 || index >= this.middleware.length) {
			return Promise.resolve();
		}
		const layer = this.middleware[index];
		const next = async () => await this.dispatch(index + 1);
		try {
			const url = this.request.url;
			const method = this.request.method.toLocaleLowerCase();

			if ((layer.path === url && layer.method === method) || (layer.path === "" && layer.method === "")) {
				console.log(layer.method, layer.path);

				layer.callback(this.request, this.response, next);
			} else {
				next();
			}
		} catch (err) {
			return Promise.reject(err);
		}
	}

	get(path: string, callback: (...args: any) => Promise<void>): Application {
		return this;
	}
	post(path: string, callback: (...args: any) => void): Application {
		return this;
	}
	put(path: string, callback: (...args: any) => void) {}
	patch(path: string, callback: (...args: any) => void) {}
	delete(path: string, callback: (...args: any) => void) {}
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
