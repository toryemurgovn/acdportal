import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

export type PackageModel = mongoose.Document & {
  partner_id: string,
  quantity: { type: number, default: 100 },
  describe: string,
  status: { type: boolean, default: true } // true = available to use 
};

const packageSchema = new mongoose.Schema({
  partner_id: Schema.Types.ObjectId,
  quantity: Number,
  describe: String,
  status: { type: Boolean, default: true } // true = available to use 
}, { timestamps: true });

const Package = mongoose.model("Package", packageSchema);
export default Package;