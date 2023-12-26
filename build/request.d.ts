/// <reference path="fastnet.d.ts" />
/// <reference types="node" />
/// <reference types="node/http" />
import { IncomingMessage } from "http";
declare class Request {
	private req;
	constructor(req: IncomingMessage);
	/**
	 * The function returns the headers of a request.
	 * @returns The `headers` property of the `req` object.
	 */
	get header(): import("http").IncomingHttpHeaders;
	/**
	 * The above function sets the value of the "header" property in the "req" object to the provided
	 * value.
	 * @param val - The `val` parameter is the value that will be assigned to the `headers` property of the
	 * `req` object.
	 */
	set header(val: import("http").IncomingHttpHeaders);
	/**
	 * The function returns the URL of the current request.
	 * @returns The `url` property of the `req` object.
	 */
	get url(): string | undefined;
	/**
	 * The function sets the value of a property called "method" if the input is a string.
	 * @param {string} val - The `val` parameter is of type `string`.
	 */
	set method(val: string);
	/**
	 * The above function returns the HTTP method of a request or an empty string if it is not available.
	 * @returns The method of the request object or an empty string if it is not defined.
	 */
	get method(): string;
	/**
	 * The above function returns a promise that resolves with the parsed JSON body of an HTTP request.
	 * @returns A Promise is being returned.
	 */
	get body(): Promise<unknown>;
	/**
	 * The function returns the pathname of the requested URL or an empty string if it cannot be parsed.
	 * @returns The `pathname` property of the parsed URL from the `req` object, or an empty string if the
	 * `pathname` is not available.
	 */
	get path(): string;
	/**
	 * The function sets the path of a URL if it is different from the current path.
	 * @param {string} path - The `path` parameter is a string that represents the new path that you want
	 * to set for the URL.
	 * @returns If the `url.pathname` is equal to the `path` parameter, then nothing is being returned.
	 */
	set path(path: string);
	set params(obj: any);
	get params(): any;
}
export default Request;
