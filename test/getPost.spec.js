const assert = require('assert');
const app = require('../app');
const request = require('supertest');

// ROUTE 10: GET api/posts/{id} would return a single post with {id} populated with its number of likes and comments
describe('GET /api/posts/:id', function () {
  it('should respond with a JSON object containing success code and JSON object containing post details', async function () {
    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzg2NDYwOWU2NzFhYmI0MGUyZDBlYjkiLCJpYXQiOjE2Njk3ODQ5ODh9.xxs_0psFrUQikMLvXduxknE8yn7Zh--aNmt_oRwgEdU";
    const res = await request(app)
        .get("/api/posts/6386d3c7abb583678ae620e1")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect(200);
        
    assert.ok(res.body.success === true && typeof res.body.postObj === "object" && typeof res.body.postObj !== null);
  });
});