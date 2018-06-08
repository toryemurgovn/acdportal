import { Request, Response } from "express";
import { quizzesData } from "../util/quizzes";
import * as _ from "lodash";
import * as childProcess from "child_process";
import { default as Course } from "../models/Course";

const execFileSync = childProcess.execFileSync;

export let transaction = (req: Request, res: Response) => {
  res.render("assignment/transaction", {
  });
};

export let block = (req: Request, res: Response) => {
  res.render("assignment/block", {
  });
};

export let quiz = (req: Request, res: Response) => {
  if (!req.user) {
    return res.redirect("/sign-in");
  }
  const courseId = req.params.id;

  Course.findOne({ _id: courseId }, (error, course: any) => {
    res.render("assignment/quiz", {
      data: course.questions
    });
  });
};

export let submitQuizzes = (req: Request, res: Response) => {
  if (!req.user) {
    return res.redirect("/sign-in");
  }
  const courseId = req.params.id;

  Course.findOne({ _id: courseId }, (error, course: any) => {
    const questions = checkQuestions(req.body, course.questions);
    res.render("assignment/quiz", {
      data: questions
    });
  });
};

const checkQuestions = (data: any, quizzesData) => {
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
    break;
  }
  return questions;
};

export let transactionMechanisms = (req: Request, res: Response) => {
  const fnTest = "test" + req.params.id;
  res.send(fn[fnTest](req.body));
};

const convertResult = (bufferData) => {
  let stringData = bufferData.toString();
  stringData = stringData.replace(/\r\n/g, "\r").replace(/\n/g, "\r").replace(/['"]+/g, "").split(/\r/);
  while (!stringData[0]) {
    stringData.shift();
  }
  // console.log(stringData);
  return stringData;
};


const filePath = "./files";
const fn = <any>{};

fn.test1 = (data: any) => {
  const inputData = data.name + "\n" + data.amount + "\n";
  const file = filePath + "/test_1";
  let resData: any = execFileSync(file, [], {
    input: inputData
  });
  resData = convertResult(resData);
  return { name: resData[1], amount: resData[3], hash: resData[5] };
};


fn.test2 = (data: any) => {
  const inputData = data.passphrase + "\n";
  const file = filePath + "/test_2";
  let resData: any = execFileSync(file, [], {
    input: inputData
  });
  resData = convertResult(resData);
  return { privateKey: resData[1], publicKey: resData[3] };
};

fn.test3 = (data: any) => {
  const inputData = data.name + "\n" + data.amount + "\n" + data.prikey + "\n";
  const file = filePath + "/test_3";
  let resData: any = execFileSync(file, [], {
    input: inputData
  });
  resData = convertResult(resData);
  return { name: resData[1], amount: resData[3], hash: resData[5], signature: resData[9] };
};

fn.test4 = (data: any) => {
  const inputData = data.name + "\n" + data.amount + "\n" + data.pubkey + "\n" + data.sign + "\n";
  const file = filePath + "/test_4";
  let resData: any = execFileSync(file, [], {
    input: inputData
  });
  resData = convertResult(resData);
  return { name: resData[1], amount: resData[3], hash: resData[5], signature: resData[9], valid: resData[12] };
};

fn.test5 = (data: any) => {
  const inputData = "\n";
  const file = filePath + "/test_5";
  return execFileSync(file, [], {
    input: inputData
  });
};

fn.test6 = (data: any) => {
  const inputData = "\n";
  const file = filePath + "/test_6";
  return execFileSync(file, [], {
    input: inputData
  });
};

fn.test7 = (data: any) => {
  const inputData = data.nonce + "\n";
  const file = filePath + "/test_7";
  return execFileSync(file, [], {
    input: inputData
  });
};

fn.test8 = (data: any) => {
  const inputData = data.name + "\n" + data.amount + "\n" + data.difficult + "\n";
  const file = filePath + "/test_8";
  return execFileSync(file, [], {
    input: inputData
  });
};

fn.test9 = (data: any) => {
  let inputData = "";
  for (const i in data) {
    inputData += data[i] + "\n ";
  }
  inputData += "\n \n " + "\n \n " + "\n \n  " + "\n \n";
  const file = filePath + "/test_9";
  return execFileSync(file, [], {
    input: inputData
  });
};
