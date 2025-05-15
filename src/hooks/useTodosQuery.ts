import { useQuery } from "@tanstack/react-query";
import type { Todo } from "../types";

export const useTodosQuery = () => {
  const url = "https://68236f8665ba05803396bc75.mockapi.io/api/todos";

  return useQuery({
    queryKey: ["todos"],
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => {  
      const response = await fetch(url);
      if (response.status !== 200) throw new Error("Network response was not ok");
      return response.json() as Promise<Todo[]>;
    },
  });
};
