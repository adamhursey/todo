import db from '../db/db';

class TodosController {


  // ------------------------- //
  // -------GET Methods------- //
  // ------------------------- //

  // All TODO's
  getAllTodos(req, res) {
    return res.status(200).send({
      success: 'true',
      message: 'todo retrieved successfully',
      todos: db
    });
  };

  // Single TODO
  getTodo(req,  res) {
    const id = parseInt(req.params.id, 10);

    let todoFromDb;

    db.map((todo) => {
      if (todo.id === id) {
        todoFromDb = todo;
      }
    });
    if (todoFromDb) {
      return res.status(200).send({
        success: 'true',
        message: 'todo retrieved successfully',
        todoFromDb,
      });
    } else {
      return res.status(404).send({
        success: 'false',
        message: 'todo does not exist',
      });
    }
  };

  // -------------------------- //
  // -------POST Methods------- //
  // -------------------------- //

  // Single TODO
  createTodo(req, res) {
    if (!req.body.title) {
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
      id: db.length + 1,
      title: req.body.title,
      description: req.body.description
    }
    db.push(todo);
    return res.status(201).send({
      success: 'true',
      message: 'todo added successfully',
      todo
    });
  };

  // ---------------------------- //
  // -------UPDATE Methods------- //
  // ---------------------------- //

  // PUT Update Method
  updateTodo(req, res) {
    const id = parseInt(req.params.id, 10);
    let todoFound;
    let itemIndex;
    db.map((todo, index) => {
      if (todo.id === id) {
        todoFound = todo;
        itemIndex = index;
      }
    });

    if (!todoFound) {
      return res.status(404).send({
        success: 'false',
        message: 'todo not found',
      });
    }

    if (!req.body.title) {
      return res.status(400).send({
        success: 'false',
        message: 'title is required',
      });
    } else if (!req.body.description) {
      return res.status(400).send({
        success: 'false',
        message: 'description is required',
      });
    }

    const updatedTodo = {
      id: todoFound.id,
      title: req.body.title || todoFound.title,
      description: req.body.description || todoFound.description,
    };

    db.splice(itemIndex, 1, updatedTodo);

    return res.status(201).send({
      success: 'true',
      message: 'todo updated successfully',
      updatedTodo,
    });
  };


  // ---------------------------- //
  // -------DELETE Methods------- //
  // ---------------------------- //

  //Delete certian TODO
  deleteTodo(req, res) {
    const id = parseInt(req.params.id, 10);

    let deleted;

    db.map((todo, index) => {
      if (todo.id === id) {
        db.splice(index, 1);
        deleted = true;
      }
    });

    if (deleted) {
      return res.status(200).send({
        success: 'true',
        message: 'Todo deleted successfuly',
      });
    } else {
      return res.status(404).send({
        success: 'false',
        message: 'todo not found',
      });
    }
  };

};

const todoController = new TodosController();
export default todoController;
