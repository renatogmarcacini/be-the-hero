const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async ()=>{
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async ()=>{
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app).post('/ongs').send({
            name: "ONG-TESTE",
            email: "contatr@teste.com",
            whatsapp: "17997294779",
            city: "São Paulo",
            uf: "SP"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });

    it('should be authenticate an ONG', async () => {
        const response = await request(app).post('/sessions').set('Authorization','b3d95ba5').send({
            id: 'b3d95ba5'
        });
        console.log(response.body);
    });
})