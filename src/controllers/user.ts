import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { default as User, UserModel } from "../models/User";
import { IVerifyOptions } from "passport-local";
import { WriteError } from "mongodb";

const request = require("express-validator");
import "../config/passport";

export let signIn = (req: Request, res: Response) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("sign-in");
};

export let postSignIn = (req: Request, res: Response, next: NextFunction) => {
  req.assert("email", "Email is not valid").isEmail();
  req.assert("password", "Password cannot be blank").notEmpty();
  req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });

  const errors = <any> req.validationErrors();

  if (errors) {
    req.flash("errors", errors);
    return res.redirect("/sign-in");
  }
  passport.authenticate("local", (err: Error, user: UserModel, info: IVerifyOptions) => {
    if (err) { return next(err); }
    if (!user) {
      req.flash("errors", <any> { msg: info.message });
      return res.redirect("/sign-in");
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      req.flash("success", <any> { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/");
    });
  })(req, res, next);
};

export let getLogout = (req: Request, res: Response) => {
  req.session.destroy(function (err) {
    req.user = undefined;
    res.redirect("/");
  });
};

export let signUp = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("sign-up");
};

export let postSignUp = (req: Request, res: Response, next: NextFunction) => {
  req.assert("email", "Email is not valid").isEmail();
  req.assert("password", "Password must be at least 4 characters long").len({ min: 4 });
  req.assert("confirmPassword", "Passwords do not match").equals(req.body.password);
  req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });

  const errors = <any> req.validationErrors();
  if (errors) {
    req.flash("errors", errors);
    return res.redirect("/sign-up");
  }
  const user = <any> new User({
    email: req.body.email,
    password: req.body.password
  });

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) { next(err); }
    if (existingUser) {
      req.flash("errors", <any>  { msg: "Account with that email address already exists." });
      return res.redirect("/");
    }
    user.save((err) => {
      if (err) { next(err); }
      req.logIn(user, (err) => {
        if (err) {
          next(err);
        }
        return res.redirect("/");
      });
    });
  });
};
