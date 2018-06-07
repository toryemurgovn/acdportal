import { Request, Response } from "express";
import Course from "../models/Course";
import Code from "../models/Code";
import Package from "../models/Package";

export const viewCourseIndex = (req: Request, res: Response) => {
  const codeId = req.params.id;
  Code.find({ id: codeId }, (err, code: any) => {
    if (err || !code) {
      req.flash("errors", <any>{ msg: "The code is invalid!" });
      return res.redirect("/dashboard/courses");
    }
    Package.findOne({ id: code.package_id }, (err, packageModel: any) => {
      if (err || !packageModel) {
        req.flash("errors", <any>{ msg: "The package is invalid!" });
        return res.redirect("/dashboard/courses");
      }
      console.log(packageModel);
      console.log(packageModel.course);
      res.render("assignment/index", {
        package: packageModel,
        course: packageModel.course
      });
    });
  });
};

export const applyCode = (req: Request, res: Response) => {
  if (req.user && req.user.role === "user") {
    const code = req.body.code;
    console.log(" UserID " + req.user._id + "  apply code: " + code);
    Code.findById(code, (err, codeInfo: any) => {
      if (err) {
        return res.json({ code: 100, msg: "This Code doesn't exist" });
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
    return res.json({ message: "Can not apply", code: 422 });
  }
};

export const requestPackage = (req: Request, res: Response) => {
  Package.find({ status: false }, (err, reqPackages) => {
    res.render("dashboard/admin/request-package", {
      reqPackages: reqPackages
    });
  });
};