import FastNet from "../src/fastnet";

const app = FastNet();

// app.get("/", () => {
// 	console.log("helo world");
// });

// app.post(() => {
// 	console.log("helloworld");
// });

app.listen(3000, () => {
	console.log("server is listengin");
});
