import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface IExamScore {
  examId: mongoose.Types.ObjectId;
  score: number;
}

export interface IStudent {
  _id: mongoose.Types.ObjectId;
  username: string;
  password: string;
  fullName: string;
  class: string;
  department: string;
  mssv: string;
  token?: string;
  roles: string[];
  examScore?: IExamScore[];
  createJWT(): Promise<string>;
  comparePassword(string): Promise<boolean>;
  logout(): void;
  save(): void;
}

const studentSchema = new mongoose.Schema<IStudent>(
  {
    username: {
      type: String,
      required: [true, 'Student must has an username'],
      unique: true,
    },

    password: {
      type: String,
      required: [true, 'Student must has a password'],
    },

    fullName: {
      type: String,
      required: [true, 'Student must has a name'],
    },

    class: {
      type: String,
      required: [true, 'Student must below in a class'],
    },

    department: {
      type: String,
      required: [true, 'Student must below in a department'],
    },

    mssv: {
      type: String,
      required: [
        true,
        'Student must has a Student Id Number (Ma So Sinh Vien)',
      ],
      unique: true,
    },

    token: {
      type: String,
    },

    roles: {
      type: [String],
      default: ['Student'],
      required: true,
    },

    examScore: {
      type: [
        {
          examId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exam',
          },
          score: {
            type: Number,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

studentSchema.methods.createJWT = async function (): Promise<string> {
  const token: string = jwt.sign(
    {
      username: this.username,
      fullName: this.fullName,
      mssv: this.mssv,
      class: this.class,
      roles: this.roles,
      _id: this._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
  this.token = token;
  await this.save();
  return token;
};

studentSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  const isMatch: boolean = await bcrypt.compare(password, this.password);
  return isMatch;
};

studentSchema.methods.logout = async function () {
  this.token = '';
  await this.save();
};

const Student = mongoose.model('Student', studentSchema);
export default Student;
