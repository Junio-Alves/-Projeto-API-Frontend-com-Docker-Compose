import app from "./app";

const port = process.env.APP_PORT;

app.listen(port,()=>{
    console.log(`${process.env.APP_URL}:${process.env.APP_PORT}`);
});