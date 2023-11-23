// example.ts

import { Server } from "http";
import FastNet from "../src/fastnet";

const app = new FastNet();

let server: Server;
beforeAll(() => {
	server = app.listen(3001);
});

describe("Testing Application", () => {
	it("server should run", () => {
		expect(server).toBeDefined();
	});
});

afterAll(() => {
	server.close();
});
