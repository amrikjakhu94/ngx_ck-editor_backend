let Cms = require('../models/Cmsschema');

exports.getAllCmsPages = (req,res)=>{
    Cms.find().then(
        cmspages=>{
            if(cmspages){
                return res.status(200).json(cmspages);
            }
            else{
                console.log('Something went wrong.');
                return res.status(400).json({ error : 'Something went wrong.' });
            }
        }
    )
};

exports.getCmsPageFromTitle = (req,res)=>{
    let title = req.params.title;
    Cms.findOne({ title : title }).then(
        cms=>{
            if(cms){
                return res.status(200).json(cms);
            }
            else{
                console.log('Something went wrong.');
                return res.status(400).json({ error : 'Something went wrong.' });
            }
        }
    )
};

exports.getHomePageData = (req,res)=>{
    Cms.findOne().then(
        cms=>{
            if(cms){
                return res.status(200).json(cms);
            }
            else{
                console.log('Something went wrong.');
                return res.status(400).json({ error : 'Something went wrong.' });
            }
        }
    )
};

exports.postHomePageData = (req,res)=>{
    let cmsdata = { title : 'Homepage',
                    description : 'hello',
                    content : '<p>Demo cms homepage data</p>'
                };
    let title = req.params.title;
    let homepageData = req.body.content;
    console.log(homepageData+'zzzzzzzz');
    
    Cms.findOneAndUpdate( { title : title },{ $set : { content : homepageData } }).then(
        cms=>{
            if(cms){
                console.log(cms);
                return res.status(200).json({ success : 'Cms added.' });
            }
            else{
                console.log('Something went wrong.');
                return res.status(400).json({ error : 'Something went wrong.' });
            }
        }
    )
};

exports.postNewCmsPageData = (req,res)=>{
    let homepageData = req.body;
    console.log(homepageData+'zzzzzzzz');
    Cms.findOne( { title : homepageData.title } ).then(
        title=>{
            if(title){
                return res.status(400).json({error : 'Title already exists.'})
            }
            else{
                Cms.create( homepageData ).then(
                    cms=>{
                        if(cms){
                            console.log(cms);
                            return res.status(200).json({ success : 'New cms page added successfully.' });
                        }
                        else{
                            return res.status(400).json({ error : 'Something went wrong.' });
                        }
                    }
                )
            }
        }
    )
};

exports.postEditCmsPageData = (req,res)=>{
    let homepageData = req.body;
    let id = req.params.id;
    // console.log(id);
    // console.log(JSON.stringify(homepageData));
    Cms.findOneAndUpdate( { _id : id },{ $set :  homepageData } ).then(
        update=>{
            if(update){
                return res.status(200).json({success : 'Page data updated successfully'});
            }
            else{
                return res.status(400).json({ error : 'Something went wrong.' });
            }
        }
    )
};
