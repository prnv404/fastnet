/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node/http" />
import { EventEmitter } from "events";
import * as http from "http";
import { Request } from "./request";
import { Response } from "./response";
/** -----------Types-------------- */
declare module "http" {
    interface IncomingMessage {
        body: Record<string, any>;
        params: any;
    }
}
declare class Application extends EventEmitter {
    middleware: {
        path: string;
        method: string;
        callback: (req: any, res: any, next?: any) => void;
    }[];
    private request;
    private response;
    [key: string]: any;
    constructor(options?: any);
    use(...args: any): void;
    /**
     * The function creates an HTTP server and listens for incoming requests.
     * @param {any} args - The `args` parameter is a rest parameter that allows you to pass any number of
     * arguments to the `listen` method. These arguments will be forwarded to the `server.listen` method,
     * which is responsible for starting the HTTP server and listening for incoming requests on a specified
     * port and hostname.
     * @returns The `listen` method is returning the result of calling `server.listen(...args)`.
     */
    listen(...args: any): http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
    /**
     * The function `_handleRequest` is a TypeScript function that handles incoming HTTP requests and
     * processes them.
     * @returns The function `_handleRequest` is returning the function `handleRequest`.
     */
    private _handleRequest;
    /**
     * The `process` function is an asynchronous function that processes middleware layers based on the
     * request URL and method.
     * @param {number} index - The `index` parameter is the current index of the middleware array that is
     * being processed. It is used to iterate through each middleware layer in a recursive manner.
     * @returns a Promise<void>.
     */
    private process;
    /**
     * The function "get" adds a route to the application that listens for GET requests on the specified
     * path and executes the provided callback function.
     * @param {string} path - A string representing the URL path for the route. For example, "/users" or
     * "/products".
     * @param callback - A function that takes in any number of arguments and returns a Promise that
     * resolves to void.
     * @returns The `Application` object is being returned.
     */
    get(path: string, callback: (req: Request, res: Response) => Promise<void>): Application;
    /**
     * The post function in TypeScript adds a route to the application for handling HTTP POST requests.
     * @param {string} path - A string representing the URL path for the route. For example, "/users" or
     * "/products/123".
     * @param callback - The callback parameter is a function that will be executed when the specified path
     * is requested. It can take any number of arguments of any type.
     * @returns The method is returning the current instance of the Application class.
     */
    post(path: string, callback: (req: Request, res: Response) => void): Application;
    /**
     * The `put` function is used to define a route for handling HTTP PUT requests.
     * @param {string} path - A string representing the path or URL for the route.
     * @param callback - A function that will be executed when the specified path is accessed. The function
     * can take any number of arguments.
     * @returns The `put` method is returning the current instance of the object.
     */
    put(path: string, callback: (req: Request, res: Response) => void): this;
    /**
     * The function "patch" takes a path and a callback function as parameters and returns the current
     * object.
     * @param {string} path - A string representing the path or URL of the resource to be patched. This can
     * be a relative or absolute path.
     * @param callback - The callback parameter is a function that takes in any number of arguments and
     * does not return anything.
     * @returns The "this" keyword is being returned.
     */
    patch(path: string, callback: (req: Request, res: Response) => void): this;
    /**
     * The delete function takes a path and a callback function as parameters and returns the current
     * object.
     * @param {string} path - A string representing the path of the resource to be deleted. This could be a
     * file path or a URL path.
     * @param callback - The callback parameter is a function that will be called once the delete operation
     * is completed. It can take any number of arguments, but it doesn't return any value.
     * @returns The `delete` method is returning `this`, which refers to the current object.
     */
    delete(path: string, callback: (req: Request, res: Response) => void): this;
}
export default Application;
