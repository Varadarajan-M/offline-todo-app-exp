import { useRef, useEffect } from "react";
import { useTodosQuery } from "./hooks/useTodosQuery";
import { useTodoMutation } from "./hooks/useTodoMutation";
import { useToggleTodoMutation } from "./hooks/useToggleTodoMutation";
import { useDeleteTodoMutation } from "./hooks/useDeleteTodoMutation";
import { useOnlineStatus } from "./hooks/useOnlineStatus";
import { replayQueue, getQueue } from "./util";
import { Toaster } from "react-hot-toast";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

import "./App.css";

const App = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isOnline = useOnlineStatus();

  const {
    data: todos,
    isLoading,
    isError,
    refetch: refetchTodos,
  } = useTodosQuery();

  const { mutate: addTodo } = useTodoMutation();
  const { mutate: toggleTodo } = useToggleTodoMutation();
  const { mutate: deleteTodo } = useDeleteTodoMutation();

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRef.current?.value.trim()) return;

    const newTodo = {
      id: Math.random().toString(36).substring(2, 9),
      title: inputRef.current.value.trim(),
      completed: false,
    };

    addTodo(newTodo);
    inputRef.current.value = "";
  };

  useEffect(() => {
    const queue = getQueue();
    if (!isOnline || !queue?.length) return;

    replayQueue().then(() => refetchTodos());
  }, [isOnline]);

  return (
    <>
      {!isOnline && (
        <div className="offline-message">
          You are currently offline. Changes will be synced when you're back
          online.
        </div>
      )}
      <div className="todo-container">
        <Toaster />
        <div className="todo-header">
          <h1 className="todo-title">Todo List</h1>
          <p className="todo-subtitle">Keep track of your tasks</p>
        </div>

        <TodoForm ref={inputRef} onSubmit={handleAddTodo} />

        {isError && (
          <div className="todo-error">
            Failed to load todos. Please try again later.
          </div>
        )}

        {isLoading ? (
          <div className="todo-loading">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <TodoList
            todos={todos ?? []}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        )}
      </div>
    </>
  );
};

export default App;
