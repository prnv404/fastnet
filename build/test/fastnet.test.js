"use strict";
// example.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastnet_1 = __importDefault(require("../src/fastnet"));
const app = new fastnet_1.default();
let server;
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
