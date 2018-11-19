const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cmsSchema = Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    content : {
        type : String
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
},{ timestamps : true });

module.exports = mongoose.model('Cms',cmsSchema);
