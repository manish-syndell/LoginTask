const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const connection = require("./db");
const { sendToken } = require("./utils/tokens");
const userRoutes = require("./routes/userRoutes");
const permissonRoutes = require("./routes/permissionRoutes");

const app = express();
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use("/api", userRoutes);
app.use('/api',permissonRoutes)


app.get("/api/permissions", (req, res) => {
 });

  app.post("/api/permission/role", (req,res) => {

   
  });



app.post("/api/update/permissions", async (req, res) => {
  
  });

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
