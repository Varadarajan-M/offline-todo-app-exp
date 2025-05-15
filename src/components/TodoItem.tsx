import type { Todo } from "../types";

type Props = {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: string) => void;
};

const TodoItem = ({ todo, onToggle, onDelete }: Props) => (
  <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo)}
        className="todo-checkbox"
      />
      <span className="todo-text">{todo.title}</span>
      <span
        className="todo-delete-button"
        onClick={() => onDelete(todo.id)}
      >
        ❌
      </span>
    </div>
  </div>
);

export default TodoItem;
