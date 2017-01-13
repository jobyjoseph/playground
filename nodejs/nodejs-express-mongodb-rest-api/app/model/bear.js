var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;

// Setup bear Schema
var BearSchema      = new Schema({
  name: String
});

// Bear Model is made public
module.exports = mongoose.model('Bear', BearSchema);
