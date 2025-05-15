import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToQueue } from "../util";
import toast from "react-hot-toast";
import type { Todo } from "../types";

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();
  const url = "https://68236f8665ba05803396bc75.mockapi.io/api/todos";

  return useMutation({
    networkMode: "always",
    mutationKey: ["deleteTodo"],
    mutationFn: async (id: string) => {
      if (!navigator.onLine) {
        addToQueue({
          url: `${url}/${id}`,
          method: "DELETE",
          body: {},
        });
        throw new Error("Please go online to sync changes!");
      }

      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return id;
    },
    onMutate: (id) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);
      if (previousTodos) {
        queryClient.setQueryData(
          ["todos"],
          previousTodos.filter((todo) => todo.id !== id)
        );
      }
      return { previousTodos };
    },
    onError: (error, __, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
      toast.error(error?.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
