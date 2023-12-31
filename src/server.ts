import express from "express";
import mpgRouter from "./routes.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api', mpgRouter);

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});