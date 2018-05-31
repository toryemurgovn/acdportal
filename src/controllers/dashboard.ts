import { Request, Response } from "express";

export let index = (req: Request, res: Response) => {
    if (!req.user) {
        return res.redirect("/sign-in");
    }
    res.render("dashboard/index");
};

export let profile = (req: Request, res: Response) => {
    if (!req.user) {
        return res.redirect("/sign-in");
    }
    res.render("dashboard/profile");
};

export let courses = (req: Request, res: Response) => {
    if (!req.user) {
        return res.redirect("/sign-in");
    }
    res.render("dashboard/courses");
};