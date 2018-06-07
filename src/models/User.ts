import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";
import { default as Code, CodeModel } from "../models/Code";
import { default as Package, PackageModel } from "../models/Package";

export type UserModel = mongoose.Document & {
  email: string,
  password: string,
  role: { type: string, default: "user" },
  comparePassword: comparePasswordFunction,
  capabilities: object
};

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
  capabilities: {type: Object, default: {} }
}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre("save", function save(next) {
  const user = <any> this;
  if (!user.isModified("password")) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      if (this.isNew) {
        updateCodes(user);
        Code.find({user_email: user.email})
          .select("package_id")
          .exec((err, packages) => {
            if (packages) {
              const packages_id = [];
              packages.forEach((item: any) => {packages_id.push(item.package_id);});
              Package.find({_id: packages_id}).select("course").exec((err, dataPackages) => {
                const data = {};
                for (let i = 0; i < dataPackages.length; i++ ) {
                  data[dataPackages[i]["course"]._id] = dataPackages[i]["course"];
                }
                user["capabilities"]["courses"] = data;
                next();
              });
            }
          });
      } else {
        next();
      }
    });
  });
});

const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
    cb(err, isMatch);
  });
};

/**
 * Custom methods
 */

userSchema.methods.comparePassword = comparePassword;

const User = mongoose.model("User", userSchema);
export default User;


/**
 * Utils functions
 */

let updateCodes = (user) => {
  const updateInfo = {
    user_id: user._id,
    status: false,
    inputed_at: new Date()
  };
  Code.update({user_email: user.email, status: true}, updateInfo, {multi: true}, (err, res) => {
    if (err) {
      console.log("log: error for update user Code");
    }
  });
};