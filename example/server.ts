import Response from "../src/response";
import FastNet from "../src/fastnet";
import Request from "../src/request";

const app = new FastNet();



app.get("/hello/:id", async (req: Request, res: Response) => {
	const id = req.params.id
	console.log(await req.body);
	res.send("finally its working yay!");
});

// app.post("/hello")

app.listen(3000, () => {
	console.log("server is listening on port 3000");
});
