import { Request, Response } from "express";
import { default as Package, PackageModel } from "../models/Package";
import { default as Code, CodeModel } from "../models/Code";
/**
 * GET /
 * Home page.
 */
export let index = (req: Request, res: Response) => {
  const partner = req.user;
  Package.find({partner_id: partner.id}, (err, listPackage) => {
    res.render("partner/gencode", {
      title: "Welcome",
      partner: partner,
      listPackage: listPackage
    });
  });
};

export let generate = (req: Request, res: Response) => {
  res.render("partner/gencode", {
    title: "post"
  });
};

export let getCodeOfPackage = (req: Request, res: Response) => {
  const id = req.body.package_id;
  Code.find({package_id: id}, (err, codes) => {
    res.render("partner/code", {
      codes: codes
    });
  });
};