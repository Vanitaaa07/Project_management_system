const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/dashboard");
const adminRoutes = require("./routes/admin");
const verifyRoutes = require('./routes/verify');
const { verifyJWT } = require("./middleware/auth");
const connectDB = require("./db/connect");

require("dotenv").config();
const server = express();
const PORT = process.env.PORT || 3000;

//DB connection
// mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParse: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false
// }).then(()=>{
//   console.log('Database Connected.');
// }).catch((err) => console.log('error'));

//mongodb+srv://vanitakhathuria7:<password>@cluster0.sfpwjjz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

//body parser
//server.use(bodyParser.json());
server.use(express.json());
server.use(cors());

//Routes
server.use("/api/auth", authRoutes);
server.use("/api/verify", verifyRoutes);
server.use("/api/projects", verifyJWT, projectRoutes);
server.use("/api/admin", verifyJWT, adminRoutes);

/*server.use((err, req, res, next) => {
  if (err instanceof SyntaxError) { // Check if the error is a JSON parsing error
      return res.status(400).json({ message: 'Invalid JSON format' });
  }
  next();
});*/

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(PORT, console.log(`server is listening on port ${PORT}...`));
  } catch (error) {}
};

start();

// server.listen(PORT, ()=>{
//     console.log(`Server is running on ${PORT}`);
// });
