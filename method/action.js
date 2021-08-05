/**
 * @Created 28/07/2021 - 22:56 PM
 * @Project ipo-result-backend
 * @Author Jiwan Sapkota - sapkotazeewan13@gmail.com
 */
const {
    Sequelize,
} = require('sequelize');
const db = require('../models');
module.exports = {
    getResult: async (boid, company) => {
        try {
            const data = await db.Allotment.findOne({
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
}