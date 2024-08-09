import mongoose from "mongoose";

const UserDetailsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "profiles",
    },
    qualifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "qualifications",
      },
    ],
  },
  { timestamps: true }
);

const UserDetails = mongoose.model("userDetails", UserDetailsSchema);

export default UserDetails;
