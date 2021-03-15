"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const japa_1 = __importDefault(require("japa"));
const supertest_1 = __importDefault(require("supertest"));
const BASE_URL = "http://localhost:3000";
japa_1.default('It should return JWT token', async (assert) => {
    const user = await supertest_1.default(BASE_URL).post('/user').send({
        name: 'testejwt',
        email: 'testejwt@gmail.com',
        password: '123123'
    }).expect(201);
    const response = await supertest_1.default(BASE_URL).post('/session').send({
        email: 'testejwt@gmail.com',
        password: '123123'
    }).expect(200);
    assert.equal(user, user);
    assert.equal(response, response);
});
japa_1.default('It should not return JWT token if the password is wrong', async (assert) => {
    const response = await supertest_1.default(BASE_URL).post('/session').send({
        email: 'testejwt@gmail.com',
        password: 'wrong-password'
    }).expect(400);
    assert.equal(response, response);
});
japa_1.default('It should not return JWT token if the user does not exist', async (assert) => {
    const response = await supertest_1.default(BASE_URL).post('/session').send({
        email: 'non-existing-user@gmail.com',
        password: '1231233'
    }).expect(400);
    assert.equal(response, response);
});
//# sourceMappingURL=session.spec.js.map