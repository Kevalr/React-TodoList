import { useState, useContext, useEffect, useRef } from "react";
import { TodoListContext } from "../../context/todoContexts";
import {
  useCreateTodo,
  useDeleteTodo,
  useGetAllTodos,
  useUpdateTodo,
} from "./hooks";
import cross from "./cross.svg";

function Todolist() {
  const { todolist, setTodoList } = useContext(TodoListContext);

  const { data: response, isLoading } = useGetAllTodos();

  useEffect(() => {
    if (response) {
      setTodoList(response.data);
    }
  }, [response]);

  useEffect(() => {
    console.log(todolist);
  }, [todolist]);

  const [input, setInput] = useState("");

  const [selectedTask, setSelectedTask] = useState(null);

  const { mutate: createTodoMutation, isLoading: isTodoCreating } =
    useCreateTodo();

  const { mutate: updateTodoMutation, isLoading: isTodoUpdating } =
    useUpdateTodo();

  const { mutate: deleteTodoMutation, isLoading: isTodoDeleting } =
    useDeleteTodo();

  const toggleTodoStatus = (id) => {
    setTodoList((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  };

  const createUpdateTodo = () => {
    if (validateTodo()) {
      const payload = {
        title: input,
        completed: selectedTask ? Boolean(selectedTask.completed) : false,
        userId: selectedTask ? selectedTask.userId : 100,
        id: selectedTask
          ? selectedTask.id
          : Math.floor(Math.random() * 200) + 200,
      };

      if (!selectedTask) {
        createTodoMutation(payload, {
          onSuccess: (data) => {
            console.log(data);
            setTodoList((prev) => [payload, ...prev]);
            setInput("");
          },
        });
      } else {
        updateTodoMutation(payload, {
          onSuccess: (data) => {
            console.log("Updated Todo - ", data);
            setTodoList((prev) =>
              prev.map((todo) => {
                if (todo.id === selectedTask?.id) {
                  return payload;
                }
                return todo;
              })
            );
            setInput("");
          },
        });
      }
    } else {
      alert("Please Enter Valid Todo Item");
    }
  };

  const deleteTodo = (id) => {
    deleteTodoMutation(id, {
      onSuccess: (data) => {
        console.log(data);
        setTodoList((prev) => prev.filter((todo) => todo.id !== id));
      },
    });
  };

  function validateTodo() {
    return input.trim()?.length > 0;
  }

  return (
    <div className="flex flex-col px-10  py-5 justify-center md:w-8/12 lg:w-1/2 w-11/12  max-w-3xl m-auto items-center my-7 rounded-lg shadow-md shadow-black overflow-auto">
      <h1 className="text-4xl my-5 text-gray-900 spacing font-semibold">
        TodoList
      </h1>

      <hr />

      <div className="flex justify-between gap-10 w-full">
        <input
          type="text"
          className="border-b border-gray-600 focus:border focus:border-black focus:outline-none p-1 px-2 flex-1"
          value={input}
          onChange={(e) => setInput(e.target?.value)}
          placeholder="Enter Task Here"
        />

        {selectedTask && (
          <img
            src={cross}
            alt="cancel button"
            height="20px"
            width="20px"
            onClick={() => {
              setSelectedTask(null);
              setInput("");
            }}
          />
        )}

        <button
          className="bg-green-800 px-2 py-1 w-2/12 rounded-md text-white font-bold"
          onClick={createUpdateTodo}
        >
          {selectedTask ? "UPDATE" : "ADD"}
        </button>
      </div>

      <div
        className="max-h-[600px] no-scrollbar  p-3 pb-4 overflow-y-auto mt-10 w-full rounded-md shadow-black"
        style={{ boxShadow: "0 0 10px" }}
      >
        {isLoading ? (
          <h1>Loading</h1>
        ) : (
          todolist &&
          todolist.map((todo, index) => {
            return (
              <div
                key={`${todo.id} ${todo.title}`}
                className="flex items-center gap-2 border-b py-2"
              >
                <input
                  type="checkbox"
                  className="h-7 w-7"
                  onChange={() => toggleTodoStatus(todo.id)}
                  checked={todo.completed}
                />

                <p className="max-h-[60px] line-clamp-2 w-9/12 flex-1">
                  {todo.title}
                </p>

                <button
                  className="justify-self-end text-sm py-2 px-3 bg-yellow-600 text-white rounded-md"
                  onClick={() => {
                    setInput(todo.title);
                    setSelectedTask(todo);
                  }}
                >
                  EDIT
                </button>

                <button
                  className="justify-self-end text-sm py-2 px-3 bg-red-600 text-white rounded-md"
                  onClick={() => deleteTodo(todo.id)}
                >
                  DELETE
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Todolist;
