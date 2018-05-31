import { Request, Response } from "express";

export let transaction = (req: Request, res: Response) => {
  res.render("assignment/transaction", {
  });
};

export let block = (req: Request, res: Response) => {
  res.render("assignment/block", {
  });
};

export let quiz = (req: Request, res: Response) => {
  res.render("assignment/quiz", {
  });
};