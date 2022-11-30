import mongoose from 'mongoose';

export interface IExam {
  title: string;
  startDate: Date;
  endDate: Date;
  numberOfQuestion: number;
  duration: number;
  isCustom: boolean;
  questions?: mongoose.Types.ObjectId[];
  populate(string);
}

const examSchema = new mongoose.Schema<IExam>(
  {
    title: {
      type: String,
      required: [true, 'Exam must have a title'],
    },
    startDate: {
      type: Date,
      required: [true, 'Exam must have a start date'],
    },
    endDate: {
      type: Date,
      required: [true, 'Exam must have a end date'],
    },
    numberOfQuestion: {
      type: Number,
      required: [true, 'Exam must have a number of question in it'],
    },
    duration: {
      type: Number,
      required: [true, 'Exam must have a duration'],
    },
    isCustom: {
      type: Boolean,
      required: true,
      default: false,
    },
    questions: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Question',
    },
  },
  { timestamps: true }
);

const Exam = mongoose.model('Exam', examSchema);
export default Exam;
