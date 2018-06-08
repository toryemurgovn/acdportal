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
  res.render("dashboard/courses");
};

export let packages = (req: Request, res: Response) => {
  if (!req.user) {
    return res.redirect("/sign-in");
  }
  const partner = req.user;
  Course.find({}, function (err, courses) {
    Package.find({ partner_id: partner.id }).sort({status: "asc"}).exec((err, listPackage) => {
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
  Package.findOne({_id: package_id }, (err, packageData: any) => {
    if (err) {
      req.flash("errors", <any>{ msg: "The package is invalid!" });
      return res.redirect(req.session.returnTo || "/dashboard/packages");
    }
    if (packageData) {
      if (packageData.status != 1) {
        req.flash("errors", <any>{ msg: "The package is invalid!" });
        return res.redirect(req.session.returnTo || "/dashboard/packages");
      } else {
        const pId = packageData["id"];
        Code.find({ package_id: pId }).exec((err, codes) => {
          res.render("dashboard/package-detail", {
            codes: codes,
            package: packageData,
          });
        });
      }
    }
  });
};