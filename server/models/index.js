const {DataTypes, Model} = require('sequelize');
const {sequelize} = require('./database');
// const User = require('./user');
// const Car = require('./car');
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
  },
  {sequelize, modelName: 'user'}
);
console.log('user, car:', User, Car);
User.hasMany(Car, {onDelete: 'CASCADE'});
Car.belongsTo(User);

const models = {
  User: User,
  Car: Car,
};

// Object.keys(models).forEach((modelName) => {
//   if ('associate' in models[modelName]) {
//     models[modelName].associate(models);
//   }
// });
console.log('MODELS1', models);
module.export = models;
