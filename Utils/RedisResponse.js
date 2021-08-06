/**
 * @Created 06/08/2021 - 19:49 PM
 * @Project ipo-result-backend
 * @Author Jiwan Sapkota - sapkotazeewan13@gmail.com
 */
/*eslint-disable*/

const { RedisContainer } = require('./Redis');
// const { boidAndCompanyValidation } = require('../routes/requestValidation');

const setDataInRedis = async (element) => {
    const{boid, company, qty}=element;
    const cacheKey = `${company}${boid}`;
    const data = {
        // 'boid': boid,
        'qty': qty,
    };
    if (cacheKey && data) {
       await RedisContainer.createRedisState().setData(cacheKey, data);
        return;
    } else {
        throw new Error('Error fetching data from database');
    }
};

const getDataFromRedis = async (cacheKey, res) => {
    try {
        console.log("response from redis");
        const redisData = await RedisContainer.createRedisState()
            .getData(cacheKey);
        if (redisData) {
            return res.status(200).send({
                'code': 200,
                // 'data': redisData,
                'msg': `Congratulations. You have been allotted ${redisData.qty} shares!`
            });
        }
        return res.status(201).send({
            code: 201,
            // data: redisData,
            msg: `Sorry, you were not allotted any shares this time.`
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            code: 400,
            // data: null,
            msg: 'error retriving data'
        });

    }
};
 const clearData = async (req, res)=>{
    const message = RedisContainer.createRedisState().clearCache();
    res.send(message);
 };
module.exports = { setDataInRedis, getDataFromRedis, clearData };
