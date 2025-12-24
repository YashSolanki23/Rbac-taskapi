import request from "supertest";
import { beforeAll, expect, it } from "vitest";
import { createApp } from "../src/app";

const app = createApp();

const user = {
  email: "testusef4rf1@gmail.com",
  password: "password12345"
};

let token: string;
let taskId:string;

beforeAll(async () => {
  const res = await request(app)
    .post("/auth/login")
    .send(user);
console.log(res.status)
console.log(res.body)
  token = res.body.accessToken;
});
// creation of task
it("should create a task", async () => {
  const res = await request(app)
    .post("/tasks/createtask")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "learn testing",
      description: "supertest and vitest",
      priority: "high",
    });
    
console.log(res.body)
  expect(res.status).toBe(201);
  expect(res.body.data[0].title).toBe("learn testing");

taskId=res.body.data[0].id
});

it("should fail without a title",async ()=>{
  const res=await request(app)
    .post("/tasks/createtask")
    .set("Authorization", `Bearer ${token}`)
    .send({
      description: "missing heading"
    });
    
    expect(res.status).toBe(400);
})



it("should update a task", async () => {

  const res = await request(app)
    .patch(`/tasks/${taskId}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      status: "completed",
    });

  console.log(res.body);

  expect(res.status).toBe(200);
  expect(res.body.data.status).toBe("completed");
});

it("should delete a task",async ()=>{
const res = await request(app)
    .delete(`/tasks/${taskId}`)
    .set("Authorization", `Bearer ${token}`)
expect(res.status).toBe(200);
expect(res.body.message).toBe("task deleted")
})

it("should list task",async ()=>{
  const res=await request(app)
  .get('/tasks/')
  .set("Authorization", `Bearer ${token}`)

  expect(res.status).toBe(200)
  expect(Array.isArray(res.body.data)).toBe(true);
})

