import { Request, Response } from "express";
import { default as Package } from "../models/Package";
import { default as Code } from "../models/Code";

export let index = (req: Request, res: Response) => {
  if (!req.user) {
    return res.json({ message: "Please sign in.", errorCode: 401 });
  }
  const partner = req.user;
  Package.find({ partner_id: partner.id }, (err, listPackage) => {
    res.json(listPackage);
  });
};

export let create = (req: Request, res: Response) => {
  if (!req.user) {
    return res.json({ message: "Please sign in.", errorCode: 401 });
  }
  const partner = req.user;
  const packageModel = createPackage(partner, req.body);
  packageModel.save((error) => {
    console.log(error);
    if (error) {
      return res.json({ message: error, errorCode: 422 });
    }
  });
  res.json(packageModel);
};

export let show = (req: Request, res: Response) => {
  if (!req.user) {
    return res.json({ message: "Please sign in.", errorCode: 401 });
  }
  const package_id = req.params.id;

  Package.findOne({ _id: package_id }, (error, packageData: any) => {
    if (error) {
      console.log(error);
      return res.json({ message: error, errorCode: 500 });
    }
    if (packageData) {
      const pId = packageData["id"];
      console.log(packageData);
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
      return res.json({ message: "Not found.", errorCode: 404 });
    }
  });
};

const createPackage = (partner, params) => {
  console.log("Create package for partner: " + partner.id);
  return new Package({
    partner_id: partner.id,
    quantity: params.quantity,
    describle: params.describle,
    status: true
  });
};
