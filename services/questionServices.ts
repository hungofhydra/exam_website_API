import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import * as XLSX from 'xlsx/xlsx.mjs';
import { readFileSync } from 'fs';
import { read } from 'xlsx/xlsx.mjs';

import { createError } from '../errors/createError.js';
import Question, { IQuestion } from '../models/Question.js';

export const createNewQuestionsService = async (questionData: IQuestion[]) => {
  const newQuestions: IQuestion[] = await Question.insertMany(questionData);
  if (!newQuestions)
    throw createError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
    );
  return newQuestions;
};

export const createNewQuestionsFromExcelFileService = async () => {
  const buf = readFileSync('test.xlsx');
  const workbook = read(buf);
  const sheet_name_list = workbook.SheetNames;
  const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

  const data = xlData.map((question) => {
    const questionTitle = question.questionTitle;
    let choices = [];
    let i = 0;

    while (i <= 99) {
      if (question[`choices/${i}/choiceTitle`]) {
        choices.push({
          choiceTitle: question[`choices/${i}/choiceTitle`],
          isTrue: question[`choices/${i}/isTrue`],
        });
        i++;
      } else break;
    }
    return { questionTitle, choices };
  });

  const newQuestions: IQuestion[] = await Question.insertMany(data);
  if (!newQuestions)
    throw createError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
    );
  return newQuestions;
};
