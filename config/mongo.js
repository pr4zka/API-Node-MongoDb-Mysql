const mongoose = require('mongoose')

const dbConnectNoSql = () => {
    const DB_URI = process.env.DB_URI
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, res) => {
        if (!err) {
            console.log('**** CONEXION CORRECTA ****')
        } else {
            console.log('***** ERROR DE CONEXION ****')
        }
    })
}

module.exports = dbConnectNoSql
//mongodb+srv://pr4zka:<password>@cluster0.knqzl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
