// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html

const { ObjectId } = require('mongodb');

// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'tasks';
  const mongooseClient = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({

    name: { type: String,lowercase: true ,required:true},
    user_id: { type:ObjectId,refs:'users' ,required:true},

  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
