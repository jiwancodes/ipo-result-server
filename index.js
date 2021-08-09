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
const { CronJob } = require('cron');
const { RedisContainer } = require('./Utils/Redis');
const {
    cacheAllData,
    checkData,
    getCompanies,
} = require('./method/action');

const app = express()
app.disable('etag')
    .disable('x-powered-by');
var corsOptions = {
    "origin": process.env.CORS_ORIGIN,
    "methods": "GET",
    "preflightContinue": false,
};

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.static("."));
const PORT = process.env.PORT || 4099;
db.sequelize.sync().then(() => {
    app.listen(PORT, console.log(`server running in port ${PORT} in ${process.env.NODE_ENV} mode`))
});

new RedisContainer();
let isData = false;
async function checkIfIsData() {
    console.log("checking");
    const [data, err] = await checkData();
    if (data != null) {
        isData = true;
        checkForData.stop();
        console.log("data is not null");
        cacheAllData();
    }
    else {
        isData = false;
        console.log("data is :", data);
    }
}


const checkForData = new CronJob(process.env.CRON_TIME, () => {
    console.log('running cronjob');
    checkIfIsData();
});

checkForData.start();
checkIfIsData();

app.get('/api/check', (req, res) => {
    res.status(200).json({
        msg: 'OK',
        code: 200,
    });
});
app.use('/api',optionalRouting, routes);
app.use(optionalRouting, (req, res) => res.status(404).json({ code: 404, msg: 'Request Not Found' }));


function optionalRouting  (req, res, next){
    if (isData) {
        next();
    } else {
        return res.status(201).json({
            'code': 201,
            'data': null,
            'msg': 'Result not available yet'
        });
    }
}


