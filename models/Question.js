import mongoose from 'mongoose';
const questionSchema = new mongoose.Schema({
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
}, { timestamps: true });
const Question = mongoose.model('Question', questionSchema);
export default Question;
