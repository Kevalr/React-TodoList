import { useMutation, useQuery } from "@tanstack/react-query";
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "./services";

export const useGetAllTodos = () => useQuery(["todos"],getAllTodos);

export const useCreateTodo = (payload) => useMutation(createTodo);

export const useDeleteTodo = (id) => useMutation(deleteTodo);

export const useUpdateTodo = (payload) => useMutation(updateTodo);
