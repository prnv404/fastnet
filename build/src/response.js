"use strict";
/**_______Types__________ */
Object.defineProperty(exports, "__esModule", { value: true });
/**______________________ */
class Response {
	constructor(res) {
		this.res = res;
	}
	/**
	 *
	 * @returns socket
	 */
	get socket() {
		return this.res.socket;
	}
	get status() {
		return this.res.statusCode;
	}
	set status(code) {
		this.res.statusCode = code;
	}
	send(data) {
		if (typeof data === "object") {
			const buff = Buffer.from(JSON.stringify(data));
			this.res.setHeader("Content-Type", "application/json");
			this.res.write(buff);
		}
		if (typeof data === "string") {
			this.res.setHeader("Content-Type", "text");
			this.res.write(data);
		}
		this.res.end();
	}
}
exports.default = Response;
