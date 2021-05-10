const request = require("supertest");
const app = require("../app");

let token;
const authInvalid = {
  token:
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9YxOTIxMzI5NCwiYXVkIjoidGhlLWRvbWFpbi1vbmciLCJpc3MiOiJPbmctbmFtZSJ9.qnUj8Q1o4Y1us4FCDrCX_c2oCHyZ24C0J7D2EF7dMrys-KIWaJXJ58v5a7-weTG3J8skcEyV3JosUKeR5cbI_Z6j_kEyh16sMn0whMuAENlB7nxcGR_3mNiAZmBaSrb7wm020s3QbaVVjaBpTpzuG0jYHDyPJSqkXeJsGw7nMkg",
};
var id = 11;
var idInvalid = 99999;
var newUser = {
  email: "testedit@test.com",
  password: "editpassword",
  firstName: "test",
  lastName: "jest",
};
/*
  # Testing: obtaining all users with correct token
*/
describe("GET /users", () => {
  let user = {
    email: "manuel@test.com",
    password: "manuel",
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
  it("obtaining all users with correct token", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", token);
    expect(response.status).toBe(200);
    expect(response.body.body).not.toBeNull();
  });
});
/*
  # Testing: getting all users with wrong token
*/
describe("GET /users", () => {
  it("getting all users with wrong token", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", `${authInvalid.token}`);
    expect(response.status).toBe(401);
    expect(response.body.body).not.toBeNull();
  });
});
/*
  # Testing: Get users without token
*/
describe("GET /users", () => {
  it("Get users without token", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(403);
    expect(response.body.body).not.toBeNull();
  });
});
/*
  # Testing: Delete user by id
*/
describe("Delete /users", () => {
  it("Delete user by id", async () => {
    const response = await request(app)
      .delete(`/users/${id}`)
      .set("Authorization", token);
    expect(response.status).toBe(200);
  });
});
/*
  # Testing: Delete user by wrong id
*/
describe("Delete /users", () => {
  it("Delete user by wrong id ", async () => {
    const response = await request(app)
      .delete(`/users/${idInvalid}`)
      .set("Authorization", token);
    expect(response.status).toBe(404);
  });
});
/*
  # Testing: Delete user by id, wrong token
*/
describe("Delete /users", () => {
  it("Delete user by id, wrong token", async () => {
    const response = await request(app)
      .delete(`/users/${id}`)
      .set("Authorization", `${authInvalid.token}`);
    expect(response.status).toBe(401);
  });
});
/*
  # Testing: Delete user without token
*/
describe("Delete /users", () => {
  it("Delete user without token", async () => {
    const response = await request(app).delete(`/users/${id}`);
    expect(response.status).toBe(403);
  });
});
/*
  # Testing: Edit user with correct token and id
*/
describe("PUT /users", () => {
  it("Edit user with correct token and id", async () => {
    const response = await request(app)
      .put(`/users/${id}`)
      .set("Authorization", token)
      .send(newUser);
    expect(response.status).toBe(200);
  });
});
/*
  # Testing: Edit user without token
*/
describe("PUT /users", () => {
  it("Edit user without token", async () => {
    const response = await request(app).put(`/users/${id}`).send(newUser);
    expect(response.status).toBe(403);
  });
});
/*
  # Testing: Edit user Edit user with wrong token
*/
describe("PUT /users", () => {
  it("Edit user Edit user with wrong token", async () => {
    const response = await request(app)
      .put(`/users/${id}`)
      .send(newUser)
      .set("Authorization", `${authInvalid.token}`);
    expect(response.status).toBe(401);
  });
});
