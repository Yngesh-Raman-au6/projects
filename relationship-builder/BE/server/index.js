const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

const config = require("./config/key");

const mongoose = require("mongoose");
const connect = mongoose
	.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("MongoDB Connected..."))
	.catch((err) => console.log(err));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
const userRoutes = require("./routes/userRoutes");

app.get("/", (req, res) => {
	return res.send("Welcome to relationship API");
});
app.use("/users", userRoutes);
// app.use("/api/product", require("./routes/product"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("client/build"));

	// index.html for all page routes
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
	});
}

const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`Server Running at ${port}`);
});
