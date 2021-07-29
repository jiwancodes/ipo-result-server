/**
 * @Created 29/07/2021 - 2:04 AM
 * @Project ipo-result-backend
 * @Author Jiwan Sapkota - sapkotazeewan13@gmail.com
 */
const Joi = require('joi');
module.exports = {
    boidAndCompanyValidation: () => Joi.object({
        boid: Joi.string()
            .min(16)
            .max(16)
            .required(),
        company: Joi.string()
            .required(),
    }),
};