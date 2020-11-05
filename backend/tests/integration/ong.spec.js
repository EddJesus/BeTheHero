const app = require('../../src/app');
const connection = require('../../src/database/connection');
const request = require('supertest');

describe('ONG', () => {
    beforeEach( async () =>{
        await connection.migrate.rollback();
        await connection.migrate.latest();
    })

    afterAll( async () => {
        await connection.destroy();
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name : "TESTANDOTESTE",
            email : "jest@jest.com",
             city: "São Paulo",
            whatsapp: "11944547545",
            uf : "SP"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});