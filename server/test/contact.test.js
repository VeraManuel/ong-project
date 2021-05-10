const request = require("supertest");
const app = require("../app");
const { Contact } = require("../models");

describe("Contact Endpoint Test", () => {
  let user = {
    email: "manuel@test.com",
    password: "manuel",
  };
  let token;
  const contact1 = {
    name: "test1",
    email: "test1@test.com",
    phone: "123456",
    message: "My message 1",
  };
  const contact2 = {
    name: "test2",
    email: "test2@test.com",
    phone: "123456",
    message: "My message 2",
  };

  // create token
  beforeAll((done) => {
    request(app)
      .post("/users/auth/login")
      .send(user)
      .end((err, response) => {
        token = response.body.token;
        done();
      });
  });

  beforeEach(async () => {
    await Contact.destroy({ truncate: true });
    await Contact.create({ ...contact1 });
  });

  it("get all contacts", async () => {
    const res = await request(app)
      .get("/contacts/")
      .set({ Authorization: token });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].name).toBe(contact1.name);
    expect(res.body.data[0].email).toBe(contact1.email);
    expect(res.body.data[0].phone).toBe(contact1.phone);
    expect(res.body.data[0].message).toBe(contact1.message);
  });

  it("should create a contact", async () => {
    const res = await request(app)
      .post("/contacts/")
      .send(contact2)
      .set({ Authorization: token });

    const contacts = await request(app)
      .get("/contacts")
      .set({ Authorization: token });

    expect(res.statusCode).toEqual(200);
    expect(contacts.body.data).toHaveLength(2);
  });

  it("error when i create with less data", async () => {
    const res = await request(app)
      .post("/contacts")
      .send({ name: "myName" })
      .set({ Authorization: token });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toHaveProperty("msg");
    expect(res.body.error).toHaveProperty("status");
    expect(res.body.error).toHaveProperty("data");
  });

  afterAll(async (done) => {
    Contact.sequelize.close();
    done();
  });
});
