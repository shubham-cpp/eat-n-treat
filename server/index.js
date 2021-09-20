const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const dotEnv = require("dotenv")
console.log("process.env.DATABASE_URL")
console.log("process.env.PORT")
dotEnv.config()
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
mongoose.connect(process.env.DATABASE_URL,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
    )
    .then(() => console.log("Connected to db"))
    .catch((err) => { console.log("err") 
})

app.use("/customer",require("./routes/customer"));
app.use("/restaurant",require("./routes/resturants"));
app.listen(process.env.PORT, () => { console.log("Server is running") })