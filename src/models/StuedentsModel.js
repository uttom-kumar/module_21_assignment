import mongoose from "mongoose"


export const DataSchema = mongoose.Schema({
    email : {type : String, required: true , unique : true , lowercase: true},
    password : {type : String, required: true, unique : true},
    name : {type : String, required: true},
    phone : {type : String, required: true},
    schoolName : {type : String, required: true},
    class : {type : String, required: true},
    roll : {type : String, required: true},
    section : {type : String, required: true},
    grade : {type : String, required: true}
      
},{timestamps : true, versionKey : false})

export const StudentsModel = mongoose.model('students', DataSchema)