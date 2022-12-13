const assert = require("assert");
const app = require("../app");
const express = require("express");
app.use(express.json());
const request = require("supertest");

// ROUTE 4: GET /api/user should authenticate the request and return the respective user profile.
describe("GET /api/user", function () {
    it("should respond with Post Details of registered user", async function () {
        const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzg2NTExODllYjZlZTc1YjgxMzU5NTAiLCJpYXQiOjE2Njk3NzY1Nzh9.eA1iFwYjH2w7RbIAI9kVWubxGplBRPLND7FGR_r6oJQ"
        const res = await request(app)
            .get("/api/user")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("Authorization", token)
            .expect(200);
            
        assert.ok(res.body.success && typeof res.body.userDetails === "object" && typeof res.body.userDetails !== null);
    });
});
