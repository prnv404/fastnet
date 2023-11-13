// example.ts

import { Server } from "http";
import FastNet from "../lib/fastnet";

const app = new FastNet();

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
