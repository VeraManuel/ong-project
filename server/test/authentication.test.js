const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const db = require("../models");

describe("Auth Endpoints", () => {
  let newUser = {
    email: "test12@test.com",
    password: "passwordtesting",
    firstName: "test",
    lastName: "jest",
  };

  // Register Routes Test

  it("Test register route", async () => {
    const response = await request.post("/users/auth/register").send(newUser);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("token");
    expect(response.body.user).toBe(newUser.email);
    expect(response.body.firstName).toBe(newUser.firstName);
    expect(response.body.lastName).toBe(newUser.lastName);
  });

  it("Test register route introducing a existing user (duplicated mail)", async () => {
    const response = await request.post("/users/auth/register").send(newUser);

    expect(response.status).toEqual(400);
    expect(response.body.error.data.email.msg).toBe(
      "Email already exist in DB"
    );
  });

  it("Test register route introducing a user without firstName", async () => {
    let user = {
      email: "testname@test.com",
      password: "firstName",
      lastName: "lastName",
    };
    const response = await request.post("/users/auth/register").send(user);

    expect(response.status).toEqual(400);
    expect(response.body.OK).toBe(false);
    expect(response.body.error.data.firstName.msg).toBe(
      "First Name is required!"
    );
  });

  it("Test register route introducing a user without lastName", async () => {
    let user = {
      email: "testlastname@test.com",
      password: "lastName",
      firstName: "firstName",
    };
    const response = await request.post("/users/auth/register").send(user);

    expect(response.status).toEqual(400);
    expect(response.body.OK).toBe(false);
    expect(response.body.error.data.lastName.msg).toBe(
      "Last Name is required!"
    );
  });

  it("Test register route introducing a user with short Password (less than 6)", async () => {
    let user = {
      email: "testshotpassword@test.com",
      password: "12345",
      firstName: "firstName",
      lastName: "lastName",
    };
    const response = await request.post("/users/auth/register").send(user);

    expect(response.status).toEqual(400);
    expect(response.body.OK).toBe(false);
    expect(response.body.error.data.password.msg).toBe(
      "Password is required and must be more than 6 characters!"
    );
  });

  it("Test register route introducing a user without email", async () => {
    let user = {
      password: "12345",
      firstName: "firstName",
      lastName: "lastName",
    };
    const response = await request.post("/users/auth/register").send(user);

    expect(response.status).toEqual(400);
    expect(response.body.OK).toBe(false);
    expect(response.body.error.data.email.msg).toBe("Email is required!");
  });

  // Login user route test

  // create a token
  let token;

  it("Test login route", async () => {
    let user = {
      email: newUser.email,
      password: newUser.password,
    };
    const response = await request.post("/users/auth/login").send(user);

    token = response.body.token;

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.user).toBe(newUser.email);
    expect(response.body.firstName).toBe(newUser.firstName);
    expect(response.body.lastName).toBe(newUser.lastName);
  });

  it("Test login route passing a invalid mail", async () => {
    let user = {
      email: "fqwdsf",
      password: "12345",
    };
    const response = await request.post("/users/auth/login").send(user);

    expect(response.status).toEqual(400);
    expect(response.body.OK).toBe(false);
    expect(response.body.error.data.email.msg).toBe("Email is invalid!");
  });

  it("Test login route passing a wrong password", async () => {
    let user = {
      email: newUser.email,
      password: "wrongpassword",
    };
    const response = await request.post("/users/auth/login").send(user);

    expect(response.status).toEqual(401);
    expect(response.body.OK).toBe(false);
    expect(response.body.error.msg).toBe(
      "Authentication failed! Email / Password not found!"
    );
  });

  it("Test login route passing a wrong email right password", async () => {
    let user = {
      email: "testooo@test.com",
      password: newUser.password,
    };
    const response = await request.post("/users/auth/login").send(user);

    expect(response.status).toEqual(401);
    expect(response.body.OK).toBe(false);
    expect(response.body.error.msg).toBe(
      "Authentication failed! Email / Password not found!"
    );
  });
  it("Test login route without mail or password", async () => {
    let user = {
      email: "",
      password: "",
    };
    const response = await request.post("/users/auth/login").send(user);

    expect(response.status).toEqual(400);
    expect(response.body.OK).toBe(false);
    expect(response.body.error.data.email.msg).toBe("Email is required!");
    expect(response.body.error.data.password.msg).toBe(
      "Password is required and must be more than 6 characters!"
    );
  });

  // Test for personal info

  it("Test personal info route", async () => {
    const response = await request.get("/users/auth/me").set({
      Authorization: token,
    });

    expect(response.type).toBe("application/json");
    expect(response.status).toEqual(200);
    expect(response.body.OK).toBe(true);
    expect(response.body.data.firstName).toBe(newUser.firstName);
    expect(response.body.data.lastName).toBe(newUser.lastName);
    expect(response.body.data.email).toBe(newUser.email);
    expect(response.body.data).toHaveProperty("image");
    expect(response.body.data).toHaveProperty("roleId");
  });

  it("Test personal info route without token", async () => {
    const response = await request.get("/users/auth/me");

    expect(response.status).toEqual(403);
    expect(response.body.OK).toBe(false);
  });

  afterAll(async (done) => {
    db.sequelize.close();
    done();
  });
});
