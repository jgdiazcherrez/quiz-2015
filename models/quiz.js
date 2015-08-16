/**
 * Created by jonathan on 2/08/15.
 */
module.exports = function(sequelize, DataTypes){
  return sequelize.define('Quiz', {
        pregunta: {
            type : DataTypes.STRING,
            validate:{notEmpty: {msg: "-> Falta la pregunta"}}
        },
        respuesta: {
            type: DataTypes.STRING,
            validate:{notEmpty: {msg: "-> Falta la respuesta"}}
        },
        tematica:{
            type: DataTypes.ENUM,
            values:['Otro','Humanidades','Ocio', "Ciencia", "Tecnologia"],
            defaultValue: "Otro",
            allowNull: false
        }
  });
};
