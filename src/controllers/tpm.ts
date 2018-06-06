import { Request, Response } from "express";
import { default as Course, CourseModel } from "../models/Course";
import { default as Code, CodeModel } from "../models/Code";
import { default as Package, PackageModel } from "../models/Package";

export const viewCourseIndex = (req: Request, res: Response) => {
  res.redirect("/dashboard/courses");
};

export const applyCode = (req: Request, res: Response) => {
  if (req.user && req.user.role === "user") {
    const code = req.body.code;
    console.log(" UserID " + req.user._id + "  apply code: " + code);
    Code.findById(code, (err, codeInfo: any) => {
      if (err) {
        return res.json({code: 100, msg: "This Code doesn't exist"});
      }
      if (codeInfo) {
        const isExistCode = codeInfo.user_email && codeInfo.user_email !== req.user.email;
        if (codeInfo.status == false || codeInfo.user_id || isExistCode) {
          return res.json({ msg: "Your code has been used", code: 100 });
        }

        codeInfo.user_id = req.user._id;
        codeInfo.user_email = req.user.email;
        codeInfo.inputed_at = new Date();
        codeInfo.status = false;
        codeInfo.save(function (err) {
          if (err) {
            return res.json({ msg: err.message.toString(), code: 100 });
          }
          return res.json({ msg: "Code successfully updated!", code: 200 });
        });
      }
    });

  } else {
    return res.json({ message: "Can not apply", errorCode: 422 });
  }
};

export const requestPackage = (req: Request, res: Response) => {
  Package.find({status: false}, (err, reqPackages) => {
    res.render("dashboard/admin/request-package", {
      reqPackages: reqPackages
    });
  });
}