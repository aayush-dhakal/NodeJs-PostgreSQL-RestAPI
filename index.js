const express = require("express");
const app = express();

const pool = require("./db"); // now we can run queries on this pool variable

app.use(express.json());

//routes

// get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo"); // here we dont need RETURNING * here coz select * self explanatorily means we need data to be returned so RETURNING works only with certain insert, update or delete operations

    res.json(allTodos.rows); // try sending both allTodos and allTodos.rows to see the difference
  } catch (err) {
    console.log(err.message);
  }
});

// get a todo
app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const allTodos = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json(allTodos.rows[0]); // allTodos.rows returns an array so use [0] to get the only one element
  } catch (err) {
    console.log(err.message);
  }
});

// create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;

    const newTodo = await pool.query(
      "INSERT INTO TODO (description) VALUES ($1) RETURNING *",
      [description]
    ); // $1 is a placeholder for a variable like here it will be replaced by description variable. Returning * means return the newly created Todo so now newTodo will contain this new created todo which can be now reference as a variable name

    // res.json(newTodo); // sending the newly created todo as a response. but this will contain a lot of extra details and we only need a row of todo data. so see this response and get a particular newly created todo as newTodo.rows and newTodo.rows[0]

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// update a todo
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  try {
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("Todo was updated");
  } catch (err) {
    console.log(err.message);
  }
});

// delete a todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json("Todo was deleted");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(3000, () => {
  console.log("server is up on 3000");
});
