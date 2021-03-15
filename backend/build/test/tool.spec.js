"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tools_1 = __importDefault(require("../app/Models/Tools"));
const japa_1 = __importDefault(require("japa"));
const supertest_1 = __importDefault(require("supertest"));
const BASE_URL = "http://localhost:3000";
japa_1.default('It should be able to create tool', async (assert) => {
    const response = await supertest_1.default(BASE_URL).post('/tools').send({
        title: 'title',
        link: 'https://link.com/',
        description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
        tags: ['node', 'organizing', 'webapps', 'domain', 'developer', 'https', 'proxy'],
    }).then(async (res) => {
        if (res.status !== 201) {
            const request = await supertest_1.default(BASE_URL)
                .post('/session')
                .auth('testejwt@gmail.com', '123123');
            return request;
        }
        return res;
    });
    assert.equal(response, response);
});
japa_1.default('It should not be able to create tool without title, link or tags on request body', async (assert) => {
    const response1 = await supertest_1.default(BASE_URL).post('/tools').send({
        link: 'https://github.com/typicode/hotel',
        description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
        tags: ['node', 'organizing', 'webapps', 'domain', 'developer', 'https', 'proxy'],
    }).then(async (res) => {
        if (res.status !== 400) {
            const request = await supertest_1.default(BASE_URL)
                .post('/session')
                .auth('testejwt@gmail.com', '123123');
            return request;
        }
        return res;
    });
    const response2 = await supertest_1.default(BASE_URL).post('/tools').send({
        title: 'hotel',
        description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
        tags: ['node', 'organizing', 'webapps', 'domain', 'developer', 'https', 'proxy'],
    }).then(async (res) => {
        if (res.status !== 400) {
            const request = await supertest_1.default(BASE_URL)
                .post('/session')
                .auth('testejwt@gmail.com', '123123');
            return request;
        }
        return res;
    });
    const response3 = await supertest_1.default(BASE_URL).post('/tools').send({
        title: 'hotel',
        link: 'https://github.com/typicode/hotel',
        description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
    }).then(async (res) => {
        if (res.status !== 400) {
            const request = await supertest_1.default(BASE_URL)
                .post('/session')
                .auth('testejwt@gmail.com', '123123');
            return request;
        }
        return res;
    });
    assert.equal(response1, response1);
    assert.equal(response2, response2);
    assert.equal(response3, response3);
});
japa_1.default('It should not be able to create tool with same title', async (assert) => {
    const response = await supertest_1.default(BASE_URL).post('/tools').send({
        title: 'title',
        link: 'https://link.com/',
        description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
        tags: ['node', 'organizing', 'webapps', 'domain', 'developer', 'https', 'proxy'],
    }).then(async (res) => {
        if (res.status !== 400) {
            const request = await supertest_1.default(BASE_URL)
                .post('/session')
                .auth('testejwt@gmail.com', '123123');
            return request;
        }
        return res;
    });
    assert.equal(response, response);
});
japa_1.default('It should not be able to update tool without tool id or title on request body', async (assert) => {
    const tools = await Tools_1.default.find(1);
    const response1 = await supertest_1.default(BASE_URL).put('/tools').send({
        title: 'new-title',
        link: 'https://link.com',
        description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
        tags: ['node', 'organizing', 'new tag 1', 'new tag 2']
    }).then(async (res) => {
        if (res.status !== 400) {
            const request = await supertest_1.default(BASE_URL)
                .post('/session')
                .auth('testejwt@gmail.com', '123123');
            return request;
        }
        return res;
    });
    if (tools !== null) {
        const response2 = await supertest_1.default(BASE_URL).put('/tools').send({
            id: tools.id,
            link: 'https://link.com',
            description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
            tags: ['node', 'organizing', 'new tag 1', 'new tag 2']
        }).then(async (res) => {
            if (res.status !== 400) {
                const request = await supertest_1.default(BASE_URL)
                    .post('/session')
                    .auth('testejwt@gmail.com', '123123');
                return request;
            }
            return res;
        });
        assert.equal(response2, response2);
    }
    assert.equal(response1, response1);
});
japa_1.default('It should not be able to update tool title with existing one', async (assert) => {
    const tools = await Tools_1.default.findBy('title', 'title');
    if (tools !== null) {
        const response = await supertest_1.default(BASE_URL).put('/tools').send({
            id: tools.id,
            title: 'other-title',
            link: 'https://link.com',
            description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
            tags: ['node', 'organizing', 'new tag 1', 'new tag 2']
        }).then(async (res) => {
            if (res.status !== 400) {
                const request = await supertest_1.default(BASE_URL)
                    .post('/session')
                    .auth('testejwt@gmail.com', '123123');
                return request;
            }
            return res;
        });
        assert.equal(response, response);
    }
});
japa_1.default('It should be able to update tool', async (assert) => {
    const tools = await Tools_1.default.find(1);
    if (tools !== null) {
        const response = await supertest_1.default(BASE_URL).put('/tools').send({
            id: tools.id,
            title: 'new-title',
            link: 'https://newlink.com',
            description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
            tags: ['node', 'organizing', 'new tag 1', 'new tag 2']
        }).then(async (res) => {
            if (res.status !== 200) {
                const request = await supertest_1.default(BASE_URL)
                    .post('/session')
                    .auth('testejwt@gmail.com', '123123');
                return request;
            }
            return res;
        });
        assert.equal(response, response);
    }
});
japa_1.default('It should not be able to delete tool with wrong id', async (assert) => {
    const response = await supertest_1.default(BASE_URL).delete('/tools/wrong-id').then(async (res) => {
        if (res.status !== 400) {
            const request = await supertest_1.default(BASE_URL)
                .post('/session')
                .auth('testejwt@gmail.com', '123123');
            return request;
        }
        return res;
    });
    assert.equal(response, response);
});
japa_1.default('It should be able to delete tool', async (assert) => {
    const tools = await Tools_1.default.find(1);
    if (tools !== null) {
        const response = await supertest_1.default(BASE_URL).delete(`/tools/${tools.id}`).then(async (res) => {
            if (res.status !== 200) {
                const request = await supertest_1.default(BASE_URL)
                    .post('/session')
                    .auth('testejwt@gmail.com', '123123');
                return request;
            }
            return res;
        });
        assert.equal(response, response);
    }
});
//# sourceMappingURL=tool.spec.js.map