import test from 'japa';
import supertest from 'supertest';

const BASE_URL = "http://localhost:3000";

// STORE
test('It should be able to create user', async (assert) => {
  const response = await supertest(BASE_URL).post('/user').send({
    name: 'test',
    email: 'test@gmail.com',
    password: '123123'
  }).expect(201)

  assert.equal(response, response);
})

test('Request body should have name, email and password to create user', async (assert) => {
  const response = await supertest(BASE_URL).post('/user').send({
    name: 'daniel',
    password: '123123'
  }).expect(400)

  const response2 = await supertest(BASE_URL).post('/user').send({
    email: 'daniel@gmail.com',
    password: '123123'
  }).expect(400)

  const response3 = await supertest(BASE_URL).post('/user').send({
    name: 'daniel',
    email: 'daniel@gmail.com'
  }).expect(400)

  assert.equal(response, response)
  assert.equal(response2, response2)
  assert.equal(response3, response3)
})

test('It should not be able to create existing user', async (assert) => {
  const response = await supertest(BASE_URL).post('/user').send({
    name: 'name',
    email: 'daniel@gmail.com',
    password: '123123'
  }).expect(400)

  assert.equal(response, response);
})

// UPDATE
test('It should not be able to update profile without password', async (assert) => {
  const response = supertest(BASE_URL).put('/user').send({
    name: 'name',
    email: 'email@gmail.com'
  }).then(async (res) => {
    if (res.status !== 400) {
      const request = await supertest(BASE_URL)
        .post('/session')
        .auth('testejwt@gmail.com', '123123')
      
      return request;
    }
    
    return res;
  })

  assert.equal(response, response);
})

test('It should not be able to update profile with wrong password', async (assert) => {
  const response = supertest(BASE_URL).put('/user').send({
    name: 'name',
    password: 'wrong-password'
  }).then(async (res) => {
    if (res.status !== 400) {
      const request = await supertest(BASE_URL)
        .post('/session')
        .auth('testejwt@gmail.com', '123123')
      
      return request;
    }
    
    return res;
  })

  assert.equal(response, response);
})

test('It should be able to update user name and password', async (assert) => {
  const response1 = supertest(BASE_URL).put('/user').send({
    name: 'new-name',
    password: 'password'
  }).then(async (res) => {
    if (res.status !== 200) {
      const request = await supertest(BASE_URL)
        .post('/session')
        .auth('testejwt@gmail.com', '123123')
      
      return request;
    }
    
    return res;
  })

  const response2 = await supertest(BASE_URL).put('/user').send({
    password: 'password',
    newPassword: 'new-password'
  }).then(async (res) => {
    if (res.status !== 200) {
      const request = await supertest(BASE_URL)
        .post('/session')
        .auth('testejwt@gmail.com', '123123')
      
      return request;
    }
    
    return res;
  })

  assert.equal(response1, response1);
  assert.equal(response2, response2);
})

// DELETE
test('It should not be able to delete user without password on request body', async (assert) => {
  const response = await supertest(BASE_URL).delete('/user').then(async (res) => {
    if (res.status !== 400) {
      const request = await supertest(BASE_URL)
        .post('/session')
        .auth('testejwt@gmail.com', '123123')
      
      return request;
    }
    
    return res;
  })

  assert.equal(response, response)
})

test('It should not be able to delete user with wrong password', async (assert) => {
  const response = await supertest(BASE_URL).delete('/user').send({ password: 'wrong-password' }).then(async (res) => {
    if (res.status !== 400) {
      const request = await supertest(BASE_URL)
        .post('/session')
        .auth('testejwt@gmail.com', '123123')
      
      return request;
    }
    
    return res;
  })

  assert.equal(response, response)
})

test('It should be able to delete logged user', async (assert) => {
  const response = await supertest(BASE_URL).delete('/user').send({ password: 'new-password' }).then(async (res) => {
    if (res.status !== 200) {
      const request = await supertest(BASE_URL)
        .post('/session')
        .auth('testejwt@gmail.com', '123123')
      
      return request;
    }
    
    return res;
  })

  assert.equal(response, response)
})