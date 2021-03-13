import Tools from '../app/Models/Tools';
import User from '../app/Models/User';

import test from 'japa';
import supertest from 'supertest';

const BASE_URL = "http://localhost:3000";

// STORE
test('It should be able to create user', async (assert) => {
  const response = await supertest(BASE_URL).post('/user').send({
    name: 'daniel',
    email: 'daniel@gmail.com',
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
// test('It should not be able to update profile without password', async ({ client }) => {
//   const response = await client.put('/user').send({
//     name: 'name',
//     email: 'email@gmail.com'
//   }).loginVia(user, 'jwt').end()

//   assert.equal(response, response)
// })

// test('It should not be able to update profile with wrong password', async ({ client }) => {
//   const response = await client.put('/user').send({
//     name: 'name',
//     password: 'wrong-password'
//   }).loginVia(user, 'jwt').end()

//   response.assertStatus(400)
// })

// test('It should be able to update user name and password', async ({ client }) => {
//   const response1 = await client.put('/user').send({
//     name: 'new-name',
//     password: 'password'
//   }).loginVia(user, 'jwt').end()

//   const response2 = await client.put('/user').send({
//     password: 'password',
//     newPassword: 'new-password'
//   }).loginVia(user, 'jwt').end()

//   response1.assertStatus(200)
//   response1.assertJSONSubset({
//     id: user.id,
//     name: 'new-name',
//     email: 'email@gmail.com'
//   })
//   response2.assertStatus(200)
//   response2.assertJSONSubset({
//     id: user.id,
//     name: 'new-name',
//     email: 'email@gmail.com'
//   })
// })

// // DELETE
// test('It should not be able to delete user without password on request body', async (assert) => {
//   const response = await supertest(BASE_URL).delete('/user').loginVia(user, 'jwt').expect(400)

//   assert.equal(response, response)
// })

// test('It should not be able to delete user with wrong password', async (assert) => {
//   const response = await supertest(BASE_URL).delete('/user').send({ password: 'wrong-password' }).loginVia(user, 'jwt').expect(400)

//   assert.equal(response, response)
// })

// test('It should be able to delete logged user', async (assert) => {
//   const response = await supertest(BASE_URL).delete('/user').send({ password: 'new-password' }).loginVia(user, 'jwt').expect(400)

//   assert.equal(response, response)
// })