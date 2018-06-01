import crypto from "crypto";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

export type UsercourseModel = mongoose.Document & {
  user_id: string,
  course_id: string,
  course_name: string,
  package_id: string,
  code_id: string
  // add expire time here
};

const usercourseSchema = new mongoose.Schema({
  user_id: {type: Schema.Types.ObjectId, required: true},
  course_id: {type: Schema.Types.ObjectId, required: true},
  course_name: String,
  package_id: {type: Schema.Types.ObjectId, required: true},
  code_id: {type: Schema.Types.ObjectId, required: true}
  // add expire time here

}, { timestamps: true });

const Usercourse = mongoose.model("Usercourse", usercourseSchema);

export default Usercourse;