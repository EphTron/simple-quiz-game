import mongoose, {Document, Schema, Types} from 'mongoose';

export interface IQuestion extends Document {
    category: string;
    question: string;
    answer: string;
}

const QuestionSchema: Schema = new mongoose.Schema({
    category: {
        type: Schema.Types.String,
        enum : ['music', 'math', 'nature', 'D'],
        default: 'A',
        required: true
    },
    question: {type: Schema.Types.String, required: true, unique: true},
    answer: {type: Schema.Types.String, required: true}
});

QuestionSchema.index({identifier: -1});

const Question = mongoose.model<IQuestion>('Question', QuestionSchema);
export default Question;
