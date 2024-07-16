import mongoose from "mongoose";

const revokedTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
});

const RevokedToken = mongoose.model("RevokedToken", revokedTokenSchema);

export default RevokedToken;
