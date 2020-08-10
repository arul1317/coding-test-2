const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Pet =require('../models/pets')
const expect = chai.expect;
const app = require('../app');

chai.use(chaiAsPromised);

describe('functional - post pet', () => {
    it('should fail to create a pet without a Name', async () => {
      const res = await request(app).post('/pets/post').send({
        age: '16',
        color: 'red',
      });
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('"name" is required');
    })
    it('should create a pet', async () => {
      const user = {
        name: 'Alwin',
        age: 16,
        color: 'white',
      };
      const res = await request(app).post('/pets/post').send(user);
      expect(res.status).to.equal(201);
      expect(res.body.name).to.equal(user.name);
      expect(res.body.age).to.equal(user.age);
      expect(res.body.color).to.equal(user.color);
      })    
});