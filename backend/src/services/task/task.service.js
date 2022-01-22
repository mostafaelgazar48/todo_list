// Initializes the `task` service on path `/task`
const tasksModel = require('../../models/tasks.model');
const { Task } = require('./task.class');
const hooks = require('./task.hooks');

module.exports = function (app) {
  const options = {
    tasks:[],
    Model: tasksModel(app),
    paginate: app.get('paginate')
  };


  // Initialize our service with any options it requires
  app.use('/task', new Task(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('task');



  service.hooks(hooks);
};
