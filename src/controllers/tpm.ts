import { Request, Response } from "express";
import { default as Course, CourseModel } from "../models/Course";
import { default as Usercourse, UsercourseModel } from "../models/Usercourse";
import { default as Code, CodeModel } from "../models/Code";
import { default as Package, PackageModel } from "../models/Package";

/**
 * GET /
 * Home page.
 */
// export let generateData = (req: Request, res: Response) => {
//   console.log("Gen course");
//   const courseData = [{name: "Blockchain 101"}, {name: "Blockchain 102"}, {name: "Blockchain 103"}];
//   Course.insertMany(courseData, (err, docs) => {
//     if (err) { console.log("Can't generate Course content"); }
//   });
//   res.send("Done - Please check log");
// };

// export let viewCourse = (req: Request, res: Response) => {
//   res.send("View course: " + req.params.id);
// };

export let applyCode = (req: Request, res: Response) => {
  console.log("User apply code");
  if (req.user && req.user.role === "user") {
    const code = req.params.code;
    console.log(" UserID " + req.user._id + "  apply code: " + code);
    Code.findById(code, (err, codeInfo: any) => {
      if (err) { console.log("Error"); }
      if (codeInfo) {
        if (codeInfo.status == false || !codeInfo.user_id) {
          res.send("Your code has been used");
        }
        // valide code
        // update code status
      // Need Catch by Transaction her
        codeInfo.user_id = req.user._id;
        codeInfo.status = false;
        codeInfo.save(function(err) {
          if (err) throw err;
          console.log("Code successfully updated!");
        });
        Package.findById(codeInfo.package_id, (err, partnerPackage: any) => {
          Course.findById(partnerPackage.course_id, (err, _course: any) => {
            const userCode = new Usercourse({
              user_id: req.user._id,
              course_id: _course._id,
              course_name: _course.name,
              package_id: partnerPackage._id,
              code_id: codeInfo._id
            });

            userCode.save((err) => {
              console.log("Error when save User Code");
            });
            return res.send("Success - Apply code for use");
          });
        });
      // Done transaction
      }
    });

  } else {
    res.send("Can not apply");
  }
};
