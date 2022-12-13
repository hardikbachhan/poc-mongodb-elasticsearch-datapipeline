const assert = require('assert');
const app = require('../app');
const request = require('supertest');

// ROUTE 11: GET /api/all_posts would return all posts created by authenticated user sorted by post time.
describe('GET /api/all_posts/', function () {
  it('should respond with an Array containing JSON objects containing post details', async function () {
    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzg2NTE0YmUxOWNmZTI5OTlmNDE1ODMiLCJpYXQiOjE2Njk3OTAzNTl9.pD4wTasACHDiUFgmAnBJslxwk5AldRiNKekhVJ5hOCQ";
    const res = await request(app)
        .get("/api/all_posts/")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect(200);
        
    assert.ok(res.body.success === true && Array.isArray(res.body.allPosts));
  });
});