const express = require("express");
const { cloudinaryConnect } = require("./Config/cloudinary");

const auth = require("./Routes/auth");
const courseRoutes = require("./Routes/courseRoutes");
const Section = require("./Routes/section");
/*const {paymentRoutes}=require("./Routes/paymentRoutes")*/
const profileRoutes = require("./Routes/profileRoutes")
const contactRoutes = require("./Routes/contactRoutes")

const fileUpload = require("express-fileupload");
const cors = require('cors')
const cookieParser = require("cookie-parser")
const app = express();
const PORT = process.env.PORT || 4000;

//body parser
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({
  extended: true
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}))


app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/", // temporary folder for files
  })
);



cloudinaryConnect();



//connect to database
const connectDB = require('./Config/db');
connectDB();



app.use("/studyNotion/auth", auth);
app.use("/studyNotion/Courseroutes", courseRoutes);
app.use("/studyNotion/sectionandsubsection", Section);
app.use("/studyNotion/profile", profileRoutes)
app.use("/studyNotion/contact", contactRoutes)
/*app.use("/studyNotion/payment",paymentRoutes)*/


app.get('/', (req, res) => {
  res.send("wecole to the backend of study notion")
})

app.listen(PORT, () => {
  console.log(`server is up and running at port ${PORT}`)
})