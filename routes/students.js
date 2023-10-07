import express from 'express';
import Student from '../models/Student.js';
const studentsRouter = express.Router();

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { name: "", first_name: "", email: ""};
    if (err.code === 11000){
        errors.email = "This email address is already in use";
        return errors;
    }
    if (err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
        errors[properties.path] = properties.message;        
    })
    }
    return errors;
}

studentsRouter.get("/", async (req, res) => {
    try {
      const response = await Student.find();
      res.json(response)
      //res.send('Hello')
    } catch(err){
        res.status(500).json(err)
    }
});

studentsRouter.post("/", async (req, res) => {
    try {
        const {name, first_name, email} = req.body;
      const response = await Student.create({name, first_name, email});
      res.json(response);
    } catch(err){
        const errors = handleErrors(err);        
        res.status(400).json({errors})
    }
});

// Using the code from the previous exercise, if the user sends a PUT query, modify all the entries with the name equal to John, change it to “Bob”.
studentsRouter.put("/", async (req, res) => {
    try {
        const idName = req.body;
        const {name, first_name, email} = req.body;
        const response = await Student.updateMany({name: idName}, {name, first_name, email});
        res.json(response)
    } catch(err){
        const errors = handleErrors(err);
        res.status(500).json({errors});
    }
});

//find by :id
studentsRouter.get("/:id", async(req, res)=> {
    try {
        const id = req.params.id
      const response = await Student.findById(id);
      res.json(response)
      //res.send('Hello')
    } catch(err){
        res.status(500).json(err);
    }
});

//update by :id
studentsRouter.put("/:id", async (req, res) => {
    try {
        const {name, first_name, email} = req.body;
        const {id} = req.params;
        const response = await Student.findByIdAndUpdate(id, {name, first_name, email});
        res.json(response)
    } catch(err){
        const errors = handleErrors(err);
        res.status(500).json({errors});
    }
})


//delete by :id
studentsRouter.delete("/:id", async(req, res) =>{
    try {
        const id = req.params.id
        const response = await Student.findByIdAndDelete(id);
        res.json(response)
    } catch(err){
        res.status(500).json(err)
    }
})

export default studentsRouter;