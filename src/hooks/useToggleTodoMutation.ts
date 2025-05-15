import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "../types";
import { addToQueue } from "../util";
import toast from "react-hot-toast";

export const useToggleTodoMutation = () => {
  const queryClient = useQueryClient();

  const url = "https://68236f8665ba05803396bc75.mockapi.io/api/todos";

  return useMutation({
    networkMode: "always",
    mutationKey: ["toggleTodo"],
    mutationFn: async (todo: Todo) => {
      const updatedTodo = { ...todo, completed: !todo.completed };

      if (!navigator.onLine) {
        addToQueue({
          url: `${url}/${todo.id}`,
          method: "PUT",
          body: updatedTodo,
        });
        throw new Error("Please go online to sync changes!");
      }

      const response = await fetch(`${url}/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json() as Promise<Todo>;
    },
    onMutate: (todo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);
      if (previousTodos) {
        queryClient.setQueryData(
          ["todos"],
          previousTodos.map((t) =>
            t.id === todo.id ? { ...t, completed: !t.completed } : t
          )
        );
      }
      return { previousTodos };
    },
    onError: (error, __, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
      toast(error?.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
