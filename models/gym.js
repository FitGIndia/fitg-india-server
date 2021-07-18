const mongoose = require("mongoose");
const{ObjectId} = mongoose.Schema;

const gymSchema = new mongoose.Schema({
name: {
    required: true,
    type: String,
    trim: true,
    maxlenght: 32,
},

owner:{
    type : ObjectId,
    ref: "User",
    // required: true,
},

Admins:{
    type: Array,
    default: [],
},

About:{
    type: String,
    maxlenght:250
},

plans:{
    type:ObjectId,
    ref:"Product"
},

location:{
    street :{
        type: String,
    },
    landmark:{
        type:String,
    },
    pin:{
        type: Number,
        default: 0,
    }

}
});

module.exports = mongoose.model("Gym", gymSchema );
