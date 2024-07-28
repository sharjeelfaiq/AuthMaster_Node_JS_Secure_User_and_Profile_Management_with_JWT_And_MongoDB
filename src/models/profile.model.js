import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    tagLine: {
      type: String,
      required: true,
      trim: true,
      minlength: [100, "Tag line must be at least 100 characters long"],
    },
    introduction: {
      type: String,
      required: true,
      trim: true,
      minlength: [500, "Introduction must be at least 500 characters long"],
    },
    profilePicture: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    idImage: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d{7,10}$/, "Phone number must be between 7 and 10 digits"],
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("profiles", ProfileSchema);

export default Profile;
