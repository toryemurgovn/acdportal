import { Request, Response, NextFunction } from "express";

import User from "../models/User";

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