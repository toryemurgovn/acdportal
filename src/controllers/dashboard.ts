import { Request, Response, NextFunction } from "express";
import { default as Package, PackageModel } from "../models/Package";
import { default as Code, CodeModel } from "../models/Code";
import { default as Usercourse, UsercourseModel } from "../models/Usercourse";

export let index = (req: Request, res: Response) => {
  if (!req.user) {
    return res.redirect("/sign-in");
  }
  res.render("dashboard/index");
};

export let profile = (req: Request, res: Response) => {
  if (!req.user) {
    return res.redirect("/sign-in");
  }
  res.render("dashboard/profile");
};

export let courses = (req: Request, res: Response) => {
  if (!req.user) {
    return res.redirect("/sign-in");
  }
  if (req.user.role === "user") {
    Usercourse.find({ user_id: req.user._id}, (err, listCourse) => {
      res.render("dashboard/courses", {
        courses: listCourse
      });
    });
  } else {
    res.render("dashboard/courses");
  }
};

export let packages = (req: Request, res: Response) => {
  if (!req.user) {
    return res.redirect("/sign-in");
  }
  const partner = req.user;
  Package.find({ partner_id: partner.id }, (err, listPackage) => {
    res.render("dashboard/packages", {
      partner: partner,
      listPackage: listPackage
    });
  });
};

export let packageDetail = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.redirect("/sign-in");
  }
  const package_id = req.params.id;
  console.log("ID ne: " + package_id);

  Package.findOne({ _id: package_id }, (err, packageData) => {
    if (err) { console.log(err); return next(err); }
    const pId = packageData["id"];
    console.log(packageData);
    Code.find({ package_id: pId }).limit(10).exec((err, codes) => {
      console.log(codes);
      res.render("dashboard/package-detail", {
        codes: codes,
        package: packageData,
      });
    });
  });
};