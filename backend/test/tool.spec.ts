import Tools from '../app/Models/Tools';
import User from '../app/Models/User';
import request from 'superagent';

import test from 'japa';
import supertest from 'supertest';

const BASE_URL = "http://localhost:3000";

let user;

const name = "testejwt@gmail.com";
const password = "123123";

// async function data() {
//   user = await User.create({
//     name: 'user',
//     email: 'user@gmail.com',
//     password: 'password'
//   })

//   user = request.agent();
//   user
//     .post('http://localhost:3000/session')
//     .send({
//       email: 'user@gmail.com',
//       password: 'password',
//     })
//     .end()
  
//   return { user };
// }

// STORE
test('It should be able to create tool', async (assert) => {
  // data();

  const response = await supertest(BASE_URL).post('/tools').send({
    title: 'title',
    link: 'https://link.com/',
    description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
    tags: ['node', 'organizing', 'webapps', 'domain', 'developer', 'https', 'proxy'],
  }).auth(name, password).expect(201)

  assert.equal(response, response);
})

// test('It should not be able to create tool without title, link or tags on request body', async (assert) => {
//   data();
//   const logged = await supertest(BASE_URL).post('/session').send(user).expect(200);

//   const response1 = await supertest(BASE_URL).post('/tools').send({
//     link: 'https://github.com/typicode/hotel',
//     description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
//     tags: ['node', 'organizing', 'webapps', 'domain', 'developer', 'https', 'proxy'],
//     user_id: user.id,
//   }).expect(400)

//   const response2 = await supertest(BASE_URL).post('/tools').send({
//     title: 'hotel',
//     description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
//     tags: ['node', 'organizing', 'webapps', 'domain', 'developer', 'https', 'proxy'],
//     user_id: user.id,
//   }).expect(400)

//   const response3 = await supertest(BASE_URL).post('/tools').send({
//     title: 'hotel',
//     link: 'https://github.com/typicode/hotel',
//     description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
//     user_id: user.id,
//   }).expect(400)

//   assert.equal(logged, logged);
//   assert.equal(response1, response1);
//   assert.equal(response2, response2);
//   assert.equal(response3, response3);
// })

// test('It should not be able to create tool with same title', async (assert) => {
//   data();
//   const logged = await supertest(BASE_URL).post('/session').send(user).expect(200);

//   const response = await supertest(BASE_URL).post('/tools').send({
//     title: 'title',
//     link: 'https://link.com/',
//     description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
//     tags: ['node', 'organizing', 'webapps', 'domain', 'developer', 'https', 'proxy'],
//     user_id: user.id,
//   }).expect(400)

//   assert.equal(logged, logged);
//   assert.equal(response, response);
// })

// UPDATE
// test('It should not be able to update tool without tool id or title on request body', async ({ client }) => {
//   const tools = await Tool.find(1)

//   const response1 = await client.put('/tools').send({
//     title: 'new-title',
//     link: 'https://link.com',
//     description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
//     tags: ['node', 'organizing', 'new tag 1', 'new tag 2']
//   }).loginVia(user, 'jwt').end()

//   const response2 = await client.put('/tools').send({
//     id: tools.id,
//     link: 'https://link.com',
//     description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
//     tags: ['node', 'organizing', 'new tag 1', 'new tag 2']
//   }).loginVia(user, 'jwt').end()

//   response1.assertStatus(400)
//   response2.assertStatus(400)
// })

// test('It should not be able to update tool title with existing one', async ({ client }) => {
//   const tools = await Tool.findBy('title', 'title')

//   const response = await client.put('/tools').send({
//     id: tools.id,
//     title: 'other-title',
//     link: 'https://link.com',
//     description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
//     tags: ['node', 'organizing', 'new tag 1', 'new tag 2']
//   }).loginVia(user, 'jwt').end()

//   response.assertStatus(400)
// })

// test('It should be able to update tool', async ({ client }) => {
//   const tools = await Tool.find(1)

//   const response = await client.put('/tools').send({
//     id: tools.id,
//     title: 'new-title',
//     link: 'https://newlink.com',
//     description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
//     tags: ['node', 'organizing', 'new tag 1', 'new tag 2']
//   }).loginVia(user, 'jwt').end()

//   response.assertStatus(200)
//   response.assertJSONSubset({
//     id: tools.id,
//     title: 'new-title',
//     link: 'https://newlink.com',
//     description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
//     tags: ['node', 'organizing', 'new tag 1', 'new tag 2']
//   })
// })

// // LIST
// test('It should be able to list all tools from an user', async ({ client }) => {
//   const response = await client.get('/tools').loginVia(user, 'jwt').end()

//   response.assertStatus(200)
//   response.assertJSONSubset(
//     { data: [{ id: user.id }] }
//   )
// })

// // DELETE
// test('It should not be able to delete tool with wrong id', async ({ client }) => {
//   const response = await client.delete('/tools/wrong-id').loginVia(user, 'jwt').end()

//   response.assertStatus(400)
// })

// test('It should be able to delete tool', async ({ client }) => {
//   const tools = await Tools.find(1)

//   const response = await client.delete(`/tools/${tools.id}`).loginVia(user, 'jwt').end()

//   response.assertStatus(204)
// })