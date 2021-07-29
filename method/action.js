
const {
    Sequelize,
} = require('sequelize');
const db = require('../models');
module.exports = {
    getResult: async (boid, company) => {
        try {
            console.log('boid', boid);
            console.log('company', company);
            const data = await db.Allotment.findOne({
                where: {
                    company,
                    boid
                },
            });
            return [data, null];
        } catch (err) {
            console.log(err);
            return [null, err];
        }
    },
}