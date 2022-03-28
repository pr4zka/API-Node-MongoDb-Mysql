const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const morganBody = require("morgan-body");
const loggerStream = require("./utils/handleLogger");
const dbConnectNoSql = require("./config/mongo");
const {dbConnectMysql} = require('./config/mysql')
require("dotenv").config();

const ENGINE_DB = process.env.ENGINE_BD;
//express config
const app = express();

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("storage"));

morganBody(app, {
  stream: loggerStream,
  skip: function (req, res) {
    return res.statusCode < 400; // si es un numero menor omitira el error
  },
});

//port
const port = process.env.PORT || 3000;

//routes //hago uso de las rutas
app.use("/api", require("./routes"));

//server listening
app.listen(port, () => {
  console.log(`server on port ${port}`);
});

(ENGINE_DB === 'nosql') ? dbConnectNoSql() : dbConnectMysql();
