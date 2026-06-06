import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./utils/db.js";

import userRoute from "./routes/userRoute.js";;
import companyRoute from "./routes/companyRoute.js";
import jobRoute from "./routes/jobRoute.js";
import applicationRoute from "./routes/applicationRoute.js";




const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);






app.listen(PORT, () => {
    connectDB();
    console.log(`Server Is Running ${PORT}`)
});