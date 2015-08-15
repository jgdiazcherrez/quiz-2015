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
                res.render('quizes/index.ejs', {quizes: quizes, errors:[]});
            }
        ).catch(function(error){ next(error); });
    }
    else{
        text =  "%" + text + "%";
        models.Quiz.findAll({where: ["LOWER(pregunta) like ?", (text.replace(/\s+/g, "%")).toLowerCase()]}).then(
            function(quizes){
                res.render('quizes/index.ejs', {quizes:quizes ,errors:[]});
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
        res.render('quizes/answer', {quiz:quiz, respuesta: resultado, errors:[]});
    });
};

exports.show = function(req, res){
  res.render("quizes/show", {quiz: req.quiz, errors:[]});
};


exports.new = function(req, res){
  var quiz = models.Quiz.build(
      {pregunta: "", respuesta: ""}
  );
  res.render('quizes/new', {quiz:quiz, errors:[]});
};


exports.creator = function(req, res){
    var quiz = models.Quiz.build(req.body.quiz);
    quiz
        .validate()
        .then(
            function(err){
                if(err){
                    res.render('quizes/new', {quiz: quiz, errors: err.errors});
                }else{
                    quiz.save({fields:["pregunta", "respuesta"]}).then(function(){
                        res.redirect('/quizes');
                    });
                }
            }
        );
};

exports.edit = function(req, res){
  var quiz = req.quiz;
    res.render('quizes/edit', {quiz: quiz, errors:[]});
};


exports.update = function(req, res){
    req.quiz.pregunta = req.body.quiz.pregunta;
    req.quiz.respuesta = req.body.quiz.respuesta;

    req.quiz
        .validate()
        .then(
            function(err){
                if(err){
                    res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
                }
                else{
                    req.quiz
                        .save({fields: ["pregunta", "respuesta"]})
                        .then(function(){ res.redirect('/quizes')});
                }
            }
        );

};

exports.destroy = function(req, res){
    req.quiz.destroy().then(function(){
       res.redirect('/quizes');
    }).catch(function(error){next(error)});
};