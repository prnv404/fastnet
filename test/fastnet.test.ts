// example.ts

import { Server } from "http";
import FastNet from "../src/fastnet";

const app =  FastNet();

let server: Server;
beforeAll(() => {
	server = app.listen(3000);
});

describe("Testing Application", () => {
	it("server should run", () => {
		expect(server).toBeDefined();
	});
});

afterAll(() => {
	server.close();
});
