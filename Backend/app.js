require('dotenv').config();
console.log('Environment Variables:', process.env); // Log to check if environment variables are loaded

const express = require("express");
const routerAuth = require("./routes/auth");
const routerNotes = require("./routes/notes");

const mongoose = require('mongoose')
const cors = require("cors");
const app = express();

const PORT = process.env.PORT ||  5000;



mongoose.connect("mongodb://localhost:27017/iNotebook").then
(() => console.log( 'mongodb is connected'))
app.use(cors());
// app.options('*', cors());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

app.use(express.json());

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

app.use("/api/auth", routerAuth);
app.use("/api/notes", routerNotes);

app.listen(PORT, () => console.log("server started at PORT 5000"));
