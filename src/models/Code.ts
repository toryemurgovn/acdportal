import crypto from "crypto";
import mongoose from "mongoose";
import { default as User, UserModel } from "../models/User";

const Schema = mongoose.Schema;

export type CodeModel = mongoose.Document & {
  package_id: string,
  user_id: string,
  partner_id: string,
  user_email: string,
  inputed_at: Date,
  status: { type: boolean, default: true } // true = available to use
};

const codeSchema = new mongoose.Schema({
  package_id: { type: String, required: true },
  user_id: { type: String, default: "" },
  user_email: { type: String, default: "" },
  partner_id: Schema.Types.ObjectId,
  inputed_at: Date,
  status: { type: Boolean, default: true } // true = available to use
}, { timestamps: true });

// codeSchema.index({user_email: 1, package_id: 1}, {unique: true});

const Code = mongoose.model("Code", codeSchema);
export default Code;
