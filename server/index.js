const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");

dotEnv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to db");

    app.listen(process.env.PORT, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => console.log(err));

app.use("/customer", require("./routes/customer"));
app.use("/restaurant", require("./routes/resturants"));
app.use("/admin", require("./routes/admin"));
app.use("/order", require("./routes/order"));
