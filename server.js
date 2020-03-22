if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", __dirname + "/frontend/views");
app.set("layout", "layouts/layout");
app.use(bodyParser.json());
app.use(express.static("./frontend/public"));

//routes
app.use("/", require("./backend/routes/training"));

//connecting to database
const mongoose = require("mongoose");
const db = mongoose.connection;
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to mongodb..."));

//server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on port ${port}..`));
