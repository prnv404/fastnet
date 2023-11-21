import { EventEmitter } from "events";
import * as http from "http";
import Request from "./request";
import Response from "./response";

/** -----------Types-------------- */

interface HttpMethod {
	get(path: string, callback: () => void): void;
	post(callback: () => void): void;
}

/**-------------------------------- */

/**
 * Expose `Application` class.
 * Inherits from `Emitter.prototype`.
 */

class Application extends EventEmitter implements HttpMethod {
	middleware: [];
	request: Request;
	response: Response;
	proxy: boolean;
	env: string;
	[key: string]: any;
	constructor(options?: any) {
		super();
		this.middleware = [];
		this.env = options?.env || process.env.NODE_ENV || "development";
		this.proxy = options?.proxy || false;
		this.request = Object.create(Request);
		this.response = Object.create(Response);
	}

	craft() {}

	listen(...args: any) {
		const server = http.createServer(this.callback());
		return server.listen(...args);
	}

	callback() {
		const handleRequest = (req: http.IncomingMessage, res: http.ServerResponse) => {
			// const request = new Request(req);
			// const response = new Response(res);
			res.end("hello world");
		};
		return handleRequest;
	}

	get(path: string, callback: () => void) {
		callback();
	}

	post(callback: () => void) {
		callback();
	}
}

const Methods = ["get", "post", "delete", "put", "patch"];

Methods.forEach((verb) => {
	function setHttpMethod(verb: string) {
		Application.prototype[verb] = function (callback: () => void) {
			// this.middleware.push(callback)
			callback;
		};
	}
	setHttpMethod(verb);
});

export default Application;
