import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "../types";
import { addToQueue } from "../util";
import toast from "react-hot-toast";

export const useTodoMutation = () => {
  const queryClient = useQueryClient();
  const url = "https://68236f8665ba05803396bc75.mockapi.io/api/todos";

  return useMutation({
    networkMode: "always",
    mutationKey: ["addTodo"],
    mutationFn: async (newTodo: Todo) => {
      if (!navigator.onLine) {
        addToQueue({
          url,
          method: "POST",
          body: newTodo,
        });
        throw new Error("Please go online to sync changes!");
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json() as Promise<Todo>;
    },
    onMutate: (newTodo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);
      if (previousTodos) {
        queryClient.setQueryData(["todos"], [...previousTodos, newTodo]);
      }
      return { previousTodos };
    },
    onSuccess: () => {
      toast.success("Todo added successfully");
    },
    onError: (error, _, context) => {
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
