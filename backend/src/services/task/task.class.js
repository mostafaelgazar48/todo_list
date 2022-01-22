const { Service } = require('feathers-mongodb');

exports.Task = class Task extends Service {
  constructor(options, app) {
    super(options);
    this.tasks=[];
    app.get('mongoClient').then(db => {
      this.Model = db.collection('task');
    });


  }


  async create(data, params) {
    const task = {
      name: data.name,
      user_id: params.user._id
    };
    this.tasks.push(task);

    return super.create(task);
  }

  async find(params){
    console.log(params.user._id);
    return super.find({query:{
      user_id:params.user._id
    }});
  }




};
