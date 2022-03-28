const ENGINE_BD = process.env.ENGINE_BD;

const pathModels = ENGINE_BD === "nosql" ? "./nosql" : "./mysql";
const models = {
  usersModel: require(`${pathModels}/users`),
  tracksModel: require(`${pathModels}/tracks`),
  storageModel: require(`${pathModels}/storage`),
};

module.exports = models;
