/**_______Types__________ */

import { ServerResponse } from "http";

/**______________________ */

class Response {
	private res: ServerResponse;

	constructor(res: ServerResponse) {
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

	set status(code: number) {
		this.res.statusCode = code;
	}

	send(data: any) {
		if (typeof data === "object") {
			const buff = Buffer.from(JSON.stringify(data));
			console.log(buff);
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

export default Response;
