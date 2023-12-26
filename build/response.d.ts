/**_______Types__________ */
/// <reference path="fastnet.d.ts" />
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node/http" />
import { ServerResponse } from "http";
/**______________________ */
export declare class Response {
    private res;
    constructor(res: ServerResponse);
    /**
     *
     * @returns socket
     */
    get socket(): import("net").Socket | null;
    get status(): number;
    set status(code: number);
    send(data: any): void;
}
