'use strict';
var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [12]
            }
        },
        mob_no: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [500]
            }
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [500]
            }
        }
        }, {

        //PASSPORT
        instanceMethods: {
          validPassword: function(password) {
            return bcrypt.compareSync(password, this.password);
          }
        },
        // Hooks are automatic methods that run during various phases of the User Model lifecycle
        // In this case, before a User is created, we will automatically hash their password
        hooks: {
          beforeCreate: function(user, options, cb) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
            cb(null, options);
          }
        }


    });

    return User;

};