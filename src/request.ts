import { IncomingMessage } from "http";
import parseurl from "parseurl";

class Request {
	private req: IncomingMessage;

	constructor(req: IncomingMessage) {
		this.req = req;
	}

	/**
	 * @
	 */
	get header() {
		return this.req.headers;
	}

	set header(val) {
		this.req.headers = val;
	}

	get url() {
		return this.req.url;
	}

	set method(val: string) {
		if (typeof val === "string") {
			this.req.method = val;
		}
	}

	get method() {
		return this.req.method || "";
	}

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

	get path() {
		return parseurl(this.req)?.pathname || "";
	}

	set path(path: string) {
		const url = parseurl(this.req);
		if (url?.pathname === path) return;
		if (url?.pathname) {
			url.pathname = path;
			url.path = null;
		}
	}
}

export default Request;
