import { Request, Response, NextFunction } from "express";
import { default as Package, PackageModel } from "../models/Package";
import { default as Code, CodeModel } from "../models/Code";
import { default as User, UserModel } from "../models/User";
import { default as Course } from "../models/Course";


export let courseAccessMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.redirect("/sign-in");
  }
  capabilities(req.user).then((caps) => {
    res.locals.userCapabilities = caps;
  });

  // res.locals.userCapabilities = await capabilities(req.user);
  next();
};

// utils

const capabilities = async (user: any) => {
  // check source access
  const canDo = <any> {};
  if (user.role === "user") {
    let packages = [];
    const courses = <any> {};
    // get all course he/she can access
    await Code.find({user_id: user._id}, async (err, userCodes) => {
      if (userCodes) {
        userCodes.forEach((item: any) => {
          packages.push(item.package_id);
        });
        await Package.find({_id: packages}, (err, db_packages) => {
          packages = <any> {};
          db_packages.forEach((item: any) => {
            packages[item._id] = item;
            courses[item.course_id] = item.course;
          });

          canDo["packages"] = packages;
          canDo["courses"] = courses;
          return canDo;
        });
      }
    });
  }
};
