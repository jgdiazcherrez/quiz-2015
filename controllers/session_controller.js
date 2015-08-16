/**
 * Created by jonathan on 16/08/15.
 */

//login

exports.new = function(req, res){
  var errors = req.session.errors || {};
    req.session.errors = {};
    res.render('sessions/new', {errors:errors});
};


//post login - crea la sesion
exports.create = function(req, res){
  var login = req.body.login,
      password = req.body.password;

    var userController = require('./user_controller');
    userController.autentificar(login, password, function(error, user){
       if(error){
           req.session.errors = [{message: "Se ha producido un error" + error}];
           res.redirect("/login");
           return;
       }
       req.session.user = {id:user.id, username:user.username};
        res.redirect(req.session.redir.toString());
    });

};


//delete cierre de sesion

exports.destroy = function(req, res){
  delete req.session.user;
    res.redirect(req.session.redir.toString());
};