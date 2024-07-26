import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tagLine: {
      type: String,
      required: true,
    },
    introduction: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    specializations: {
      type: [String],
      required: true,
    },
    levels: {
      type: [String],
      required: true,
    },
    travelPreferences: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;
