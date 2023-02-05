// const {Sequelize, DataTypes, Model} = require('sequelize');
const {sequelize, User, Car} = require('./models/database');
// const models = require('./models');

console.log('user, car:', User, Car);
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: './database.sqlite',
//   define: {
//     timestamps: false,
//   },
// });
// class Car extends Model {}
// Car.init(
//   {
//     make: {
//       type: DataTypes.STRING,
//     },
//     model: {
//       type: DataTypes.STRING,
//     },
//     color: {
//       type: DataTypes.STRING,
//     },
//   },
//   {sequelize, modelName: 'car'}
// );
// class User extends Model {}
// User.init(
//   {
//     name: {
//       type: DataTypes.STRING,
//     },
//   },
//   {sequelize, modelName: 'user'}
// );
// User.hasMany(Car, {onDelete: 'CASCADE'});
// // User.hasMany(Car);
// Car.belongsTo(User);

// class Product extends Model {}
// Product.init(
//   {
//     title: Sequelize.STRING,
//   },
//   {sequelize, modelName: 'product'}
// );
// class Tag extends Model {}
// Tag.init(
//   {
//     name: Sequelize.STRING,
//   },
//   {sequelize, modelName: 'tag'}
// );

// Product.hasMany(Tag);

const createData = async () => {
  // await Product.create(
  //   {
  //     title: 'Chair',
  //     tags: [{name: 'Alpha'}, {name: 'Beta'}],
  //   },
  //   {
  //     include: [Tag],
  //   }
  // );
  const user1 = await User.create(
    {
      name: 'John Doe',
      username: 'john1',
      password: 'test',
      cars: [
        {
          make: 'Toyota',
          model: 'Camry',
          color: 'Red',
        },
        {
          make: 'Honda',
          model: 'Accord',
          color: 'Blue',
        },
      ],
    },
    {
      include: [Car],
    }
  );
  console.log(user1.toJSON());
  const user2 = await User.create(
    {
      name: 'John Doe2',
      username: 'john2',
      password: 'test',
      cars: [
        {
          make: 'Toyota',
          model: 'Prius',
          color: 'Blue',
        },
        {
          make: 'Honda',
          model: 'Pilot',
          color: 'Blue',
        },
      ],
    },
    {include: [Car]}
  );
  console.log(user2.toJSON());
};

sequelize.sync({force: true}).then(async () => {
  try {
    await createData();
  } catch (error) {
    console.log('ERROR:', error);
  }
});
