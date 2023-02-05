const resolvers = {
  Mutation: {
    addCar: (parent, args, {models, me}, info) => {
      if (!me) {
        throw new Error('Not authenticated');
      }
      const car = {
        make: args.make,
        model: args.model,
        color: args.color,
        userId: me.id,
      };
      return models.Car.create(car);
      // models.cars.push(car);
      // return car;
    },
    removeCar: (parent, args, {models}, info) => {
      return models.Car.destroy({where: {id: args.carId}});
      // const carIndex = models.cars.findIndex((car) => car.id === parseInt(args.carId));
      // if (carIndex === -1) {
      //   return false;
      // }
      // models.cars.splice(carIndex, 1);
      // return true;
    },
  },
  Query: {
    cars: (parent, args, {models}) => {
      return models.Car.findAll();
      // return models.cars;
    },
    car: (parent, args, {models}, info) => {
      return models.Car.findByPk(args.id);
      // return models.cars.find((car) => car.id === parseInt(args.id));
    },
  },
  Car: {
    owner: (parent, args, {models}, info) => {
      return models.User.findByPk(parent.ownedBy);
      // return models.users[parent.ownedBy - 1];
    },
  },
};

module.exports = resolvers;
