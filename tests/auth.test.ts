import request from "supertest"
import {describe,it,beforeAll, expect} from "vitest"
import { createApp } from "../src/app"
import e from "express";
import { StringValidation } from "zod/v3";


const app=createApp();

const user = {
  email: `test_${Date.now()}@example.com`,
  password: "12345678",
};


let refreshToken:string;
let userid:string;
let role:string;

describe("Auth Flow",()=>{
// registration of user
 process.env.NODE_ENV = "test";
  it("Register a new user",async ()=>{
    const result=await request(app)
    .post("/auth/register")
    .send(user);
 
  expect(result.status).toBe(201);
  expect(result.body).toHaveProperty("id");
  expect(result.body.email).toBe(user.email);
 });


// logs in user
it("logins in a user",async ()=>{
const result=await request(app)
.post("/auth/login")
.send(user);
console.log(result.body);
expect(result.status).toBe(200);
expect(result.body).toHaveProperty("accessToken");
expect(result.body).toHaveProperty("refreshToken");

refreshToken=result.body.refreshToken;

});


// refreshes access token
it("refreshes access token",async ()=>{
  const result=await request(app)
  .post("/auth/refresh")
  .send({refreshToken});

  expect(result.status).toBe(200);
  expect(result.body).toHaveProperty("accessToken");
})


// login with wrong password
it("fails a login with wrong password",async ()=>{
const result=await request(app)
.post("/auth/login")
.send({
  email:user.email,
  password:"wrong password"
});

expect(result.status).toBe(401);
});


//wrong refresh token
it("fails refresh with invalid token",async ()=>{
const result=await request(app)
.post("/auth/refresh")
.send({ refreshToken:"fake.refresh.token"});

expect(result.status).toBe(401);

});


});

//wrong password
it("Wrong password in a user",async ()=>{
const result=await request(app)
.post("/auth/login")
.send({
   email: `test_${Date.now()}@example.com`,
  password: "123456789",
});

expect(result.status).toBe(401);

});

it("update the role of user",async ()=>{
  const result=request(app)
  .patch("/users/:id/:role")
  .send({
    
  })
  
});