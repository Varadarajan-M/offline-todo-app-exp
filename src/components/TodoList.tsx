import type { Todo } from "../types";
import TodoItem from "./TodoItem";

type Props = {
  todos: Todo[];
  onToggle: (todo: Todo) => void;
  onDelete: (id: string) => void;
};

const TodoList = ({ todos, onToggle, onDelete }: Props) => {
  if (todos.length === 0) {
    return <div className="todo-empty">No todos yet. Add some tasks!</div>;
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
