import { Request, Response } from "express";

/**
 * GET /
 * Home page.
 */
export let index = (req: Request, res: Response) => {
  res.render("home", {
    title: "Welcome"
  });
};

export let signIn = (req: Request, res: Response) => {
  res.render("sign-in", {
    title: "Welcome"
  });
};

export let signUp = (req: Request, res: Response) => {
  res.render("sign-up", {
    title: "Welcome"
  });
};
