import crypto from "crypto";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

export type CourseModel = mongoose.Document & {
  name: string,
  questions: Array<Object>,
  status: { type: number, default: 0 }
};

const courseSchema = new mongoose.Schema({
  name: String,
  questions: Array,
  status: { type: Number, default: 0 }
}, { timestamps: true });

const Course = mongoose.model("Course", courseSchema);

export default Course;