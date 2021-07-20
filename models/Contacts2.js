const mongoose = require ('mongoose');

const Users = mongoose.model ('Users', {
   email: {
        type: String,
        required: true
    },
   password: {
        type: String,
        required:true
    },
});

module.exports = {Users}