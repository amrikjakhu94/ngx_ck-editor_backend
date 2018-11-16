const express = require('express');
const router = express.Router();
const cmsRouter = require('./cms-routing');

router.get('/',(req,res)=>{
    res.send('Welcome to CMS editor by amrik...')
});

router.use(cmsRouter);

module.exports = router;
