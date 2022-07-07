const mongoose=require('mongoose');
const dataschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    cgpa:{
        type:Number,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    offers:{
        type:Number,
        default:0
    },
    remarks:{
        type:String,
        default:'decent'
    }
})

// collections creation
const Register= new mongoose.model('Register',dataschema)

module.exports=Register;