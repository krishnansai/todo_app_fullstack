import {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';


function App() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleCharactersError = (value) => {
    if (value.length < 3 || value.length > 50) {
      throw new Error(
        alert(
          'Todo must have at least 3 characters and less than 50 characters.'
        )
      );
    }
  };

  const addTodo = async () => {
    handleCharactersError(todo);

    try {
      await axios.post(`${API_BASE_URL}/create`, {
        todo,
      });
      getAllTodos();
    } catch (err) {
      console.error(err.message);
    }
  };

  const getAllTodos = async () => {
    try {
      await axios
        .get(`${API_BASE_URL}/`)
        .then((response) => {
          setTodoList(response.data);
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateTodo = async (id) => {
    handleCharactersError(newTodo);

    try {
      await axios
        .put(`${API_BASE_URL}/update/${id}`, {
          id,
          todo: newTodo,
        })
        .then((response) => {
          console.log(response.data);
          setTodoList(
            todoList.map((val) =>
              val.id === id ? {id: val.id, todo: val.todo} : val
            )
          );
          getAllTodos();
          setNewTodo('');
          setEditingId(null);
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios
        .delete(`${API_BASE_URL}/${id}`)
        .then((response) => {
          setTodoList(todoList.filter((val) => val.id !== id));
          getAllTodos();
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTodo();
    setTodo('');
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div className='App'>
      <Layout>
        <TodoForm handleSubmit={handleSubmit} setTodo={setTodo} todo={todo} />
        <TodoList
          todoList={todoList}
          setNewTodo={setNewTodo}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
          editingId={editingId}
          setEditingId={setEditingId}
          newTodo={newTodo}
        />
      </Layout>
    </div>
  );
}

export default App;
