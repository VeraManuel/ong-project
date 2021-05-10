const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const{createToken} = require('../services/jwtService')

const adminUser ={
    id:1,
    email:"testAdminUser@test.com",
    password:"Testing12345",
    isAdmin: true,
    firstName: "TestUser",
    lastName: "TestUser",
    image: null,
    roleId: 1,
    deletedAt: null,
    createdAt: "2021-04-20T21:06:26.000Z",
    updatedAt: "2021-04-20T21:06:26.000Z"
}

const standardUser = {
    id:1,
    email:"testStandardUser@test.com",
    password:"Testing12345",
    isAdmin: false,
    firstName: "TestUser",
    lastName: "TestUser",
    image: null,
    roleId: 2,
    deletedAt: null,
    createdAt: "2021-04-20T21:06:26.000Z",
    updatedAt: "2021-04-20T21:06:26.000Z"
}

const memberData =[{
    name:"testMember",
    image: "https://testMember.photolog.com/testMember.jpg"
},{
    name:"testMember",
    image: "https://testMember.photolog.com/updatedtestMember.jpg"
},{
    name:"",
    image: "https://testMember.photolog.com/updatedtestMember.jpg"
},{
    name:"testMember",
    image: ""
}
]

var id=0

  const adminToken=  createToken(adminUser)
  const standardToken=  createToken(standardUser)


test('Admin User Creates new member record and returns new object as JSON',async()=>{
    const request = await api
    .post('/members')
    .send(memberData[0])
    .set('Authorization','Bearer '+ adminToken)
    .expect(200)
    .expect('Content-Type',/application\/json/);
    expect(request.body.name).toBe(memberData[0].name);
    expect(request.body.image).toBe(memberData[0].image);
    id=request.body.id;
});

test('Standard users not allowed to create new member',async()=>{
    const request = await api
    .post('/members')
    .send(memberData[1])
    .set('Authorization', standardToken)
    .expect(403)
    .expect('Content-Type',/application\/json/);
    expect(JSON.stringify(request.body)).toBe(JSON.stringify({"message": "Not have permission of admin"}));
});

test('Cannot create member with empty name value',async()=>{
    const request = await api
    .post('/members')
    .send(memberData[2])
    .set('Authorization', adminToken)
    .expect(400)
    .expect('Content-Type',/application\/json/);
    expect(JSON.stringify(request.body)).toBe(JSON.stringify({
        "OK": false,
        "error": {
            "msg": "Validation Errors",
            "status": 400,
            "data": {
                "name": {
                    "value": "",
                    "msg": "Name is required!",
                    "param": "name",
                    "location": "body"
                }
            }
        }
    }));
});

test('Cannot create member with invalid or empty image url',async()=>{
    const request = await api
    .post('/members')
    .send(memberData[3])
    .set('Authorization', adminToken)
    .expect(400)
    .expect('Content-Type',/application\/json/);
    expect(JSON.stringify(request.body)).toBe(JSON.stringify({
        "OK": false,
        "error": {
            "msg": "Validation Errors",
            "status": 400,
            "data": {
                "image": {
                    "value": "",
                    "msg": "Image must be valid!",
                    "param": "image",
                    "location": "body"
                }
            }
        }
    }));
});

test('Returns members list as JSON',async()=>{
    const request = await api
    .get('/members')
    .expect(200)
    .expect('Content-Type',/application\/json/);
    expect(request.body[0]).toHaveProperty('id');
    expect(request.body[0]).toHaveProperty('name');
    expect(request.body[0]).toHaveProperty('image');
});

test ('Admin Updates member information by ID',async()=>{
    const request = await api
    .put('/members/'+id)
    .send(memberData[1])
    .set('Authorization', adminToken)
    .expect(200)
    .expect('Content-Type',/application\/json/)
    expect(request.body).toHaveProperty('id');
    expect(request.body).toHaveProperty('name');
    expect(request.body).toHaveProperty('image');
});

test ('Admin cannot update member information by unexisting ID',async()=>{
    const wrongId = 9999
    const request = await api
    .put('/members/'+wrongId)
    .send(memberData[1])
    .set('Authorization', adminToken)
    .expect(200)
    expect(request.body).toBe(null);
});

test ('Standard user cannot update member information by ID',async()=>{
    const request = await api
    .put('/members/'+id)
    .send(memberData[1])
    .set('Authorization','Bearer '+ standardToken)
    .expect(403)
    .expect('Content-Type',/application\/json/)
    expect(JSON.stringify(request.body)).toBe(JSON.stringify({"message": "Not have permission of admin"}));
});

test ('Standard user cannot update member information by ID',async()=>{
    const request = await api
    .put('/members/'+id)
    .send(memberData[1])
    .set('Authorization','Bearer '+ standardToken)
    .expect(403)
    .expect('Content-Type',/application\/json/)
    expect(JSON.stringify(request.body)).toBe(JSON.stringify({"message": "Not have permission of admin"}));
});

test ('Cannot update member information by ID with empty name value',async()=>{
    const request = await api
    .put('/members/'+id)
    .send(memberData[2])
    .set('Authorization','Bearer '+ adminToken)
    .expect(400)
    .expect('Content-Type',/application\/json/)
    expect(JSON.stringify(request.body)).toBe(JSON.stringify({
        "OK": false,
        "error": {
            "msg": "Validation Errors",
            "status": 400,
            "data": {
                "name": {
                    "value": "",
                    "msg": "Name is required!",
                    "param": "name",
                    "location": "body"
                }
            }
        }
    }))
});

test ('Cannot update member information by ID with invalid or empty image url',async()=>{
    const request = await api
    .put('/members/'+id)
    .send(memberData[3])
    .set('Authorization','Bearer '+ adminToken)
    .expect(400)
    .expect('Content-Type',/application\/json/)
    expect(JSON.stringify(request.body)).toBe(JSON.stringify({
        "OK": false,
        "error": {
            "msg": "Validation Errors",
            "status": 400,
            "data": {
                "image": {
                    "value": "",
                    "msg": "Image must be valid!",
                    "param": "image",
                    "location": "body"
                }
            }
        }
    }))
});

test ("Admin deletes member information by ID", async()=>{
    const request = await api
    .delete('/members/'+id)
    .set('Authorization', adminToken)
    .expect(200)
    expect(JSON.stringify(request.body)).toBe(JSON.stringify({"OK": true, "msg": "Deleted"}));

});

test ("Admin cannot delete member information with unexisting ID", async()=>{
    const wrongId = 9999
    const request = await api
    .delete('/members/'+wrongId)
    .set('Authorization', adminToken)
    .expect(200)
    expect(JSON.stringify(request.body)).toBe(JSON.stringify({
        "OK": false,
        "error": {}
    }));

});

test ("Standard user cannot delete member information by ID", async()=>{
    const request = await api
    .delete('/members/'+id)
    .set('Authorization', standardToken)
    .expect(403)
    expect(JSON.stringify(request.body)).toBe(JSON.stringify({"message": "Not have permission of admin"}));
    
});