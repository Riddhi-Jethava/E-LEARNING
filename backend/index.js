const express = require("express");
const port = 2000;
const app = express();
const path = require("path")
const cors = require("cors");

app.use(express.urlencoded());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors({origin: "http://localhost:5173" }));
app.use("/", require("./routes"));

app.listen(port, (err) => {
    console.log(err ? err : `Server running on http://localhost:${port}`)
});