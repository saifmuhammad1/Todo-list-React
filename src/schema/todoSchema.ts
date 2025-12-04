import { z } from "zod";

export const TodoSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(1, "Title is required").max(200, "Max 200 characters"),

  description: z.string().max(500, "Max 500 characters").optional(),

  status: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
});
