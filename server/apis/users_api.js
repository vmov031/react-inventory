var User       = require('../models/User');
var authCheck  = require('../config/middleware/authCheck');
const passport = require("passport");



// login user
exports.loginUser = function(req, res) {
  console.log("user_controller*********");
  router.post('/login',
  passport.authenticate("local"),
  res.redirect("/home/dashboard"));
};

// logout user
exports.logOutUser = function(req,res) {
  req.logout();
  res.redirect("/");
};

exports.create = function(req, res) {
    // route must change to render new user page
    // res.redirect below is temporary
    res.redirect('/login');
};

// register a user
exports.signUp = function(req,res) {
  console.log(req.body.user_name)
  db.User.findAll({
    where: {username: req.body.user_name}
  }).then(function(users) {
    console.log("then")
    if (users.length > 0) {
      res.json({
        duplicateUser: true
      });
    //At some point, make sure that only one user can be associated with an username.
    } else {
      db.User.create({
        user_name: req.body.user_name,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mob_no: req.body.mob_no,
        position: req.body.position

      }).then(function() {
        res.send({redirect: '/home/dashboard'});
      }).catch(function(err) {
        console.log(err)

        res.json(err);
      });
    }
  })
};