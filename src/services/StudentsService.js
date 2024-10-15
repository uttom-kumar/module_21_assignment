import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId
import { StudentsModel } from "../models/stuedentsModel.js"
import { EncodedToken } from "../utility/TokenUtility.js";
import md5 from 'md5'



export const RegistrationService = async (req) => {
    try{
        let reqBody = req.body;
        // encription using md5
        let password = md5(reqBody.password)
        reqBody.password = password
        let data = await StudentsModel.create(reqBody)

        return{
            status : "success",
            message : "Students Registration successfully",
            data : data
        }
    }
    catch(err){
        return {
            status : "failed", 
            data : err.toString()
        }
    }
}

export const LoginService = async (req,res) => {
    try{
        let {email,password} = req.body
        req.body.password = md5(password)


        let data = await StudentsModel.updateOne({email:email,password:password},{upsert:true})


        // *set cookie token for login
        let user_id = await StudentsModel.find({email:email}).select("_id")
        let token = EncodedToken(email,user_id[0]["_id"].toString())
        let options = {
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            httpOnly: true,
            sameSite: "none",
            secure: true,
        }
        res.cookie("token", token,options)

        return {
            status : "success",
            message : "Login Successful",
            data : data,
            token : token
        }
    }
    catch(err) {
        return {status : "failed", data : err.toString()}
    }
}


export const ReadProfileService = async (req) => {
    try{
        let userID = new ObjectId(req.headers.user_id)

        let MatchStage = {
            $match : {_id : userID}
        }

        let projectionStage = {
            $project : {
                "_id" : 0,
                "password" : 0,
            }
        }
        
        let data = await StudentsModel.aggregate([
            MatchStage,
            projectionStage
        ])

        return{
            status : "success",
            data : data
        }
    }
    catch(err){
        return {status : "failed", data : err.toString()}
    }
}


export const UpdateProfileService = async (req) => {
    try{
        let user_id = req.headers.user_id
        let reqBody = req.body;

        let data = await StudentsModel.updateOne({_id:user_id}, {$set:reqBody} , {upsert:true})
        
        return{
            status : "success",
            data : data
        }
    }
    catch(err){
        return {status : "failed", data : err.toString()}
    }
}