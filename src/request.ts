import { IncomingMessage } from "http";
import parseurl from "parseurl";

export class Request {
	private req: IncomingMessage;

	constructor(req: IncomingMessage) {
		this.req = req;
	}

	/**
	 * The function returns the headers of a request.
	 * @returns The `headers` property of the `req` object.
	 */
	get header() {
		return this.req.headers;
	}

	/**
	 * The above function sets the value of the "header" property in the "req" object to the provided
	 * value.
	 * @param val - The `val` parameter is the value that will be assigned to the `headers` property of the
	 * `req` object.
	 */
	set header(val) {
		this.req.headers = val;
	}

	/**
	 * The function returns the URL of the current request.
	 * @returns The `url` property of the `req` object.
	 */
	get url() {
		return this.req.url;
	}

	/**
	 * The function sets the value of a property called "method" if the input is a string.
	 * @param {string} val - The `val` parameter is of type `string`.
	 */
	set method(val: string) {
		if (typeof val === "string") {
			this.req.method = val;
		}
	}

	/**
	 * The above function returns the HTTP method of a request or an empty string if it is not available.
	 * @returns The method of the request object or an empty string if it is not defined.
	 */
	get method() {
		return this.req.method || "";
	}

	/**
	 * The above function returns a promise that resolves with the parsed JSON body of an HTTP request.
	 * @returns A Promise is being returned.
	 */
	get body() {
		return new Promise((resolve, reject) => {
			let body = "";
			let result;
			this.req.on("data", (chunk) => {
				body += chunk.toString("utf-8");
			});

			this.req.on("end", () => {
				try {
					if (body.length !== 0) {
						this.req.body = JSON.parse(body);
						result = this.req.body;
					} else {
						result = null;
					}
					resolve(result);
				} catch (error) {
					reject(error);
				}
			});
		});
	}

	/**
	 * The function returns the pathname of the requested URL or an empty string if it cannot be parsed.
	 * @returns The `pathname` property of the parsed URL from the `req` object, or an empty string if the
	 * `pathname` is not available.
	 */
	get path() {
		return parseurl(this.req)?.pathname || "";
	}

	/**
	 * The function sets the path of a URL if it is different from the current path.
	 * @param {string} path - The `path` parameter is a string that represents the new path that you want
	 * to set for the URL.
	 * @returns If the `url.pathname` is equal to the `path` parameter, then nothing is being returned.
	 */
	set path(path: string) {
		const url = parseurl(this.req);
		if (url?.pathname === path) return;
		if (url?.pathname) {
			url.pathname = path;
			url.path = null;
		}
	}
	set params(obj: any) {
		this.req.params = obj;
	}

	get params() {
		return this.req.params;
	}
}

