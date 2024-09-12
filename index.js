import express from "express";
import dbconnect from "./db/dbconnections.js";

const app = express();

dbconnect();

app.listen(3000, () => {
    console.log("Server started on port 3000");
});