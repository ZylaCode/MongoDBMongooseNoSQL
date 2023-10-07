import mongoose from "mongoose";
import pkg from "validator";
const {isEmail} = pkg;
// name (string)
// first_name (string)
// email (string)

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        minLength: 3,
        maxLength: 25
    },
    first_name: {
        type: String,
        required: [true, "Please enter your first name"],
        minLength: 3,
        maxLength: 25
    },
    email: {
        type: String,
        required: [true, "Please enter your email address"],
        minLength: 6,
        maxLength: 35,
        unique: true,
        validate: [isEmail, "Please enter a valid email address"]
    }
});


const Student = mongoose.model('Student', StudentSchema);

export default Student;