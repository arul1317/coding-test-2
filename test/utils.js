const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const { deleteOne } = require('../models/users');

const port = 27017;
const mongod = new MongoMemoryServer({
  instance: {
    port,
  },
  autoStart: false,
});

const setup = async () => {
  await mongod.start();
  if (mongod.instanceInfoSync.port !== port) {
    throw new Error(`Failed to startup, :${port} already in use`);
  }
  await mongoose.connect(`mongodb://localhost/test`,{useNewUrlParser: true,useUnifiedTopology: true});
  mongoose.connection.on("connected",()=>{
    console.log("connected to the Mongodb database");
});
};

before(async () => {
  await setup();
});
