const request = require("supertest");
const app = require("../app");
const db = require("../models");

describe("Organization Endpoints", () => {
  const newEntry = {
    name: "nombre",
    image: "image.com",
    phone: 3454534,
    address: "Adress",
    welcomeText: "Welcome text",
    facebook: "testfacebook",
    linkedin: "testlinkedin",
    instagram: "testinstagram",
  };

  const entryUpdated = {
    name: "nombre actualizado",
  };

  let idTest;

  it("should create a new ong", async () => {
    await request(app).post("/organizations").send({ name: "organization" });

    const res = await request(app).post("/organizations").send(newEntry);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.name).toBe(newEntry.name);
    expect(res.body.data.phone).toBe(newEntry.phone);
    expect(res.body.data.image).toBe(newEntry.image);
    expect(res.body.data.adress).toBe(newEntry.adress);
    expect(res.body.data.welcomeText).toBe(newEntry.welcomeText);
    expect(res.body.data).toHaveProperty("updatedAt");
    expect(res.body.data).toHaveProperty("createdAt");

    idTest = res.body.data.id;
  });

  it("should fetch an organization by id", async () => {
    const res = await request(app)
      .get(`/organizations/${idTest}/public`)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.name).toBe(newEntry.name);
    expect(res.body.data.phone).toBe(newEntry.phone);
    expect(res.body.data.image).toBe(newEntry.image);
    expect(res.body.data.adress).toBe(newEntry.adress);
    expect(res.body.data.welcomeText).toBe(newEntry.welcomeText);
    expect(res.body.data.social_media).toHaveProperty("facebook");
    expect(res.body.data.social_media).toHaveProperty("instagram");
    expect(res.body.data.social_media).toHaveProperty("linkedin");
    expect(res.body.data).toHaveProperty("createdAt");
    expect(res.body.data).toHaveProperty("updatedAt");
  });

  it("should update an organization by id", async () => {
    const res = await request(app)
      .put(`/organizations/${idTest}`)
      .send(entryUpdated);

    expect(res.body.data.name).toBe(entryUpdated.name);
    expect(res.body.data).toHaveProperty("updatedAt");
    expect(res.body.data).toHaveProperty("createdAt");
  });

  it("should delete an Organization by id", async () => {
    const res = await request(app).delete(`/organizations/${idTest}`).send();

    expect(res.statusCode).toEqual(200);
  });

  it("should return validation error when creating a post", async () => {
    const res = await request(app).post("/organizations").send();

    expect(res.statusCode).toEqual(400);
  });

  it("should return not found", async () => {
    const res = await request(app).get(`/organizations/9999/public`).send();

    expect(res.statusCode).toEqual(404);
  });

  it("should return not found", async () => {
    const res = await request(app).put("/organizations/9999").send();

    expect(res.statusCode).toEqual(404);
  });

  afterAll(async (done) => {
    db.sequelize.close();
    done();
  });
});
