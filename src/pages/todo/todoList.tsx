import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ITodo } from "@/service/toboTypes";
import todoService from "@/service/todoService";
import dayjs from "dayjs";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import CreateTodoList from "./createTodoList";
export interface IFilter {
  page?: number;
  limit?: number;
  total?: number;
}

const TodoList = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [filter, setFilter] = useState<IFilter>({
    limit: 10,
    page: 1,
  });
  async function getAllTodoList(filter: IFilter) {
    try {
      const response = await todoService.fetchTodoData(filter!);

      const { data } = response;
      console.log(data);
      setTodos(data.result);
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteTodoById(id: string) {
    try {
      const response = await todoService.deleteTodoById(id);

      const { data } = response;
      console.log(data);
      getAllTodoList(filter);
    } catch (error) {
      console.log(error);
    }
  }

  const handelReload = () => {
    getAllTodoList(filter);
  };
  console.log(filter);
  useEffect(() => {
    getAllTodoList(filter);
  }, [filter]);
  return (
    <>
      <div className="w-full min-h-screen px-6 py-10">
        <div className="w-full max-w-5xl mx-auto border rounded-3xl p-5 bg-background">
          <div className="flex justify-end mb-4">
            <CreateTodoList type="add" handelReload={handelReload} />
          </div>

          <Table>
            <TableCaption>Your Todo List</TableCaption>

            <TableHeader>
              <TableRow>
                <TableHead>Sl/No</TableHead>
                <TableHead className="w-[150px]">Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Created At</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="flex-1">
              {todos.length > 0 ? (
                todos.map((todo: ITodo, index) => (
                  <TableRow key={todo._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{todo.title}</TableCell>
                    <TableCell className="max-w-[250px] truncate">
                      {todo.description || "—"}
                    </TableCell>
                    <TableCell>
                      {todo.status === 1 ? (
                        <span className="text-red-600 font-semibold">
                          Pendind
                        </span>
                      ) : todo.status === 2 ? (
                        <span className="text-blue-600 font-semibold">
                          In Progress
                        </span>
                      ) : (
                        <span className="text-green-500 font-semibold">
                          Completed
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {todo.createdAt
                        ? dayjs(todo.createdAt).format("DD/MM/YYYY")
                        : "—"}
                    </TableCell>

                    <TableCell className="flex gap-2 justify-center">
                      <CreateTodoList
                        type="edit"
                        id={todo._id}
                        handelReload={handelReload}
                      />

                      <CreateTodoList
                        type="show"
                        id={todo._id}
                        handelReload={handelReload}
                      />

                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => deleteTodoById(todo._id!)}
                        title="Delete"
                      >
                        <Trash2 />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="h-full">
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground"
                  >
                    No todos yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={6}>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        {todos[0]?.total &&
                          todos[0]?.total >= todos[0]?.limit! && (
                            <PaginationPrevious
                              href="#"
                              onClick={() =>
                                todos[0].total! >= todos[0].limit! &&
                                setFilter((prevFilter) => ({
                                  ...prevFilter,
                                  page: todos[0]?.page
                                    ? todos[0].page - 1
                                    : prevFilter.page,
                                }))
                              }
                            />
                          )}
                      </PaginationItem>

                      {todos.length > 0 &&
                        [
                          ...Array(
                            Math.ceil(todos[0].total! / todos[0].limit!)
                          ),
                        ].map((_, idx) => (
                          <PaginationItem key={idx}>
                            <PaginationLink href="#">{idx + 1}</PaginationLink>
                          </PaginationItem>
                        ))}

                      <PaginationItem>
                        {todos[0]?.total &&
                          todos[0]?.total >= todos[0]?.limit! && (
                            <PaginationNext
                              href="#"
                              onClick={() =>
                                todos[0].total! >= todos[0].limit! &&
                                setFilter((prevFilter) => ({
                                  ...prevFilter,
                                  page: todos[0]?.page
                                    ? Number(todos[0].page) + 1
                                    : prevFilter.page,
                                }))
                              }
                            />
                          )}
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </>
  );
};

export default TodoList;
