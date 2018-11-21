let Cms = require('../models/Cmsschema');

exports.getAllCmsPages = (req,res)=>{
    Cms.find({isDeleted : false}).then(
        cmspages=>{
            if(cmspages){
                return res.status(200).json(cmspages);
            }
            else{
                console.log('Something went wrong.');
                return res.status(400).json({ message : 'Something went wrong.' });
            }
        }
    )
};

exports.getCmsPagesFromPaginate = (req,res)=>{
    let page = parseInt(req.params.page);
    let Limit = parseInt(req.params.limit);
    Cms.find({isDeleted : false}).skip((page*Limit) - Limit).limit(Limit).then(
        cmspages=>{
            if(cmspages){
                Cms.count({isDeleted : false}).then(
                    (totalCount) => {
                        return res.status(200).json( { cmspages, totalCount : totalCount});
                   }
               ).catch();
            }
            else{
                console.log('Something went wrong.');
                return res.status(400).json({ message : 'Something went wrong.' });
            }
        }
    )
};

exports.getCmsPageFromTitle = (req,res)=>{
    let title = req.params.title;
    Cms.findOne({ title : title , isDeleted : false }).then(
        cms=>{
            if(cms){
                return res.status(200).json(cms);
            }
            else{
                console.log('Something went wrong.');
                return res.status(400).json({ message : 'Something went wrong.' });
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
                return res.status(400).json({ message : 'Something went wrong.' });
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
                return res.status(200).json({ message : 'Cms added.' });
            }
            else{
                console.log('Something went wrong.');
                return res.status(400).json({ message : 'Something went wrong.' });
            }
        }
    )
};

exports.postNewCmsPageData = (req,res)=>{
    let newpageData = req.body;
    // console.log(newpageData+'zzzzzzzz');
    Cms.findOne( { title : newpageData.title , isDeleted : false } ).then(
        titleexists=>{
            if(titleexists){
                return res.status(400).json({message : 'Title already exists,try creating page with another title.'});
            }
            else{
                Cms.create( newpageData ).then(
                    cms=>{
                        if(cms){
                            console.log(cms);
                            return res.status(200).json({ message : 'New cms page added successfully.' });
                        }
                        else{
                            return res.status(400).json({ message : 'Something went wrong.' });
                        }
                    }
                )
            }
        }
    )
};

exports.postEditCmsPageData = (req,res)=>{
    let editPageData = req.body;
    let id = req.params.id;
    let title = req.body.title;
    let titlematch = false;
    // console.log(id,'kkk');
    Cms.find( { _id : { $ne : id } , isDeleted : false } ).select('title').then(
        otherpages=>{
            for(let i=0;i<otherpages.length;i++){
                if(otherpages[i].title == title){
                    titlematch = true;
                    break;
                }
            }
            if(titlematch == true){
                res.status(400).json({ message : 'Page title already exists.' })
            }
            if(titlematch == false){
                Cms.findOneAndUpdate( { _id : id, isDeleted : false },{ $set : editPageData } ).then(
                    update=>{
                        if(update){
                            return res.status(200).json({message : 'Page data updated successfully'});
                        }
                        else{
                            return res.status(400).json({ message : 'Something went wrong.' });
                        }
                    }
                )
            }
        }
    )
};

exports.deleteCmsPage = (req,res)=>{
    let id = req.params.id;
    Cms.findOneAndUpdate({ _id : id , isDeleted : false },{ $set : { isDeleted : true } }).then(
        deleted=>{
            if(deleted){
                Cms.find({ isDeleted : false }).then(
                    cmspages=>{
                        return res.status(200).json({ code : 200, message : 'Page deleted successfully.', data: cmspages });
                    }
                )
                // return res.status(200).json({ success : 'Page deleted successfully.' });
            }
            else{
                return res.status(404).json({ error : 'Page not found.' })
            }
        }
    )
}
