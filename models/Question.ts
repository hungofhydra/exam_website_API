import mongoose from 'mongoose';

export interface IChoice {
  choiceTitle: string;
  isTrue: boolean;
}

export interface IQuestion {
  questionTitle: string;
  choices: IChoice[];
}

const questionSchema = new mongoose.Schema<IQuestion>(
  {
    questionTitle: {
      type: String,
      required: [true, 'Question must have a title'],
    },
    choices: {
      type: [
        {
          choiceTitle: {
            type: String,
          },
          isTrue: {
            type: Boolean,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

const Question = mongoose.model('Question', questionSchema);
export default Question;
