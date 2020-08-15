const express = require('express');
const Joi = require('@hapi/joi');
const objectid = require('mongodb').ObjectId
const Pet = require('../models/pets');
const { validateBody } = require('../middlewares/route');
const { request } = require('express');
const { object } = require('@hapi/joi');

const router = express.Router();

router.post(
  '/post',
  validateBody(Joi.object().keys({
    name: Joi.string().required().description('Pet name'),
    age: Joi.number().integer().required().description('Pet age'),
    color: Joi.string().required().description('Pet color'),
  }),
  {
    stripUnknown: true,
  }),
  async (req, res, next) => {
    try {
      const pet = new Pet(req.body);
      await pet.save();
      res.status(201).json(pet);
    } catch (e) {next(e);}
  }
);

router.get("/",(req,res,next)=>{
    Pet.find()
        .exec()
        .then(getter=>{
          if(getter.length>0){
            res.status(201).json(getter)
          }
          else{
            res.status(404).json({message: "No data in pets collection"});
          }
        })
        .catch(err=>{next(err);})
}
);

router.get("/:id",async (req,res,next)=>{
  var id = new objectid(req.params.id)
  Pet.findOne({_id:id})
      .exec((err,pet)=>{
        if(err || !pet){
          next(err);
        }
        else{
          res.status(201).json(pet);
        }
        }
      )
});
router.delete("/deletepet", async(req,res,next)=>{
  Pet.deleteMany()
   .then(()=>{res.status(201).json({message:"Deleted All the pets"})})
    .catch(err=>{next(err);})
})
router.delete("/deletepet/:id",async (req, res, next) => {
  var id = new objectid(req.params.id)
  Pet.findOne({_id:id})
    .exec((err,pet)=>{
      if(err || !pet){
        next(err);
      }
      else{
        pet.remove()
        .then(()=>{ res.status(201).json({message:"successfully deleted"});})
         .catch(err=>{next(err);})
      }
    })
}
)

module.exports = router;