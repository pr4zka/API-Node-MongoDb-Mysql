const { Router } = require("express");
const fs = require("fs");
const router = Router();

const PATH_ROUTES = __dirname;

const removeExtension = (fileName) => {
  //TODO tracks.js [tracks, js]
  return fileName.split(".").shift();
};

 fs.readdirSync(PATH_ROUTES).filter((file) => {
  const name = removeExtension(file); //TODO index, tracks
  if (name !== "index") {
    router.use(`/${name}`, require(`./${file}`)); //TODO http://localhost:30001/api/tracks
  }
});

module.exports = router;
