const assert = require("assert");
const app = require("../app");
const express = require("express");
app.use(express.json());
const request = require("supertest");

// ROUTE 9: POST /api/comment/:id should perform user authentication and return a JWT token.
describe("POST /api/comment/id", function () {
    it("should respond with JWT", async function () {
        const payload = {
            comment: "this is a test comment",
        };
        const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzg2NDYwOWU2NzFhYmI0MGUyZDBlYjkiLCJpYXQiOjE2Njk3ODQ5ODh9.xxs_0psFrUQikMLvXduxknE8yn7Zh--aNmt_oRwgEdU";
        const res = await request(app)
            .post("/api/comment/6386d3c7abb583678ae620e1")
            .send(payload)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("Authorization", token)
            .expect(200);
            
        assert.ok(res.body.success && typeof res.body.commentId === "string");
    });
});
