

var restify = require('restify');
var server = restify.createServer();
var setupController = require('./controllers/setupController.js');
var userController = require('./controllers/userControllers.js');
var restifyValidator = require('restify-validator');
var config = require('./config/databaseConnection.js');
var mongoose = require('mongoose');

//mongoose.connect(config.getMongoConnectionString);
mongoose.connect('mongodb://localhost:27017/mydb');
setupController(server, restify, restifyValidator);
userController(server);

server.listen(8081, function() {
    console.log('%s listening at %s', server.name, server.url);
});