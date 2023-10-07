import mongoose from "mongoose";

// name (string)
// first_name (string)
// email (string)

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const Student = mongoose.model('Student', StudentSchema);

export default Student;