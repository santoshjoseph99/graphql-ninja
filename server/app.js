require('dotenv').config(); //process.env.JWT_SECRET
const express = require('express');
const jwt = require('jsonwebtoken');
const cloundinary = require('cloudinary');
const routes = require('./routes');

const app = express();
const {ApolloServer} = require('apollo-server-express');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');
// const models = require('./models');
const db = require('./models/database');
const cors = require('cors');

cloundinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const me = models.users[0];

const getLoggedInUser = (req) => {
  const token = req.headers['x-auth-token'];
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Session invalid');
    }
  }
};

async function main() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({
      models: {Car: db.Car, User: db.User},
      secret: process.env.JWT_SECRET,
      me: getLoggedInUser(req),
      // me: {...db.User.findOne({where: {id: 1}})},
    }),
  });

  app.set('view engine', 'pug');
  app.set('views', `${__dirname}/public`);
  app.get('/', routes.index);

  app.use(cors());
  await server.start();
  server.applyMiddleware({app});
  app.listen(3001, () => console.log('server started on port 3001'));
}

main();
