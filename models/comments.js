/**
 * Created by jonathan on 16/08/15.
 */

module.exports = function(sequelize, DataTypes){
    return sequelize.define(
        'Comment',
        {
            texto:{
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "-> Falta Comentario"}}
            }
        }
    );
};