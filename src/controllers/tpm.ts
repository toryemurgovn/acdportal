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
      res.render("assignment/index", {
        package: packageModel,
        course: packageModel.course
      });
    });
  });
};

export const requestPackage = (req: Request, res: Response) => {
  Package.find({ status: false }, (err, reqPackages) => {
    res.render("dashboard/admin/request-package", {
      reqPackages: reqPackages
    });
  });
};