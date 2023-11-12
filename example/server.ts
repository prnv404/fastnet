import FastNet from "../lib/fastnet";

const app = new FastNet();

app.use((req, res, next) => {
	console.log("Hello world");
});

app.listen(3000, () => {
	console.log("server is listening on port 3000");
});

console.log(app);
