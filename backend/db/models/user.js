'use strict';
const { Model, Validator } = require('sequelize');
// Phase 3 | UMM bcrypt package needed | compare password AND hashed password
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // Phase 3 | User Model Methods | create methods that API routes for authentication
      // UMM 1 | toSafeObject | return ONLY USER instance info that's safe to save to a JWT.
    toSafeObject() {
      const { id, username, email } = this; //THIS's context will be USER instance
      return {id, username, email};
    }
      // UMM 2 | validatePassword | accepts password str, return true IF match to hashedPw
    validatePassword(password) {
        return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
      // UMM 3 |static getCurrentUserById | accepts id, use currentUser scope, return user w/ id
     static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
     }
      // UMM 4 | static login | accept obj w/ credential & pw keys. search for user w/ credential
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }
      // UMM 5 | static signup | accept obj w/ uN, email, and pW key. hash PW, create user w/ hPW. return created user.
    static async signup({ username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }
    static associate(models) {
      // define association here
    }
  };

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    }, {
      sequelize,
      modelName: 'User',
      // Phase 3 | Model Scopes - Protecting Users' Information | Excluding certain attributes in dS, scopes, and logInU
      // These scopes help protect SENSITIVE user info.
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"]}
        },
        logInUser: {
          attributes: {}
        }
      }
    }
  );
  return User;
};
