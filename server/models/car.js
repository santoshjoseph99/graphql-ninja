const {DataTypes, Model} = require('sequelize');
const {sequelize} = require('./database');

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
  {sequelize, tableName: 'car'}
);
// const Car = sequelize.define('car', {
//   make: {
//     type: DataTypes.STRING,
//   },
//   model: {
//     type: DataTypes.STRING,
//   },
//   color: {
//     type: DataTypes.STRING,
//   },
// });
// Car.associate = (models) => {
//   Car.belongsTo(models.User);
// };
console.log('Car: ', Car === sequelize.models.Car);

module.exports = Car;
