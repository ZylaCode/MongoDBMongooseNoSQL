import express from 'express';
import Student from '../models/Student.js';
const studentsRouter = express.Router();

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
        console.log(err)
        res.status(500).json(err)
    }
});

// Using the code from the previous exercise, if the user sends a PUT query, modify all the entries with the name equal to John, change it to “Bob”.
studentsRouter.put("/", async (req, res) => {
    try {
        const {name, first_name, email} = req.body;
        const response = await Student.updateMany({name: "John"}, {name: name, first_name: first_name, email: email});
        res.json(response)
    } catch(err){
        //console.log(err)
        res.status(500).json(err)
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
        res.status(500).json(err)
    }
});


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