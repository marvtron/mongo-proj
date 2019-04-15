const mongoose = require('mongoose');

const Team = new mongoose.Schema( {
    team: {type:String, trim:true, default:''},
    league: {type:String, trim:true, default:''},
    country: {type:String, trim:true, default:''}
} );

module.exports = mongoose.model('Team', Team);