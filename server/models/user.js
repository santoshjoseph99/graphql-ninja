const {DataTypes, Model} = require('sequelize');
const {sequelize} = require('./database');

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  {sequelize, tableName: 'user'}
);
// const User = sequelize.define('user', {
//   name: {
//     type: DataTypes.STRING,
//   },
// });
// User.associate = (models) => {
//   User.hasMany(models.Car, {onDelete: 'CASCADE'}); // 1:Many
// };
console.log('User: ', User === sequelize.models.User);

module.export = User;
