import { useState, useContext } from "react";
import { TodoListContext } from "./context/todoContexts";
import Todolist from "./pages/todolist/Todolist";

function App() {
  
  const [todolist, setTodoList] = useState([]);

  return (
    <div className="App h-[100vh] flex justify-center items-center">
      <TodoListContext.Provider value={{todolist, setTodoList}} >
        <Todolist />
      </TodoListContext.Provider>
    </div>
  );
}



export default App;

// todolist
// json placeholder mathi crud thase
// data store and manipulate karva mate state joishe
// small app che to props thi pass thai jay pan context api shikhva mate data store and retrive aemathi karvana
// components - indivisual todo - input component ( create and edit )
// 
