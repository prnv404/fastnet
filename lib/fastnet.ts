import { EventEmitter } from "events";
import * as http from "http";

type MiddlewareFunction = (req: Request, res: Response, next?: () => void) => void;

/**
 * Expose `Application` class.
 * Inherits from `Emitter.prototype`.
 */
class Application extends EventEmitter {
	public middleware: MiddlewareFunction[];
	public request: any;
	public response: any;
	public context: any;
	public proxy: boolean;
	public env: string;

	constructor(options?: any) {
		super();
		this.middleware = [];
		this.env = options?.env || process.env.NODE_ENV || "development";
		this.proxy = options?.proxy || false;
	}

	/**
	 * The "listen" function creates a server using the http module and calls the "listen" method on the
	 * server with the provided arguments.
	 * @param args - The `args` parameter is a rest parameter that allows you to pass any number of
	 * arguments to the `listen` function. The type of each argument should match the parameters of the
	 * `listen` method of the `http.Server` prototype.
	 */
	listen(...args: Parameters<typeof http.Server.prototype.listen>) {
		const server = http.createServer();
		return server.listen(...args);
	}

	/**
	 * The `use` function adds a middleware function to an array of middleware functions.
	 * @param {MiddlewareFunction} fn - The parameter `fn` is a middleware function that will be added to
	 * the `middleware` array.
	 * @returns The "use" function is returning the instance of the object on which it is called.
	 */
	use(fn: MiddlewareFunction) {
		if (typeof fn !== "function") throw new TypeError("middleware must be a function");
		this.middleware.push(fn);
		return this;
	}
}

export default Application;
