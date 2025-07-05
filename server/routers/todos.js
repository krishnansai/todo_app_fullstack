const {Router} = require('express');
const {TodoRecord} = require('../records/todo.record');
const {pool} = require('../utils/db');

const TodoRouter = Router();

TodoRouter.get('/', async (req, res) => {
  const todosList = await TodoRecord.listAll();

  res.send(todosList);
})
  .post('/create', async (req, res) => {
    const newTodo = new TodoRecord(req.body);
    await newTodo.insert();

    res.send('Values inserted successfully');
  })
.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const todoRecord = await TodoRecord.getOne(id);
  if (!todoRecord) {
    return res.status(404).send('Todo not found');
  }

  await todoRecord.delete();

  res.send(`Todo with id ${id} deleted successfully`);
})
  .put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;

  // You can log for debugging
  console.log(`Updating todo ${id} to value: ${todo}`);

  const todoRecord = await TodoRecord.getOne(id);
  if (!todoRecord) {
    return res.status(404).send('Todo not found');
  }

  await todoRecord.update(id, todo);

  res.send(`Todo with id ${id} updated successfully`);
})
module.exports = {
  TodoRouter,
};
