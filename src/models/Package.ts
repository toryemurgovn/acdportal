import crypto from "crypto";
import mongoose from "mongoose";
import { courses } from "../controllers/dashboard";
import { CourseModel } from "./Course";

const Schema = mongoose.Schema;

export type PackageModel = mongoose.Document & {
  partner_id: string,
  partner_email: string,
  course_id: string,
  course: CourseModel,
  quantity: { type: number, default: 100 },
  describe: string,
  status: { type: number, default: 0 } // 0 = pendding, 1 = active, 2 = disactived
};

const packageSchema = new mongoose.Schema({
  partner_id: Schema.Types.ObjectId,
  partner_email: String,
  quantity: Number,
  describe: String,
  course_id: {type: Schema.Types.ObjectId, required: true},
  course: {type: Object, required: true},
  status: { type: Number, default: 0 } // true = available to use
}, { timestamps: true });

const Package = mongoose.model("Package", packageSchema);
export default Package;