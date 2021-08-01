/**
 * @Created 28/07/2021 - 22:56 PM
 * @Project ipo-result-backend
 * @Author Jiwan Sapkota - sapkotazeewan13@gmail.com
 */
const express = require('express')
const cors = require('cors')
const dotenv = require("dotenv").config();
const routes = require('./routes/route');
const morgan = require('morgan');
const db = require('./models');

const app = express()
app.disable('etag')
    .disable('x-powered-by');

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
app.use(express.static("."));
const PORT = process.env.PORT;
db.sequelize.sync().then(() => {
    console.log("connected");
    app.listen(PORT, console.log(`server running in port ${PORT} in ${process.env.NODE_ENV} mode`))
});
app.get('/check', (req, res) => {
    res.send({
        message: 'OK',
        code: 201,
    });
});
app.use(routes);
app.use((req, res) => res.status(404).send({ message: 'Request Not Found' }));