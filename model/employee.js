const mongoose=require ('mongoose');
const emp=mongoose.Schema({
    name:String,
    position:String,
    location :String,
    salary : Number
})
const empdata=mongoose.model('employeedata',emp);
module.exports=empdata;