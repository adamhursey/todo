import express from 'express';
import bodyParser from 'body-parser';
import db from './db/db';

const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ------------------------ //
//-------GET Methods------- //
// ------------------------ //

// All TODO's
app.get('/api/v1/todos', (req, res) => {
  res.status(200).send({
    sucess: 'true',
    message: 'todos retrieved successfully',
    todos: db
  })
});


// ------------------------- //
//-------POST Methods------- //
// ------------------------- //

// Single TODO
app.post('/api/v1/todos', (req, res) => {
  if(!req.body.title) {
    return res.status(400).send({
      success: 'false',
      message: 'title is required'
    });
  } else if (!req.body.description) {
    return res.status(400).send({
      success: 'false',
      message: 'description is required'
    });
  }
  const todo = {
    id: db.length +1,
    title:req.body.title,
    description: req.body.description
  }
  db.push(todo);
  return res.status(201).send({
    success: 'true',
    messag: 'todo added successfully',
    todo
  })
});



const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
