import { Request, Response } from "express";
import { default as Package } from "../../models/Package";

export let packageStatus = (req: Request, res: Response) => {
  if (req.body.package) {
    const dataPackage = req.body.package;
    const upStatusTo = (dataPackage.action === "approve") ? 1 : 2;
    Package.update({ status: false, _id: dataPackage.id }, { status: upStatusTo }, (err) => {
      if (err) {
        console.log("Approve status error message");
        return res.status(403).json({});
      } else {
        return res.json({ msg: "Success" });
      }
    });
  } else {
    return res.status(200).json({ msg: "nothing todo" });
  }
};
