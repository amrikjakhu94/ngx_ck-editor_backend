const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cmsSchema = Schema({
    title : {
        type : String,
        required : true,
        unique : true
    },
    description : {
        type : String
    },
    content : {
        type : String
    }
},{ timestamps : true });

module.exports = mongoose.model('Cms',cmsSchema);