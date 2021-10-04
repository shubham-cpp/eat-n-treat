const express = require("express");
//const mongoose = require("mongoose");
//const dotEnv = require("dotenv");

const DATABASE_URL="mongodb+srv://nidhimsingh:OsphZ3wDsAI7xUZg@cluster0.rwf0v.mongodb.net/eatandtreat?retryWrites=true&w=majority"
const PORT = process.env.PORT || 8080;

dotEnv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "http://localhost:3000");
  res.header('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

// mongoose
//   .connect(process.env.DATABASE_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to db");

 app.get("/", (req,res) => {
   res.send("Connected baackend").end();
 });
   app.listen(PORT, () => {
       console.log("Server is running",PORT);
   });
//   })
//   .catch((err) => console.log(err));

// app.use("/customer", require("./routes/customer"));
// app.use("/restaurant", require("./routes/resturants"));
// app.use("/admin", require("./routes/admin"));
// app.use("/order", require("./routes/order"));