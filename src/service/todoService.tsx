import api from "@/api/axios";
import type { ITodo } from "./toboTypes";
import type { IFilter } from "@/pages/todo/todoList";

const URL_PATH = `/api/todos`;

const todoService = {
  fetchTodoData(payload: IFilter) {
    return api.get(URL_PATH, {
      params: payload,
    });
  },

  addTodoData(payload: ITodo) {
    return api.post(`${URL_PATH}/create`, payload);
  },
  fetchTodoById(id: string) {
    return api.get(`${URL_PATH}/getTodoByid?id=${id}`);
  },
  updateTodoData(payload: ITodo) {
    return api.put(`${URL_PATH}/updateTodo`, payload);
  },
  deleteTodoById(id: string) {
    return api.delete(`${URL_PATH}/deleteTodoData?id=${id}`);
  },
};

export default todoService;
