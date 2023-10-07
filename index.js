import express from 'express';
import 'dotenv/config';
import studentsRouter from "./routes/students.js";
import client from './db/db.js';
const port = process.env.PORT || 8000;

const app = express()
app.use(express.json());
app.use('/api/students', studentsRouter);


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

client.on('connected', ()=>{
  app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
})

