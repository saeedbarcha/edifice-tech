import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default:"03123456789"
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default:""
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isTeamMember: {
      type: Boolean,
      required: true,
      default: false,
    },
    companyCode: {
      type: String,
      required: true,
      enum: ["12345"],
    },
    skill: {
      type: String,
      default:"software engineer"
    },
    designation:{
      type:String,
    },
    description: {
      type: String,
      default:""
    },
    fiverrUrl: {
      type: String,
      default:"#"
    },
    upworkUrl: {
      type: String,
      default:"#"
    }
    ,
    githubUrl: {
      type: String,
      default:"#"
    },
    facebookUrl: {
      type: String,
      default:"#"
    },
    instagramUrl: {
      type: String,
      default:"#"
    },
    linkedInUrl: {
      type: String,
      default:"#"
    },
    enrolledCourses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    }],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
