import react, {useState, useEffect} from "react";
import logo from './logo.svg';
import './App.css';
//Importing Components
import Form from './Components/Form';
import TodoList from "./Components/todoList";

function App() {
  
  //States
  const[inputText, setInputText] = useState("");
  const[todos, setTodos] = useState([]);
  const[status, setStatus] = useState("all");
  const[filteredTodos, setFilteredTodos] = useState([]);
  //RUNE ONCE WHEN APP STARTS

  useEffect(()=>
  {
    getLocalTodos();
  },[]);

  //USE EFFECT
  useEffect (() =>
  {
    filterHandler();
    saveLocalTodos();

  },[todos, status]);

  //functions
  const filterHandler = () =>
  {
    switch(status)
    {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;

      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;

      default:
        setFilteredTodos(todos);
        break;
    }
  }

  //save to local
  const saveLocalTodos = () =>
  {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  const getLocalTodos = () =>
  {
    if(localStorage.getItem('todos') === null)
    {
      localStorage.setItem('todos', JSON.stringify([]));
    }
    else
    {
      let todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
    }
  }


  return (
    <div className="App">
      <header>
      <h1>Sean's To-do List</h1>
      </header>
      <Form 
       inputText={inputText}
       todos={todos} 
       setTodos={setTodos}
       setInputText={setInputText}
       setStatus = {setStatus}
       
       
          />
      <TodoList filteredTodos = {filteredTodos} setTodos={setTodos} todos={todos} />
    </div>
  );
}

export default App;
