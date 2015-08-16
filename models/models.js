/**
 * Created by jonathan on 2/08/15.
 */

//Inicialización de variables y requires...
var path = require("path"),
    url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/),
    DB_name = (url[6] || null),
    user = (url[2] || null),
    pwd = (url[3] || null),
    protocol = (url[1] || null),
    dialect = (url[1] || null),
    port = (url[5] || null),
    host = (url[4] || null),
    storage = process.env.DATABASE_STORAGE,
    Sequelize = require("sequelize"),
    sequelize = new Sequelize(DB_name, user, pwd, {
        dialect: protocol,
        protocol:protocol,
        storage: storage,
        port: port,
        host: host,
        omitNull: true
    }),
    Quiz = sequelize.import(path.join(__dirname, 'quiz'));


exports.Quiz = Quiz;

//Sincronizamos las definiciones que existen en el modelo '/models'
//TODO: QUitar el force true cuando hagamos el desplegue final
sequelize.sync({force:true}).then(function(){
    Quiz.count().then(function(count){
            if(count === 0){
                Quiz.create({
                    pregunta: "Capital de italia",
                    respuesta: "Roma",
                    tematica: "Humanidades"
                });
                Quiz.create({
                    pregunta: "Capital de Portugal",
                    respuesta: "Lisboa",
                    tematica: "Humanidades"
                })
                    .then(function(){console.log("Base de datos inicializada")});
            }
    });
});