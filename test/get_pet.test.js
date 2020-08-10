const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const Pet =require('../models/pets')
const expect = chai.expect;

chai.use(chaiAsPromised);

describe('functional -get pet', () => {
  it('should not get any pets', async () => {
    const res = await request(app).get('/pets');
    expect(res.status).to.equal(404);
    expect(res.body.message).to.equal("No data in pets collection")
  })
  describe('Get pets',()=>{
    let pet;
    beforeEach((done)=>{
     pet = new Pet({
       name:'pihu',
       age:15,
       color:'black'
     })
     pet.save()
        .then(()=>{done();})
    })

    it('should get all pets in correct formats', async () => {
        const res = await request(app).get('/pets');
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('array');
      })

      it('should get element by name', async ()=>{
        const res = await request(app).get('/pets/pihu');
        expect(res.status).to.equal(201);
        expect(res.body.name).to.equal(pet.name);
        expect(res.body.age).to.equal(pet.age);
        expect(res.body.color).to.equal(pet.color);
      })
  })
    
});