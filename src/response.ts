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
}

export default Response;
