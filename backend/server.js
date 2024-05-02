import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import educationRoutes from "./routes/educationRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js"
import projectRoutes from "./routes/projectRoutes.js"
import galleryRoutes from "./routes/galleyRoutes.js"
import aboutCompanyRoutes from "./routes/aboutCompanyRoutes.js"
import admissionBatchRoutes from "./routes/admissionBatchRoutes.js"
import enrollmentRoutes from "./routes/enrollmentRoutes.js"
import serviceRoutes from "./routes/serviceRoutes.js"
import faqsRoutes from "./routes/faqsRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

import uploadRoutes from "./routes/uploadRoutes.js";


const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/products", productRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/about-company", aboutCompanyRoutes);
app.use("/api/admission-batch", admissionBatchRoutes);
app.use("/api/enrollment", enrollmentRoutes)
app.use("/api/blogs", blogRoutes);
app.use("/api/service", serviceRoutes)
app.use("/api/faqs", faqsRoutes);
app.use("/api/reviews", reviewRoutes);




const __dirname = path.resolve(); 
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
