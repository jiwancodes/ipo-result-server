/**
 * @Created 28/07/2021 - 22:50 PM
  * @Project ipo-result-backend
 * @Author Jiwan Sapkota - sapkotazeewan13@gmail.com
 */
const express = require('express');
const {
     getResult, 
    getCompanies,
} = require('../method/action');
const { boidAndCompanyValidation } = require('./requestValidation')
const {
    getDataFromRedis,
    // clearData,
} = require('../Utils/RedisResponse');
const router = express.Router();

router.get('/resultfromdatabase',async(req,res)=>{
    const{ boid, company}= req.query;
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
    if(err){
        return res.status(500).json({
            'code':500,
            'data': null,
            'msg':`Internal Server Error.`
        })
    }
    if (data) {
        return res.status(200).json({
            'code':200,
            'data': data,
            'msg':`Congratulations. You have been allotted ${data.qty} shares!`
        });

    } if(data==null) {
        return res.status(201).json({
            'code':201,
            'data': data,
            'msg':`Sorry, you were not allotted any shares this time.`
        })
    }

});
// router.post('/result', async (req, res) => {
//     const { boid, company } = req.body;
//     const { error } = boidAndCompanyValidation()
//         .validate({
//             boid,
//             company,
//         });
//     if (error) {
//         return res.status(404).json({
//             'code': 404,
//             'err': error,
//             'msg': 'invalid fields'
//         })
//     }
//     const cacheKey = `${company}${boid}`;
//     getDataFromRedis(cacheKey, res);
// });
router.get('/result', async (req, res) => {
    const { boid, company } = req.query;
    const { error } = boidAndCompanyValidation()
        .validate({
            boid,
            company,
        });
    if (error) {
        return res.status(404).json({
            'code': 404,
            'err': error,
            'msg': 'invalid fields'
        })
    }
    const cacheKey = `${company}${boid}`;
    getDataFromRedis(cacheKey, res);
});

router.get('/companies', async (req, res) => {
    const [data, err] = await getCompanies();
    console.log("data is", data);

    if (err) {
        return res.status(500).json({
            'code': 500,
            'data': null,
            'msg': `Internal Server Error.`
        })
    }if(data==null){
        return res.status(201).json({
            'code': 200,
            'data': null,
            'msg': 'Result not available yet'
        });
    }
    if (data) {
        return res.status(200).json({
            'code': 200,
            'data': data,
            'msg': ''
        });
    }
});
// router.get('/clearCache', clearData);
module.exports = router;