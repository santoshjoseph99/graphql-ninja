const {gql} = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    cars: [Car]
    car(id: Int!): Car
  }

  extend type Mutation {
    addCar(make: String!, model: String!, color: String!): Car
    removeCar(carId: Int): Boolean
  }

  type Car {
    id: ID!
    make: String!
    model: String!
    color: String!
    owner: User!
  }
`;
