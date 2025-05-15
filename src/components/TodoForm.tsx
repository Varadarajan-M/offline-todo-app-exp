import type { RefObject } from "react";

type Props = {
  onSubmit: (e: React.FormEvent) => void;
} & React.PropsWithChildren<{
    ref: RefObject<HTMLInputElement | null>;
  }>;

const TodoForm = ({ ref, onSubmit }: Props) => (
  <form className="todo-form" onSubmit={onSubmit}>
    <input
      ref={ref}
      type="text"
      className="todo-input"
      placeholder="What needs to be done?"
      required
    />
    <button type="submit" className="todo-button">
      Add Task
    </button>
  </form>
);

export default TodoForm;
