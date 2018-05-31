import passport from "passport";
import { IVerifyOptions } from "passport-local";
import { WriteError } from "mongodb";
import { Request, Response, NextFunction } from "express";

import { default as User, UserModel } from "../models/User";
import { default as Package, PackageModel } from "../models/Package";
import { default as Code, CodeModel } from "../models/Code";

const request = require("express-validator");

export let application = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("partner/application");
};

export let postApplication = (req: Request, res: Response, next: NextFunction) => {
  req.assert("email", "Email is not valid").isEmail();
  req.assert("password", "Password must be at least 4 characters long").len({ min: 4 });
  req.assert("confirmPassword", "Passwords do not match").equals(req.body.password);
  req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });

  const errors = <any> req.validationErrors();
  if (errors) {
    req.flash("errors", errors);
    return res.redirect("/sign-up-partner");
  }
  const user = <any> new User({
    email: req.body.email,
    password: req.body.password,
    role: "partner"
  });

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) { next(err); }
    if (existingUser) {
      req.flash("errors", <any>  { msg: "Account with that email address already exists." });
      return res.redirect("/sign-up-partner");
    }
    user.save((err) => {
      if (err) { next(err); }
      const pack = partnerPackageDefault(user);
      pack.save((error) => {
        console.log(err);
        if (err) { next(err); }
      });
      req.logIn(user, (err) => {
        if (err) {
          next(err);
        }
        return res.redirect("/dashboard");
      });
    });
  });
};

const partnerPackageDefault = (partner) => {
  console.log("Create default package for partner: " + partner.id);
  return new Package({
    partner_id: partner.id,
    quantity: 1000,
    describle: "Default package",
    status: true
  });
};

export let viewPackage = (req: Request, res: Response, next: NextFunction) => {
  const package_id = req.params.id;
  console.log("ID ne: " + package_id);
  Package.findOne({_id: package_id}, (err, packageData) => {
    if (err) { console.log(err); return next(err); }
    const pId = packageData["id"];
    console.log(packageData);
    Code.find({package_id: pId}).limit(10).exec((err, codes) => {
      console.log(codes);
      res.render("partner/package", {
        codes: codes,
        package: packageData,
      });
    });
  });
};

export let generateCodePackage =  (req: Request, res: Response, next: NextFunction) => {
  const package_id = req.params.id;
  Package.findOne({_id: package_id}, (err, packageData) => {
    if (err) { console.log(err); return next(err); }
    if (packageData) {
      const codes = genCode(packageData);
      Code.insertMany(codes, (err, docs) => {
        if (err) { console.log(err); next(); }
      });
      return res.redirect("/dashboard/packages/" + packageData._id);
    }
  });
};

const genCode = (data) => {
  const codes = [];
  const code = {
    package_id: data._id,
    partner_id: data.partner_id,
    status: true
  };
  console.log("gen code: ");
  console.log(data);
  for (let i = 0; i < data.quantity; i++) {
    codes.push(code);
  }
  console.log(codes);
  return codes;
};
