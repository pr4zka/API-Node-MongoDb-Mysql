const ENGINE_BD = process.env.ENGINE_BD;
const getProperties = () => {
  const data = {
    nosql: {
      id: "_id",
    },
    mysql: {
      id: "id",
    },
  };
  return data[ENGINE_BD];
};

module.exports = getProperties;
