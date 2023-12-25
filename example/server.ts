import Response from "../src/response";
import FastNet from "../src/fastnet";
import Request from "../src/request";

const app = new FastNet();

// app.use(async (req: Request, res: Response, next: any) => {
// 	console.log("Hey I am called for no reason (middleware)");
// 	 next();
// });

app.get("/hello/:id", async (req: Request, res: Response) => {
	console.log(req.params);
	console.log(await req.body);
	res.send("finally its working yay!");
});

// app.post("/hello", async (req: Request, res: Response) => {
// 	const body = await req.body;
// 	res.send(body);
// });

app.listen(3000, () => {
	console.log("server is listening on port 3000");
});
