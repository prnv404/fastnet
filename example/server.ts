import Response from "../src/response";
import FastNet from "../src/fastnet";
import Request from "../src/request";
const app = new FastNet();

interface CustomRequest extends Request {
	hello: string;
}

app.use(async (req: CustomRequest, res: Response, next: any) => {
	req.hello = "hello world";
	// console.log('hello');
	console.log(req.hello);

	await next();
});

app.get("/hello", async (req: CustomRequest, res: Response) => {
	res.send(req.hello);
}).post("/hello", (req: CustomRequest, res: Response) => {
	res.send(req.hello);
});

app.use(async (req: CustomRequest, res: Response, next: any) => {
	req.hello = "world hello";
	console.log(req.hello);
	await next();
});
// app

app.listen(3000, () => {
	console.log("server is listening on port 3000");
});
