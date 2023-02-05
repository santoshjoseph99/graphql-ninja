const carTypeDefs = require('./car');
const userTypeDefs = require('./user');

const defaultSchema = require('./default');

module.exports = [defaultSchema, carTypeDefs, userTypeDefs];
