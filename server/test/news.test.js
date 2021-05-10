const request = require("supertest");
const app = require("../app");
const db = require("../models");

describe("News Endpoints", () => {
  let token;

  const newEntry = {
    name: "nombre",
    content: "contenido",
    image: "imagen.com",
    categoryId: 1,
  };

  const entryUpdated = {
    name: "nombre actualizado",
  };

  beforeAll(async (done) => {
    await request(app)
      .post("/users/auth/login")
      .send({
        email: "gonzalor@test.com",
        password: "gonzalor",
      })
      .end((err, response) => {
        token = response.body.token;
        done();
      });
  });
  // create id to fetch later on
  let idToFetch;

  it("should create a new new", async () => {
    await request(app).post("/categories").send({ name: "categoria" });

    const res = await request(app)
      .post("/news")
      .set("authorization", token)
      .send(newEntry);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.name).toBe(newEntry.name);
    expect(res.body.data.content).toBe(newEntry.content);
    expect(res.body.data.image).toBe(newEntry.image);
    expect(res.body.data.categoryId).toBe(newEntry.categoryId);
    expect(res.body.data).toHaveProperty("updatedAt");
    expect(res.body.data).toHaveProperty("createdAt");

    idToFetch = res.body.data.id;
  });

  it("should return unaunthorized when i post", async () => {
    const res = await request(app).post("/news").send(newEntry);

    expect(res.statusCode).toEqual(403);
  });

  it("should return unaunthorized when i update", async () => {
    const res = await request(app).put("/news/1").send(entryUpdated);

    expect(res.statusCode).toEqual(403);
  });

  it("should return unaunthorized when i delete", async () => {
    const res = await request(app).delete("/news/1").send(entryUpdated);

    expect(res.statusCode).toEqual(403);
  });

  it("should fetch all news", async () => {
    const res = await request(app).get("/news").send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    expect(res.body.data[0].name).toBe(newEntry.name);
    expect(res.body.data[0].image).toBe(newEntry.image);
    expect(res.body.data[0]).toHaveProperty("createdAt");
  });

  it("should fetch a new by id", async () => {
    const res = await request(app).get(`/news/${idToFetch}`).send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.name).toBe(newEntry.name);
    expect(res.body.data.content).toBe(newEntry.content);
    expect(res.body.data.image).toBe(newEntry.image);
    expect(res.body.data.categoryId).toBe(newEntry.categoryId);
    expect(res.body.data).toHaveProperty("updatedAt");
    expect(res.body.data).toHaveProperty("createdAt");
  });

  it("should update a new by id", async () => {
    const res = await request(app)
      .put(`/news/${idToFetch}`)
      .set("authorization", token)
      .send(entryUpdated);

    expect(res.body.data.name).toBe(entryUpdated.name);
    expect(res.body.data).toHaveProperty("updatedAt");
    expect(res.body.data).toHaveProperty("createdAt");
  });

  it("should delete a new by id", async () => {
    const res = await request(app)
      .delete(`/news/${idToFetch}`)
      .set("authorization", token)
      .send();

    expect(res.statusCode).toEqual(200);
  });

  it("should return validation error when creating a post", async () => {
    const res = await request(app)
      .post("/news")
      .set("authorization", token)
      .send();

    expect(res.statusCode).toEqual(400);
  });

  it("should return not found when i get", async () => {
    const res = await request(app)
      .get("/news/999")
      .set("authorization", token)
      .send();

    expect(res.statusCode).toEqual(404);
  });

  it("should return not found when i update", async () => {
    const res = await request(app)
      .put("/news/999")
      .set("authorization", token)
      .send();

    expect(res.statusCode).toEqual(404);
  });

  it("should return not found when i delete", async () => {
    const res = await request(app)
      .delete("/news/999")
      .set("authorization", token)
      .send();

    expect(res.statusCode).toEqual(404);
  });

  afterAll(async (done) => {
    db.sequelize.close();
    done();
  });
});
