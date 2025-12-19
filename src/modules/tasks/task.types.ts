

export interface tasks{
  title:string,
  description:string,
  priority: "low" | "medium" | "high",
  status: "todo" | "in_progress" | "done",
  userId:string,
  createdAt:string
}