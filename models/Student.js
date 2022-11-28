import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const studentSchema = new mongoose.Schema({
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
    },
}, { timestamps: true });
studentSchema.methods.createJWT = async function () {
    const token = jwt.sign({
        username: this.username,
        fullName: this.fullName,
        mssv: this.mssv,
        class: this.class,
        roles: this.roles,
    }, process.env.JWT_SECRET, { expiresIn: '30d' });
    this.token = token;
    await this.save();
    return token;
};
studentSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
};
studentSchema.methods.logout = async function () {
    this.token = '';
    await this.save();
};
const Student = mongoose.model('Student', studentSchema);
export default Student;
