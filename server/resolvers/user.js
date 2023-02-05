const jwt = require('jsonwebtoken');
const cloundinary = require('cloudinary');
const {GraphQLScalarType} = require('graphql');

const createToken = async (user, secret, expiresIn) => {
  const {id, name, username} = user;
  return await jwt.sign({id, name, username}, secret, {expiresIn});
};

const resolvers = {
  Mutation: {
    makeUser: (parent, args, {models}, info) => {
      const user = {name: args.name};
      return models.User.create(user);
      // models.users.push(user);
      // return user;
    },
    removeUser: (parent, args, {models}, info) => {
      return models.User.destroy({where: {id: args.id}});
      // const userIndex = models.users.findIndex((user) => user.id === parseInt(args.id));
      // if (userIndex === -1) {
      //   return false;
      // }
      // models.users.splice(userIndex, 1);
      // return true;
    },
    register: async (parent, args, {models}, info) => {
      const user = {name: args.name, username: args.username, password: args.password};
      const newUser = await models.User.create(user);
      return !!newUser;
    },
    login: async (parent, {username, password}, {models, secret}, info) => {
      const user = await models.User.findOne({where: {username}});
      if (!user) {
        throw new Error('No user found');
      }
      const valid = await user.checkPassword(password);
      if (!valid) {
        throw new Error('Invalid password');
      }
      return {
        token: createToken(user, secret, '30m'),
      };
    },
    uploadImage: async (parent, {filename}, {models, me}, info) => {
      if (!me) {
        throw new Error('Not authenticated');
      }
      const user = await models.User.findByPk(me.id);
      const path = require('path');
      const mainDir = path.dirname(require.main.filename);
      filename = `${mainDir}/uploads/${filename}`;
      const photo = await cloundinary.v2.uploader.upload(filename);
      // models.User.update({photo: photo.url}, {where: {id: me.id}});
      models.User.update({photo: `${photo.public_id}.${photo.format}`}, {where: {id: me.id}});
      await user.save();
      return filename;
    },
  },
  Query: {
    users: (parent, args, {models}, info) => {
      return models.User.findAll();
    },
    user: (parent, args, {models}, info) => {
      return models.User.findByPk(args.id); //({where: {id: args.id}});
      // return models.User.findOne({where: {id: args.id}});
    },
    // me: () => models.me,
  },
  User: {
    cars: (parent, args, {models}, info) => {
      return models.Car.findAll({where: {userId: parent.id}});
      // return models.cars.filter((car) => car.ownedBy === parent.id);
    },
    photo: (parent, args, {models}, info) => {
      let url = cloundinary.url(parent.photo);
      if (args.options) {
        const [width, q_auto, f_auto, face] = args.options;
        const cloundinary = {
          ...(q_auto === 'true' && {quality: 'auto'}),
          ...(f_auto === 'true' && {fetch_format: 'auto'}),
          ...(face === 'true' && {crop: 'thumb', gravity: 'face'}),
          width,
          secure: true,
        };
        url = cloundinary.url(parent.photo, cloundinary);
        return url;
      }
      return url;
    },
  },
  CloudinaryOptions: new GraphQLScalarType({
    name: 'CloudinaryOptions',
    parseValue(value) {
      return value;
    },
    serialize(value) {
      return value;
    },
    parseLiteral(ast) {
      console.log(ast.value);
      return ast.split(',');
    },
  }),
};

module.exports = resolvers;
