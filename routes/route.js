/**
 * @Created 19/07/2021 - 8:15 AM
 * @Project npstock-backend
 * @Author Jiwan Sapkota - sapkotazeewan13@gmail.com
 */
const express = require('express');
const { getResult } = require('../method/action');
const { boidAndCompanyValidation } = require('./requestValidation')
const router = express.Router();

router.post('/result',async(req,res)=>{
    const{ boid, company}= req.body;
    // console.log('body is :',req.body);
    const { error } = boidAndCompanyValidation()
    .validate({
        boid,
        company,
    });
    if(error){
        res.status(404).json({
            'code':404,
            'err': error,
            'msg':'invalid field, BOID should be of 16 digits'
        })
    }
    const [data, err] = await getResult(boid,company);
    // console.log(data);
    if (data) {
        res.status(200).json({
            'code':200,
            'data': data,
            'msg':`Congratulations!!, you are allotted with ${data.qty} shares`
        });

    } else {
        res.status(201).json({
            'code':201,
            'data': data,
            'msg':`sorry!, not allotted `
        })
    }


});
module.exports = router;