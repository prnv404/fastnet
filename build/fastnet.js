"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const http = __importStar(require("http"));
const request_1 = require("./request");
const response_1 = require("./response");
class Application extends events_1.EventEmitter {
    constructor(options) {
        super();
        // middleware array
        this.middleware = [];
        this.request = Object.create(request_1.Request);
        this.response = Object.create(response_1.Response);
    }
    /* The `use` method in the code is used to add middleware to the application. It takes in any number of
arguments using the rest parameter syntax (`...args: any`). */
    use(...args) {
        let path;
        let callback;
        if (typeof args[0] === "string") {
            path = args[0];
            callback = args[1];
        }
        else {
            path = "";
            callback = args[0];
        }
        if (typeof callback !== "function") {
            throw TypeError("Middleware function must be a Function");
        }
        this.middleware.push({ path, method: "", callback });
    }
    /**
     * The function creates an HTTP server and listens for incoming requests.
     * @param {any} args - The `args` parameter is a rest parameter that allows you to pass any number of
     * arguments to the `listen` method. These arguments will be forwarded to the `server.listen` method,
     * which is responsible for starting the HTTP server and listening for incoming requests on a specified
     * port and hostname.
     * @returns The `listen` method is returning the result of calling `server.listen(...args)`.
     */
    listen(...args) {
        const server = http.createServer(this._handleRequest());
        return server.listen(...args);
    }
    /**
     * The function `_handleRequest` is a TypeScript function that handles incoming HTTP requests and
     * processes them.
     * @returns The function `_handleRequest` is returning the function `handleRequest`.
     */
    _handleRequest() {
        const handleRequest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            this.request = new request_1.Request(req);
            this.response = new response_1.Response(res);
            yield this.process(0);
        });
        return handleRequest;
    }
    /**
     * The `process` function is an asynchronous function that processes middleware layers based on the
     * request URL and method.
     * @param {number} index - The `index` parameter is the current index of the middleware array that is
     * being processed. It is used to iterate through each middleware layer in a recursive manner.
     * @returns a Promise<void>.
     */
    process(index) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (index < 0 || index >= this.middleware.length) {
                return Promise.resolve();
            }
            const layer = this.middleware[index];
            const next = () => __awaiter(this, void 0, void 0, function* () { return yield this.process(index + 1); });
            try {
                const url = (_a = this.request.url) === null || _a === void 0 ? void 0 : _a.split("?")[0];
                const method = this.request.method.toLocaleLowerCase();
                const urlSegments = url === null || url === void 0 ? void 0 : url.split("/").filter(Boolean);
                const layerSegments = layer.path.split("/").filter(Boolean);
                if ((layerSegments.length === urlSegments.length &&
                    layerSegments.every((segment, i) => segment === urlSegments[i] || segment.startsWith(":"))) ||
                    layer.method === method ||
                    layer.method === "") {
                    this.request.params = {};
                    // Extract route parameters and add them to the request object
                    urlSegments.forEach((segment, i) => {
                        if (layerSegments[i].startsWith(":")) {
                            const paramName = layerSegments[i].slice(1);
                            this.request.params[paramName] = segment;
                        }
                    });
                    // Execute the callback of the matched middleware layer
                    layer.callback(this.request, this.response, next);
                }
                else {
                    // No match, proceed to the next middleware layer
                    next();
                }
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }
    /**
     * The function "get" adds a route to the application that listens for GET requests on the specified
     * path and executes the provided callback function.
     * @param {string} path - A string representing the URL path for the route. For example, "/users" or
     * "/products".
     * @param callback - A function that takes in any number of arguments and returns a Promise that
     * resolves to void.
     * @returns The `Application` object is being returned.
     */
    get(path, callback) {
        return this;
    }
    /**
     * The post function in TypeScript adds a route to the application for handling HTTP POST requests.
     * @param {string} path - A string representing the URL path for the route. For example, "/users" or
     * "/products/123".
     * @param callback - The callback parameter is a function that will be executed when the specified path
     * is requested. It can take any number of arguments of any type.
     * @returns The method is returning the current instance of the Application class.
     */
    post(path, callback) {
        return this;
    }
    /**
     * The `put` function is used to define a route for handling HTTP PUT requests.
     * @param {string} path - A string representing the path or URL for the route.
     * @param callback - A function that will be executed when the specified path is accessed. The function
     * can take any number of arguments.
     * @returns The `put` method is returning the current instance of the object.
     */
    put(path, callback) {
        return this;
    }
    /**
     * The function "patch" takes a path and a callback function as parameters and returns the current
     * object.
     * @param {string} path - A string representing the path or URL of the resource to be patched. This can
     * be a relative or absolute path.
     * @param callback - The callback parameter is a function that takes in any number of arguments and
     * does not return anything.
     * @returns The "this" keyword is being returned.
     */
    patch(path, callback) {
        return this;
    }
    /**
     * The delete function takes a path and a callback function as parameters and returns the current
     * object.
     * @param {string} path - A string representing the path of the resource to be deleted. This could be a
     * file path or a URL path.
     * @param callback - The callback parameter is a function that will be called once the delete operation
     * is completed. It can take any number of arguments, but it doesn't return any value.
     * @returns The `delete` method is returning `this`, which refers to the current object.
     */
    delete(path, callback) {
        return this;
    }
}
const Methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];
Methods.forEach((verb) => {
    Application.prototype[verb.toLowerCase()] = function (path, ...args) {
        const callback = args[0];
        this.middleware.push({ path, method: verb.toLowerCase(), callback });
        return this;
    };
});
exports.default = Application;
