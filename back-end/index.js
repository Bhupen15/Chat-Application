const express = require('express');
const { chats } = require("./data/data.js")
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js')


dotenv.config()
connectDB();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Server is running")
})

app.use('/api/user', userRoutes)

const PORT = process.env.PORT || 5001

app.listen(PORT, console.log("Server started on PORT 5001"));