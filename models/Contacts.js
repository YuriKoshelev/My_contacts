const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    user: {type: Types.ObjectId, ref: 'User'}
});

module.exports = model('Contacts', schema);