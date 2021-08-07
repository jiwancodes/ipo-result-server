/**
 * @Created 28/07/2021 - 22:56 PM
 * @Project ipo-result-backend
 * @Author Jiwan Sapkota - sapkotazeewan13@gmail.com
 */
const {
    Sequelize,
} = require('sequelize');
const db = require('../models');
const { setDataInRedis } = require('../Utils/RedisResponse')
module.exports = {
    getResult: async (boid, company) => {
        try {
            const data = await db.allotment.findOne({
                where: {
                    company,
                    boid
                },
                attributes: ['boid', 'qty']
            });
            return [data, null];
        } catch (err) {
            console.log(err);
            return [null, err];
        }
    },
    getCompanies: async () => {
        try {
            const data = await db.allotment.aggregate('company', 'DISTINCT', { plain: false })
            const newData = [];
            data.forEach((element) => {
                newData.push(element.DISTINCT);
            });
            return [newData, null];
        } catch (err) {
            return [null, err];
        }

    },
    cacheAllData: async () => {
        try {
            const data = await db.allotment.findAll({
                attributes: ['company', 'boid', 'qty']
            });
           await data.forEach((element) => {
                // console.log('caching all data');
                setDataInRedis(element);
            });
            console.log("caching completed successfully");

        } catch (err) {
            console.log("error occured while caching");
            return [null, err];
        }


    }

}