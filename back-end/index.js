const express = require('express');
const { chats } = require("./data/data.js")
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()


app.use(cors());
app.get("/", (req, res) => {
    res.send("Server is running")
})

app.get("/api/chat", (req, res) => {
    res.send(chats)
})

app.get("/api/chat/:id", (req, res) => {

    // const data = JSON.stringify(req.params.id);
    // console.log(data);
    console.log(req.params.id);
    const singleChat = chats.find(c => c._id === req.params.id);
    res.send(singleChat);
})
const PORT = process.env.PORT || 5001

app.listen(PORT, console.log("Server started on PORT 5001"));