import express from "express";
import cors from "cors";

import UsersController from "./users/users-controller.js";
import mongoose from "mongoose";
import session from "express-session";

// mongoose.connect("mongodb://127.0.0.1:27017/tuiter-sp23-06");
mongoose.connect("mongodb+srv://zhuge:good@cluster0.kx04lve.mongodb.net/project?retryWrites=true&w=majority");


const app = express();
//app.use(cors());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(
  session({
    secret: "process.env.SECRET",
    resave: false,
    cookie: { secure: false },
  })
);
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

UsersController(app);


app.listen(process.env.PORT || 4000);
