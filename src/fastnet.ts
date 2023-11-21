import { EventEmitter } from "events";
import * as http from "http";

/** -----------Types-------------- */

/**-------------------------------- */

/**
 * Expose `Application` class.
 * Inherits from `Emitter.prototype`.
 */

class FastNet extends EventEmitter {
	middleware: [];
	request: any;
	response: any;
	proxy: boolean;
	env: string;
	constructor(options?: any) {
		super();
		this.middleware = [];
		this.env = options?.env || process.env.NODE_ENV || "development";
		this.proxy = options?.proxy || false;
	}

	listen(...args: any) {
		const server = http.createServer(() => {});
		return server.listen(...args);
	}
}

export default FastNet;
