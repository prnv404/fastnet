import { IncomingMessage } from "http";
/** __________Types__________ */

interface IRequest {
	header: any;
	headers: any;
	url: string;
	// origin: string;
	// href: string;
	method: string;
	// path: string;
	// query: { [key: string]: string | string[] };
	// querystring: string;
	// search: string;
	// host: string;
	// hostname: string;
}

/**____________________________ */
class Request implements IRequest {
	private req: IncomingMessage;

	constructor(req: IncomingMessage) {
		this.req = req;
	}
	get header() {
		return this.req.headers;
	}

	set header(val) {
		this.req.headers = val;
	}

	get headers() {
		return this.req.headers;
	}

	set headers(val) {
		this.req.headers = val;
	}

	get url() {
		return this.req.url || "";
	}

	set method(val: string) {
		if (typeof val === "string") {
			this.req.method = val;
		}
	}

	get method() {
		return this.req.method || "";
	}

	// get path() {
	// 	return parseUrl(this.req).pathname || "";
	// }

	// set path(val) {
	// 	const url = parseUrl(this.req);
	// 	if (url.pathname === val) return;

	// 	url.pathname = val;
	// 	url.path = null;

	// 	this.url = stringify(url);
	// }

	// get query() {
	// 	const str = this.querystring;
	// 	const c: { [key: string]: any } = {};
	// 	return c[str] || (c[str] = qs.parse(str));
	// }

	// set query(obj) {
	// 	this.querystring = qs.stringify(obj);
	// }

	// get querystring() {
	// 	if (!this.req) return "";
	// 	return parseUrl(this.req).query || "";
	// }

	// set querystring(str) {
	// 	const url = parseUrl(this.req);
	// 	if (url.search === `?${str}`) return;

	// 	url.search = str;
	// 	url.path = null;

	// 	this.url = stringify(url);
	// }

	// get search() {
	// 	if (!this.querystring) return "";
	// 	return `?${this.querystring}`;
	// }

	// set search(str) {
	// 	this.querystring = str;
	// }

	// get host() {
	// 	const proxy = this.app.proxy;
	// 	let host = proxy && this.get("X-Forwarded-Host");
	// 	if (!host) {
	// 		if (this.req.httpVersionMajor >= 2) host = this.get(":authority");
	// 		if (!host) host = this.get("Host");
	// 	}
	// 	if (!host) return "";
	// 	return host.split(/\s*,\s*/, 1)[0];
	// }

	// get hostname() {
	// 	const host = this.host;
	// 	if (!host) return "";
	// 	if (host[0] === "[") return this.URL.hostname || ""; // IPv6
	// 	return host.split(":", 1)[0];
	// }

	// Implement the rest of the properties/methods as needed
}

export default Request;
