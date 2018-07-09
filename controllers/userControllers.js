var helper = require('../config/helper.js');
var UserModel = require('../model/UserModel.js');

module.exports = function (server) {

    server.get("/", function(req, res, next) {
        UserModel.find({}, function (err, users){
            helper.success(res, next, users);
        });
    });

    // get user, example http://localhost:8081/user/3
    server.get("/user/:id", function(req, res, next) {
        req.assert('id', 'Id is required').notEmpty();
        var errors = req.validationErrors();
        if (errors){
            helper.failure(res, next, errors[0], 400);
        }else {
            UserModel.findOne({_id: req.params.id}, function (err, user){
                if (user === null) {
                    helper.failure(res, next, 'user with id ' + req.params.id + ' does not exists', 404 );
                } else {
                    helper.success(res, next, user);
                }
            });
        }
    });

    server.post("/user", function(req, res, next) {
        req.assert('first_name', 'First name is required').notEmpty();
        req.assert('last_name', 'Last name is required').notEmpty();
        req.assert('email_address', 'Email address is required and must be valid').notEmpty().isEmail();
        req.assert('career', 'Career is required and must be student, teacher, or professor').isIn(['student', 'teacher', 'professor']);
        var errors = req.validationErrors();
        if (errors){
            helper.failure(res, next, errors, 400);
        } else {
            var user = new UserModel();
            user.first_name = req.params.first_name;
            user.last_name = req.params.last_name;
            user.email_address = req.params.email_address;
            user.career = req.params.career;
            user.save(function (err) {
                if (err) {
                    helper.failure(res, next, err, 500);
                } else {
                    helper.success(res, next, user);
                }
            });
        }

    });

//update
    server.put("/user/:id", function(req, res, next) {
        if (typeof (users[(req.params.id)]) === "undefined"){
            helper.failure(res, next, 'user with id ' + req.params.id + ' does not exists', 404 );
        } else {
            var user = users[parseInt(req.params.id)];
            var updates = req.params;
            for (var int in updates) {
                user[int] = updates[int];
            }
            helper.success(res, next, user);
        }

    });

//delete
    server.del("/user/:id", function(req, res, next) {
        if (typeof (users[(req.params.id)]) === "undefined"){
            helper.failure(res, next, 'user with id ' + req.params.id + ' does not exists', 404 );
        } else {
            res.setHeader('content-type', 'application/json');
            delete users[parseInt(req.params.id)];
            helper.success(res, next, []);
        }

    });
};