import { Request, Response, NextFunction } from "express";
import { default as Package, PackageModel } from "../models/Package";
import { default as Code, CodeModel } from "../models/Code";
import { default as Course } from "../models/Course";

export let index = (req: Request, res: Response) => {
  if (!req.user) {
    return res.redirect("/sign-in");
  }
  Course.find({}, function (err, courses) {
    res.render("dashboard/index", {
      courses: courses
    });
  });
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
    Code.find({ user_id: req.user._id }, (err, listCode) => {
      let packages = [];
      if (listCode) {
        listCode.forEach((item: any) => {
          packages.push(item.package_id);
        });
        Package.find({_id: packages}, (err, db_packages) => {
          packages = <any> {};
          db_packages.forEach((item) => {
            packages[item._id] = item;
          });
          res.render("dashboard/courses", {
            courses: listCode,
            packages: packages
          });
        });
      }
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
  Course.find({}, function (err, courses) {
    Package.find({ partner_id: partner.id }, (err, listPackage) => {
      res.render("dashboard/packages", {
        partner: partner,
        listPackage: listPackage,
        courses: courses
      });
    });
  });
};

export let packageDetail = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.redirect("/sign-in");
  }
  const package_id = req.params.id;
  Package.findOne({ _id: package_id }, (err, packageData) => {
    if (err) { console.log(err); return next(err); }
    const pId = packageData["id"];
    Code.find({ package_id: pId }).exec((err, codes) => {
      // console.log(codes);
      res.render("dashboard/package-detail", {
        codes: codes,
        package: packageData,
      });
    });
  });
};