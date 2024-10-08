import mongoose from "mongoose";

const revokedTokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

const RevokedToken = mongoose.model("revokedTokens", revokedTokenSchema);

export default RevokedToken;
