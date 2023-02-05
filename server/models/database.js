// const Sequelize = require('sequelize');
const {Sequelize, DataTypes, Model} = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './models/database.sqlite',
  define: {
    timestamps: false,
  },
});

class Car extends Model {}
Car.init(
  {
    make: {
      type: DataTypes.STRING,
    },
    model: {
      type: DataTypes.STRING,
    },
    color: {
      type: DataTypes.STRING,
    },
  },
  {sequelize, modelName: 'car'}
);
class User extends Model {}
User.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    photo: {
      type: DataTypes.STRING,
    },
  },
  {sequelize, modelName: 'user'}
);

User.prototype.hashPassword = async function (password) {
  return await bcrypt.hash(this.password, 10);
};

User.prototype.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

console.log('user, car:', User, Car);
User.hasMany(Car, {onDelete: 'CASCADE'});
Car.belongsTo(User);

User.beforeCreate(async (user) => {
  user.password = await user.hashPassword(user.password);
});
// User.findAll().then((users) => console.log('users:', users));
module.exports = {
  sequelize,
  User,
  Car,
};
