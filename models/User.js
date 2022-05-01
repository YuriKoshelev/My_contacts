const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    email: {type: String, 
            required: true, 
            unique: true},

    password: {type: String, 
               required: true},

    contacts: [{ type: Types.ObjectId,
                 ref: 'Contacts'
              }]
});

module.exports = model('User', schema);