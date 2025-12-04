import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TodoSchema } from "@/schema/todoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import todoService from "@/service/todoService";
import { useEffect, useState } from "react";
import { Eye, Pencil } from "lucide-react";
import Spinner from "@/components/spinner";
export type TFormActionTypes = "add" | "edit" | "show";
type TAddFormValues = z.infer<typeof TodoSchema>;

const CreateTodoList = ({
  type = "add",
  id,
  handelReload,
}: {
  type?: TFormActionTypes;
  id?: string;
  handelReload: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,

    control,
    reset,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<TAddFormValues>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      title: "",
      description: "",
      status: 1,
    },
  });

  const onSubmit = async (formValues: TAddFormValues) => {
    console.log("Form Submitted:", formValues);

    if (type == "add") {
      try {
        console.log(errors, "hii");
        const response = await todoService.addTodoData(formValues);
        const { data } = response;
        if (!data || !data?.isSuccess) {
          console.log(data.todo);
          setOpen(false);
          handelReload();
          reset();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        console.log("the vaue is ", formValues);
        const response = await todoService.updateTodoData(formValues);
        const { data } = response;
        if (!data || !data?.isSuccess) {
          setOpen(false);
          handelReload();
          reset();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  async function getTodoById(id: string) {
    try {
      const response = await todoService.fetchTodoById(id);

      const { data } = response;

      reset(data.todo);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (open && id) {
      getTodoById(id);
    }
  }, [id, open]);

  console.log(open);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-primary text-primary-foreground"
          onClick={() => setOpen(true)}
          title={type === "add" ? "Add" : type === "edit" ? "Edit" : "View"}
        >
          {type === "add" ? "Create" : type === "edit" ? <Pencil /> : <Eye />}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col gap-4"
        >
          <DialogHeader>
            <DialogTitle>
              {" "}
              {type === "add" ? "Add" : type === "edit" ? "Edit" : "View"} Todo
            </DialogTitle>
            <DialogDescription>
              Add Your Upcoming Todo and Task.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Title"
                {...register("title")}
                disabled={type === "show"}
              />
              {<span className="text-red">{errors.title?.message} </span>}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Type your message here."
                {...register("description")}
                disabled={type === "show"}
              />
            </div>

            <div className="grid gap-3">
              <Label>Status</Label>

              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <ToggleGroup
                    type="single"
                    value={String(field.value)}
                    onValueChange={(val) => val && field.onChange(Number(val))}
                    className="gap-3"
                    disabled={type === "show"}
                  >
                    <ToggleGroupItem
                      value="1"
                      className="border data-[state=on]:bg-red-500 data-[state=on]:text-white"
                    >
                      Pending
                    </ToggleGroupItem>

                    <ToggleGroupItem
                      value="2"
                      className="border data-[state=on]:bg-blue-600 data-[state=on]:text-white"
                    >
                      In-Progress
                    </ToggleGroupItem>

                    <ToggleGroupItem
                      value="3"
                      className="border data-[state=on]:bg-green-500 data-[state=on]:text-white"
                    >
                      Completed
                    </ToggleGroupItem>
                  </ToggleGroup>
                )}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                disabled={type === "show"}
              >
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={type === "show"}>
              {isLoading || isSubmitting ? (
                <>
                  <Spinner classNames="text-white" />
                  <span>Submitting....</span>
                </>
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTodoList;
