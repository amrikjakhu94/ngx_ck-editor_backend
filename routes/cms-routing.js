let express = require('express');
let router = express.Router();
let cms_controller = require('./cms-controller')

router.get('/getcmspagefromtitle/:title',cms_controller.getCmsPageFromTitle);

router.get('/gethomepagedata',cms_controller.getHomePageData);

router.post('/posthomepagedata/:title',cms_controller.postHomePageData);

router.get('/getallcmspages',cms_controller.getAllCmsPages);

router.post('/postnewcmspagedata',cms_controller.postNewCmsPageData);

router.post('/posteditcmspagedata/:id',cms_controller.postEditCmsPageData);

router.delete('/deletecmspage/:id',cms_controller.deleteCmsPage);

router.get('/getcmspagesfrompaginate/:page/:limit',cms_controller.getCmsPagesFromPaginate);

module.exports = router;
