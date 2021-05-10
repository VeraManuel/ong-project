//Use supertest to test HTTP requests/responses
const request = require("supertest");
//App for testing the routes
const app = require("../app");

describe("Endpoint /activities", () => {
  /*Const to test all case*/
  const newRecordNull = null;
  const newRecord = {
    content: "test2",
    name: "test",
    image: "test.image",
    createdAt: new Date(2021, 4, 21),
    deletedAt: "0000-00-00",
    updatedAt: new Date(2021, 4, 21),
  };
  let token;
  let tokenNotAuthorized =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJGcmFuY2lzY28iLCJsYXN0TmFtZSI6IlJlZ3VsYXIiLCJlbWFpbCI6ImZyYW5jaXNjb0B0ZXN0LmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJG4xRklzTmx6cmgwVUR1YTlYUkRNWGVodHY2WEF3ODdXQ3lZOFV0Rm5FNGJWOHh4R1JnVWtPIiwicm9sZUlkIjoyLCJpYXQiOjI1MTYyMzkwMjJ9.gQozPAPIojQ2G80BRchg4klDCSx3y08CSPlhiJ6ruRqCYoBv86f0ITiHsATTAKajv7ukSZuGe79jsV3rhRmDj6TfY1HBY-rLetp1yZ1mGGmPuJWy38OkG8PDyBu2le0ZG40XDRvdoHDfrRapt7cV8O5JJnSZBMd0XgT9QHNu4k4";
  let tokenExpired = null;
  const updateRecord = {
    content: "update",
    name: "testUpdate",
    image: "test.Update",
    updatedAt: new Date(),
  };
  let idFalse = null;

  beforeAll(async (done) => {
    await request(app)
      .post("/users/auth/login")
      .send({
        email: "santiago@test.com",
        password: "santiago",
      })
      .end((err, response) => {
        token = response.body.token;
        done();
      });
  });

  // create Id to update later
  let idToUpdate;
  it("It should create an activities record", async () => {
    const response = await request(app)
      .post("/activities")
      .set("Authorization", token)
      .send(newRecord)
      .then((response) => {
        expect(response.type).toBe("application/json");
        expect(response.statusCode).toEqual(201);
        expect(response.body.data).toHaveProperty("name");
        expect(response.body.data).toHaveProperty("content");

        idToUpdate = response.body.data.id;
      });
  });
  /*
  # Testing POST to try create an activity record with an empty object 
  */
  it("It shouldn't create an activity record because the object is empty", async () => {
    const response = await request(app)
      .post("/activities")
      .set("Authorization", token)
      .send(newRecordNull)
      .then((response) => {
        expect(response.type).toBe("application/json");
        expect(response.statusCode).toEqual(400);
        expect(response.body).toHaveProperty("error");
        expect(response.body).toHaveProperty("OK");
        expect(response.body.OK).toEqual(false);
      });
  });
  /*
  # Testing POST to create activity record with token expired
  */
  let baseExpired = { Authorization: tokenExpired };
  it("It shouldn't create an activity record because the token is expired ", async () => {
    const response = await request(app)
      .post("/activities")
      .set(baseExpired)
      .send(newRecord)
      .then((response) => {
        expect(response.type).toBe("application/json");
        expect(response.statusCode).toEqual(401);
        expect(response.body).toEqual({
          data: { message: "The token has expired", status: 401 },
        });
      });
  });
  /*
  # Testing POST to create activity record with token expired
  */
  it("It shouldn't create an activity record because the token is not authorized", async () => {
    const response = await request(app)
      .post("/activities")
      .set("Authorization", tokenNotAuthorized)
      .send(newRecord)
      .then((response) => {
        expect(response.type).toBe("application/json");
        expect(response.statusCode).toEqual(401);
      });
  });
  /*
  # Testing GET all activities records
  */
  it("It should respond with an array of activities", async () => {
    const response = await request(app)
      .get("/activities")
      .then((response) => {
        expect(response.type).toBe("application/json");
        expect(response.statusCode).toEqual(200);
        expect(response.body.data[0]).toHaveProperty("id");
        expect(response.body.data[0]).toHaveProperty("createdAt");
        expect(response.body.data[0]).toHaveProperty("content");
        expect(response.body.data[0]).toHaveProperty("name");
        expect(response.body.data[0]).toHaveProperty("image");
      });
  });
  /*
  # Testing GET record by ID 
  */
  it("It should respond with an activity", async () => {
    const response = await request(app)
      .get(`/activities/1`)
      .then((response) => {
        expect(response.type).toBe("application/json");
        expect(response.statusCode).toEqual(200);
        expect(response.body.data).toHaveProperty("id");
        expect(response.body.data).toHaveProperty("createdAt");
        expect(response.body.data).toHaveProperty("content");
        expect(response.body.data).toHaveProperty("name");
        expect(response.body.data).toHaveProperty("image");
      });
  });
  /*
  # Testing PUT to update an activity by ID 
  */
  it("It should update an activity by id", async () => {
    const response = await request(app)
      .put(`/activities/${idToUpdate}`)
      .set("Authorization", token)
      .send(updateRecord);

    expect(response.type).toBe("application/json");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("OK");
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data).toHaveProperty("createdAt");
    expect(response.body.data).toHaveProperty("updatedAt");
    expect(response.body.data).toHaveProperty("content");
    expect(response.body.data).toHaveProperty("name");
    expect(response.body.data).toHaveProperty("image");
    expect(response.body.data.content).toBe(updateRecord.content);
    expect(response.body.data.name).toBe(updateRecord.name);
    expect(response.body.data.image).toBe(updateRecord.image);
  });
  /*
  # Testing UPDATE activity with id incorrect
  */
  it("It shouldn't update an activity because the id is incorrect", async () => {
    const response = await request(app)
      .put(`/activities/${idFalse}`)
      .set("Authorization", token)
      .send(updateRecord)
      .then((response) => {
        expect(response.type).toBe("application/json");
        expect(response.statusCode).toEqual(400);
        expect(response.body).toHaveProperty("OK");
        expect(response.body).toHaveProperty("error");
      });
  });
  afterAll(async (done) => {
    db.sequelize.close();
    done();
  });
});
