require("dotenv").config();
const mongoose = require("mongoose");
const counterModel = require("./model/counterModel.js");
const express = require("express");
const app = express();

app.use(express.static("./public"));
app.get("/test", (req,res)=>{res.send("Server Running!");});

const booksRouter = require("./router/books.js");
app.use("/api/books", booksRouter);

mongoose.connect(process.env.DB_URL).then(async ()=>{
    console.log("MongoDB Connected!");
    if (!(await counterModel.findOne())) {
        const nowCounter = new counterModel({id: 1});
        await nowCounter.save();
        console.log("Initializing Counter");
    }
});

app.get("*", (req,res)=>{
    res.status(301).redirect("/index.html");
});

app.listen(process.env.PORT || 3000, ()=>{console.log(`Running ${process.env.PORT || 3000}!`);});