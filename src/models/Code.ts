import crypto from "crypto";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

export type CodeModel = mongoose.Document & {
  package_id: string,
  user_id: string,
  partner_id: string,
  status: { type: boolean, default: true } // true = available to use
};

const codeSchema = new mongoose.Schema({
  package_id: { type: String, required: true },
  user_id: { type: String, default: "" },
  partner_id: Schema.Types.ObjectId,
  status: { type: Boolean, default: true } // true = available to use
}, { timestamps: true });

const Code = mongoose.model("Code", codeSchema);
export default Code;