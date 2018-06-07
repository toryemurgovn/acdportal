import { Request, Response } from "express";
import Package from "../models/Package";
import Code from "../models/Code";
import Course from "../models/Course";
import User from "../models/User";
import parse from "csv-parse";
import fs from "fs";
import validator from "email-validator";

export let index = (req: Request, res: Response) => {
  if (!req.user) {
    return res.json({ message: "Please sign in.", code: 401 });
  }
  const partner = req.user;
  Package.find({ status: 1, partner_id: partner.id }, (err, listPackage) => {
    res.json(listPackage);
  });
};

export let create = (req: Request, res: Response) => {
  if (!req.user) {
    return res.json({ message: "Please sign in.", code: 401 });
  }
  const partner = req.user;
  Course.findOne({ _id: req.body.course_id }, (error, courseData: any) => {
    if (courseData) {
      const packageModel = createPackage(partner, req.body, courseData).then((_package: any) => {
        _package.save((error) => {
          console.log(error);
          if (error) {
            return res.json({ message: error, code: 422 });
          }
        });
        res.json(packageModel);
      });
    } else {
      return res.json({ message: "Course does not exist.", code: 422 });
    }
  });
};

export let show = (req: Request, res: Response) => {
  if (!req.user) {
    return res.json({ message: "Please sign in.", code: 401 });
  }
  const package_id = req.params.id;

  Package.findOne({ _id: package_id }, (error, packageData: any) => {
    if (error) {
      console.log(error);
      return res.json({ message: error, code: 500 });
    }
    if (packageData) {
      const pId = packageData["id"];
      // console.log(packageData);
      Code.find({ package_id: pId }).limit(10).exec((err, codes) => {
        console.log(codes);
        res.json({
          id: packageData.id,
          codes: codes,
          status: packageData.status,
          quantity: packageData.quantity,
          partner_id: packageData.partner_id
        });
      });
    } else {
      return res.json({ message: "Not found.", code: 404 });
    }
  });
};

const createPackage = async (partner, params, courseData) => {
  console.log("Create package for partner: " + partner.id);
  return new Package({
    partner_id: partner.id,
    quantity: params.quantity,
    describle: params.describle,
    course_id: params.course_id,
    course: courseData,
    status: 0
  });
};

export let generateCodePackage = (req: Request, res: Response) => {
  const package_id = req.params.id;
  Package.findOne({ _id: package_id }, (err, packageData) => {
    if (err) {
      return res.json({ message: err.message, code: 422 });
    }
    if (packageData) {
      genCode((req.body.email || ""), packageData).then((codeData) => {
        if (codeData) {
          const codeObj = new Code(codeData);
          codeObj.save((err, docs) => {
            if (err) {
              return res.json({ message: err.message.toString(), code: 422 });
            }
            return res.json({ docs });
          });
        }
      });
    } else {
      return res.json({ message: "Package does not exist.", code: 422 });
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
    await User.findOne({ email: email }, (err, objUser: any) => {
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

export let importList = (req: Request, res: Response) => {
  const package_id = req.params.id;
  Package.findOne({ _id: package_id }, (err, packageData) => {
    if (err) {
      return res.json({ message: err.message, code: 422 });
    }
    if (packageData) {
      const source = fs.createReadStream(req.file.path);
      const parser = parse({ delimiter: ":" });
      const output = [];
      let record, email;
      parser.on("readable", function () {
        while (record = parser.read()) {
          email = record[0];
          if (validator.validate(email) && output.indexOf(email) === -1) {
            output.push(email);
          }
        }
      });

      // Catch any error
      parser.on("error", function (err) {
        console.log(err.message);
      });

      const generateList = () => {
        const size = output.length;
        let index = 1;
        output.forEach((email) => {
          genCode(email, packageData).then((codeData) => {
            if (codeData) {
              const codeObj = new Code(codeData);
              codeObj.save((err, docs) => {
                if (err) {
                  return res.json({ message: err.message.toString(), code: 422 });
                }
                index++;
                if (index === size) {
                  res.json({ message: output, code: 200 });
                }
              });
            }
          });
        });
      };

      // When we are done, test that the parsed output matched what expected
      parser.on("finish", generateList);

      source.pipe(parser);
    } else {
      return res.json({ message: "Package does not exist.", code: 422 });
    }
  });
};