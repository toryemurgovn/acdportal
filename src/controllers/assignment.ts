import { Request, Response } from "express";
import { quizzesData } from "../util/quizzes";
import * as _ from "lodash";

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
    data: quizzesData
  });
};

export let submitQuizzes = (req: Request, res: Response) => {
  const questions = checkQuestions(req.body);
  res.render("assignment/quiz", {
    data: questions
  });
};

const checkQuestions = (data: any) => {
  const questions = _.cloneDeep(quizzesData);
  for (let i = 0; i < questions.length; i++) {
    const key = "question_" + (i + 1);
    questions[i]["flag"] = false;
    if (data[key]) {
      questions[i]["choise"] = data[key];
      if (data[key] == key + "_" + questions[i].answer) {
        questions[i]["flag"] = true;
      }
    }
  }
  return questions;
};