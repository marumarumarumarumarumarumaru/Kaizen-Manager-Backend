import express from "express"
import bodyParser from 'body-parser'

import {db} from "./models/index.mjs";

import {router as userRouter} from './routes/user.routes.mjs'
import {router as projectRouter} from './routes/project.routes.mjs'
import {router as taskRouter} from "./routes/task.routes.mjs"

const app = express();

app.use(bodyParser.json());

app.get('/api', (req, res) => {
  res.json({message: 'Oh hello, I didn\'t see you there'});
});

app.use(userRouter)
app.use(projectRouter)
app.use(taskRouter)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.HOST}:${PORT}.`);
});
