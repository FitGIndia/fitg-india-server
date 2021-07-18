//Imports
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const gymRoutes = require("./routes/gym");

// var corsOptions = {
//   origin: "*",
//   optionsSuccessStatus: 200 
// }


//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());


//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", gymRoutes);


//PORT
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
  console.log(`Server is up & running at port ${port}`);
});
