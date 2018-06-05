import crypto from "crypto";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

export type CourseModel = mongoose.Document & {
  name: string,
  questions: Array<Object>
};

const courseSchema = new mongoose.Schema({
  name: String,
  questions: Array
}, { timestamps: true });

const Course = mongoose.model("Course", courseSchema);

export default Course;