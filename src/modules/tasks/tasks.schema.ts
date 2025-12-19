import z from "zod";
export const createTaskSchema=z.object({
  title:z.string().min(1).max(255),
  description:z.string().max(500).optional(),
  priority:z.enum(["low","medium","high"])
});