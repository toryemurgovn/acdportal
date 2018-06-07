import { Request, Response, NextFunction } from "express";
import { default as Package, PackageModel } from "../models/Package";
import { default as Code, CodeModel } from "../models/Code";
import { default as User, UserModel } from "../models/User";
import { default as Course } from "../models/Course";


export let courseAccessMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.redirect("/sign-in");
  }
  if (logicUserCanAccess(req.user, req.params.id)) {
    next();
  } else {
    return res.redirect("/dashboard");
  }
};

const logicUserCanAccess = (user, course_id = "#") => {
  if (user.capabilities["courses"]) {
    const coursePermission = user.capabilities["courses"];
    if (coursePermission[course_id]) {
      return true;
    }
  }
  return true;
} 