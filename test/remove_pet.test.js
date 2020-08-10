const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const Pet =require('../models/pets')
const expect = chai.expect;

chai.use(chaiAsPromised);



describe('functional - remove pet',()=>{
    let pet;
    beforeEach((done)=>{
     pet = new Pet({
       name:'Alwin',
       age:15,
       color:'black'
     })
     pet.save()
        .then(()=>{
          done();
        })
    })
   it('should delete pet by name', async () => {
     const res = await request(app).delete('/pets/deletepet/Alwin');
     expect(res.status).to.equal(201);
     expect(res.body.message).to.equal('successfully deleted')
   })
   it('should delete all the pet', async () => {
    const res = await request(app).delete('/pets/deletepet');
    expect(res.status).to.equal(201);
    expect(res.body.message).to.equal('Deleted All the pets');
  })
 })
 