import Response from "../src/response";
import FastNet from "../src/fastnet";
import Request from "../src/request";

const app = new FastNet();

app.use(async (req: Request, res: Response, next: any) => {
	console.log("Hey I am called for no reason (middleware)");
	await next();
});

app.get("/hello", async (req: Request, res: Response) => {
	res.send("hello world");
});

app.post("/hello", async (req: Request, res: Response) => {
	const body = await req.body;
	res.send(body);
});

app.listen(3000, () => {
	console.log("server is listening on port 3000");
});
