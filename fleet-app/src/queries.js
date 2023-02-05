import {gql} from '@apollo/client';

export const ADD_CAR = gql`
  mutation AddCar($make: String!, $model: String!, $color: String!, $userId: Int!) {
    addCar(make: $make, model: $model, color: $color, userId: $userId) {
      make
      model
      color
    }
  }
`;

export const ADD_USER = gql`
  mutation MakeUser($name: String!) {
    makeUser(name: $name) {
      id
      name
    }
  }
`;

export const GET_USERS = gql`
  query {
    users {
      id
      name
      cars {
        make
        model
      }
    }
  }
`;
