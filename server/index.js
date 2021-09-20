const express = require("express");

const PORT = process.env.PORT || 5000;

const app = express();

app.get("/api", (req, res) => {
    res.json({ message: "Hello from Express!" });
  });
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get('/', function(req, res, next) {
    res.send("Express server running");
});