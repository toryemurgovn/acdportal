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

  const errors = <any>req.validationErrors();
  if (errors) {
    req.flash("errors", errors);
    return res.redirect("/sign-up-partner");
  }
  const user = <any>new User({
    email: req.body.email,
    password: req.body.password,
    role: "partner"
  });

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) { next(err); }
    if (existingUser) {
      req.flash("errors", <any>{ msg: "Account with that email address already exists." });
      return res.redirect("/sign-up-partner");
    }
    user.save((err) => {
      if (err) { next(err); }
      req.logIn(user, (err) => {
        if (err) {
          next(err);
        }
        return res.redirect("/dashboard");
      });
    });
  });
};

export let generateCodePackage = (req: Request, res: Response, next: NextFunction) => {
  const package_id = req.params.id;
  Package.findOne({ _id: package_id }, (err, packageData) => {
    if (err) {
      return res.json({ message: err.message, errorCode: 422 });
    }
    if (packageData) {
      genCode((req.body.email || ""), packageData).then((codeData) => {
        if (codeData) {
          const codeObj = new Code(codeData);
          codeObj.save((err, docs) => {
            if (err) {
              return res.json({ message: err.message.toString(), errorCode: 422 });
            }
            return res.json({ docs });
          });
        }
      });
    } else {
      return res.json({ message: "Package does not exist.", errorCode: 422 });
    }
  });
};

const genCode = async (email: string, data: any) => {
  const code = {
      package_id: data._id,
      user_id: "",
      partner_id: data.partner_id,
      user_email: email,
      status: true
    };
  if (email) {
    await User.findOne({email: email}, (err, objUser: any) => {
      if (err) { return code; }
      if (objUser) {
        code.user_id = objUser._id;
        code["inputed_at"] = new Date();
        code.status = false;
      } else {
        sendInvitation(email);
      }
    });
  }
  return code;
};

const sendInvitation = (email) => {
  // send email to user
  console.log("Sending ... email to user");
};
