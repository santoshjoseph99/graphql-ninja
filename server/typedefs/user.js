const {gql} = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    users: [User]
    user(id: Int!): User
    me: User
  }

  extend type Mutation {
    makeUser(name: String!): User
    removeUser(id: Int!): Boolean
    register(name: String!, username: String!, password: String!): Boolean!
    login(username: String!, password: String!): Token!
    uploadImage(filename: String!): String!
  }

  type User {
    id: ID!
    name: String!
    username: String!
    cars: [Car]
    photo(options: CloudinaryOptions): String
  }
  type Token {
    token: String!
  }
  scalar CloudinaryOptions
  {
    width: Int
    height: Int
    crop: String
    gravity: String
    q_auto: Boolean
    f_auto: Boolean
    face: Boolean
  }
`;
