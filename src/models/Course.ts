import crypto from "crypto";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

export type CourseModel = mongoose.Document & {
  name: string,
};

const courseSchema = new mongoose.Schema({
  name: String,
}, { timestamps: true });

const Course = mongoose.model("Course", courseSchema);

export default Course;