const supertest = require("supertest");
const app = require("../app");
const db = require("../models");
const api = supertest(app);

describe("Testimonials endpoints", () => {
  let user = {
    email: "yuliya@test.com",
    password: "yuliya",
  };
  let tokenTrue;
  let tokenExpired = null;
  const newRecordNull = null;

  const newTestimonial = {
    name: "test",
    content: "content",
    image: "https://images.com",
    createdAt: new Date(2021, 4, 21),
    updatedAt: new Date(2021, 4, 21),
  };
  const updatedTestimonial = {
    name: "updated",
  };

  const idTrue = 1;
  const idFalse = 15151515;

  // create token
  beforeAll((done) => {
    supertest(app)
      .post("/users/auth/login")
      .send(user)
      .end((err, response) => {
        tokenTrue = response.body.token;
        done();
      });
  });
  const base = { Authorization: tokenTrue };

  // testing creating a new testimonial (POST /testimonials)

  // create id to delete in test
  let idToDelete;

  it("should create a new testimonial", async () => {
    const res = await api
      .post("/testimonials")
      .set({ Authorization: tokenTrue })
      .send(newTestimonial);

    expect(res.type).toBe("application/json");
    expect(res.statusCode).toEqual(201);
    expect(res.body.data.name).toBe(newTestimonial.name);
    expect(res.body.data.content).toBe(newTestimonial.content);
    expect(res.body.data.image).toBe(newTestimonial.image);
    expect(res.body.data).toHaveProperty("updatedAt");
    expect(res.body.data).toHaveProperty("createdAt");

    idToDelete = res.body.data.id;
  });

  it("It shouldn't create a testimonial when the empty object is passed", async () => {
    const res = await api
      .post("/testimonials")
      .set({ Authorization: tokenTrue })
      .send(newRecordNull)
      .then((res) => {
        expect(res.type).toBe("application/json");
        expect(res.statusCode).toEqual(400);
        expect(res).toHaveProperty("ok");
        expect(res.body.error).toHaveProperty("msg");
        expect(res.body.error).toHaveProperty("status");
        expect(res.body.error).toHaveProperty("data");
      });
  });

  it("It shouldn't create a testimonial when the token is expired", async () => {
    let baseExpired = { Authorization: tokenExpired };
    const res = await api
      .post("/testimonials")
      .set(baseExpired)
      .send(newTestimonial)
      .then((res) => {
        expect(res.type).toBe("application/json");
        expect(res.statusCode).toEqual(401);
        expect(res).toHaveProperty("ok");
        expect(res.body).toEqual({
          data: { message: "The token has expired", status: 401 },
        });
      });
  });

  // testing fetching a list of all the testimonials (GET /testimonials)
  it("It should respond with an array of testimonials", async () => {
    const res = await api.get("/testimonials").then((res) => {
      expect(res.type).toBe("application/json");
      expect(res.statusCode).toEqual(200);
      expect(res.body[0]).toHaveProperty("id");
      expect(res.body[0]).toHaveProperty("createdAt");
      expect(res.body[0]).toHaveProperty("content");
      expect(res.body[0]).toHaveProperty("name");
      expect(res.body[0]).toHaveProperty("image");
      expect(res.body[0]).toHaveProperty("updatedAt");
      expect(res.body[0]).toHaveProperty("createdAt");
    });
  });

  // testing updating an existing testimonial (PUT /testimonials/:id)

  it("It should update a testimonial by id", async () => {
    const res = await api
      .put(`/testimonials/${idTrue}`)
      .set({ Authorization: tokenTrue })
      .send(updatedTestimonial)
      .then((res) => {
        expect(res.type).toBe("application/json");
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("OK");
        expect(res.body.data).toHaveProperty("id");
        expect(res.body.data).toHaveProperty("updatedAt");
        expect(res.body.data).toHaveProperty("createdAt");
        expect(res.body.data).toHaveProperty("content");
        expect(res.body.data).toHaveProperty("name");
        expect(res.body.data).toHaveProperty("image");
        expect(res.body.data.name).toBe(updatedTestimonial.name);
      });
  });

  it("It should return error when trying to update a testimonial with id that doesn't exist", async () => {
    const res = await api
      .put(`/testimonials/${idFalse}`)
      .set({ Authorization: tokenTrue })
      .send(updatedTestimonial)
      .then((res) => {
        expect(res.type).toBe("application/json");
        expect(res.statusCode).toEqual(404);
        expect(res).toHaveProperty("ok");
        expect(res.body.error).toHaveProperty("msg");
        expect(res.body.error).toHaveProperty("status");
      });
  });

  // testing deleting an existing testimonial (DELET /testimonials/:id)

  it("It should delete a testimonial", async () => {
    const res = await api
      .delete(`/testimonials/${idTrue}`)
      .set({ Authorization: tokenTrue })
      .then((res) => {
        expect(res.type).toBe("application/json");
        expect(res.statusCode).toEqual(200);
        expect(res).toHaveProperty("ok");
        expect(res.body.message).toEqual("Testimony successfully deleted!");
      });
  });

  afterAll(async (done) => {
    db.sequelize.close();
    done();
  });
});
