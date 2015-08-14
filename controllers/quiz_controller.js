/**
 * Created by jonathan on 19/07/15.
 */

var models = require('../models/models.js');


exports.load = function(req, res, next, quizId){
    models.Quiz.find(quizId).then(
        function(quiz){
            if(quiz){
                req.quiz = quiz;
                next();
            }else
                next(new Error('No existe quizId=' + quizId));
        }
    ).catch(function(error){next(error)});
};

exports.index = function(req, res){
    var text = req.query.search;

    if(!text){
        models.Quiz.findAll().then(
            function(quizes){
                res.render('quizes/index.ejs', {quizes: quizes});
            }
        ).catch(function(error){ next(error); });
    }
    else{
        text =  "%" + text + "%";
        models.Quiz.findAll({where: ["pregunta like ?", text.replace(/\s+/g, "%")]}).then(
            function(quizes){
                res.render('quizes/index.ejs', {quizes:quizes});
            }
        )
    }
};

exports.answer = function(req, res){
    models.Quiz.find(req.params.quizId).then(function(quiz){
        var resultado = "Incorrecto";
        //agregamos mejora de respuesta para evitar que el usuario tenga que poner la palabra exacta ... 
        if((req.query.respuesta).toLocaleLowerCase() === (quiz.respuesta).toLowerCase())
            resultado = "Correcto";
        res.render('quizes/answer', {quiz:quiz, respuesta: resultado});
    });
};

exports.show = function(req, res){
  res.render("quizes/show", {quiz: req.quiz});
};