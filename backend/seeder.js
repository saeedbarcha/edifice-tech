import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import courses from "./data/courses.js";
import education from "./data/education.js";
import experience from "./data/experience.js";
import projects from "./data/projects.js";
import blogs from "./data/blog.js";
import gallery from "./data/gallery.js";
import aboutCopmany from "./data/aboutCompany.js";
import admissionBatch from "./data/admissionBatch.js";
import service from "./data/service.js";
import faqs from "./data/faq.js";


import User from "./models/userModel.js";
import Course from "./models/courseModel.js";
import Product from "./models/productModel.js";
import Education from "./models/educationModel.js";
import Experience from "./models/experienceModel.js";
import Project from "./models/projectModel.js";
import Blog from "./models/blogModel.js";
import Gallery from "./models/galleryModel.js";
import AboutCompany from "./models/aboutCompanyModel.js";
import AdmissionBatch from "./models/admissionBatchModel.js";
import Enrollment from "./models/enrollmentModel.js";
import Service from "./models/serviceModel.js";
import Faqs from "./models/faqsModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await AdmissionBatch.deleteMany();
    await AboutCompany.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();
    await Education.deleteMany();
    await Experience.deleteMany();
    await Blog.deleteMany();
    await Project.deleteMany();
    await Gallery.deleteMany();
    await Enrollment.deleteMany();
    await Service.deleteMany();
    await Faqs.deleteMany();


    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    //    insetring about comapny data
    const sampleAboutCompany = aboutCopmany.map((aboutComp) => {
      return { ...aboutComp, user: adminUser };
    });
    await AboutCompany.insertMany(sampleAboutCompany);

    //    insetring courses
    const sampleCourses = courses.map((course) => {
      return { ...course, user: adminUser };
    });
    await Course.insertMany(sampleCourses);

    //    insetring Products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);

    //    insetring education
    const sampleEducation = education.map((edu) => {
      return { ...edu, user: adminUser };
    });
    await Education.insertMany(sampleEducation);

    //    insetring experience
    const sampleExperience = experience.map((exp) => {
      return { ...exp, user: adminUser };
    });
    await Experience.insertMany(sampleExperience);

    //    insetring projects
    const sampleProjects = projects.map((project) => {
      return { ...project, user: adminUser };
    });
    await Project.insertMany(sampleProjects);

    //    insetring blog
    const sampleBlog = blogs.map((blog) => {
      return { ...blog, user: adminUser };
    });
    await Blog.insertMany(sampleBlog);

    //    insetring gallery image
    const sampleGallery = gallery.map((gallery) => {
      return { ...gallery, user: adminUser };
    });
    await Gallery.insertMany(sampleGallery);

    //    insetring gallery image
    const sampleAdmissionBatch = admissionBatch.map((admissionbacha) => {
      return { ...admissionbacha, user: adminUser };
    });
    await AdmissionBatch.insertMany(sampleAdmissionBatch);

    //    insetring service 
    const sampleService = service.map((ser) => {
      return { ...ser, user: adminUser };
    });
    await Service.insertMany(sampleService);


    //    insetring faqs 
    const sampleFaq = faqs.map((faq) => {
      return { ...faq, user: adminUser };
    });
    await Faqs.insertMany(sampleFaq);

    console.log("Data Imporded!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// delete data
const destroyData = async () => {
  try {
    await AdmissionBatch.deleteMany();
    await AboutCompany.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();
    await Education.deleteMany();
    await Experience.deleteMany();
    await Blog.deleteMany();
    await Project.deleteMany();
    await Gallery.deleteMany();
    await Enrollment.deleteMany();
    await Service.deleteMany();
    await Faqs.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
