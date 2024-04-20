import mongoose from "mongoose";

const { Schema } = mongoose;

const aboutCompanySchema = new Schema(
  {
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
      },
    logoImage: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
      default: "F-Name",
    },
    lastName: {
      type: String,
      required: true,
      default: "F-Name",
    },
    phone: {
      type: String,
      default: "+923000000000",
    },
    whatsApp: {
      type: String,
      default: "+923000000000",
    },
    address: {
      type: String,
      default: "location",
    },
    establishDate: {
      type: Date,
    },
    aboutUs: {
      type: String,
      required: true,
      default: "we are working ...",
    },
    emailAddress: {
        type: String,
        default: "#",
      },
    facebookPageUrl: {
      type: String,
      default: "#",
    },
    instagramPageUrl: {
      type: String,
      default: "#",
    },
    linkedInPageUrl: {
      type: String,
      default: "#",
    },
  },
  {
    timestamps: true,
  }
);

const AboutCompany = mongoose.model("AboutCompany", aboutCompanySchema);

export default AboutCompany;
