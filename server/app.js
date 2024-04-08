const path = require("path");
const express = require("express");
const morgan = require("morgan")
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");

/* Logging Middleware */
app.use(morgan("dev"));

/* Body parsing middleware */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
/* Static file-serving middleware */

app.use(express.static(path.join(__dirname, "..", "client/dist")));

/* Check requests for a token and attach the decoded id to request */

app.use((req, res, next) => {
    const auth = req.headers.authorization;
    const token = auth?.startsWith("Bearer") ? auth.slice(7) : null;

    try {
        req.user = jwt.verify(token, process.env.JWT)
    } catch {
        req.user = null;
    }

    next();
});

/* Backend routes */

app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

/* Serves the HTML file that vite builds */

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client/dist/index.html"));
});

/* Error handling mmiddleware */

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error");
});

app.use((req, res) => {
    res.status(404).send("Not found");
});

module.exports = app;
