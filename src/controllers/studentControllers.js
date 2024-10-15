import { LoginService, ReadProfileService, RegistrationService, UpdateProfileService } from "../services/StudentsService.js"



export const Registration = async (req, res) => {
    let result = await RegistrationService(req)
    return res.json(result)
}


export const Login = async (req, res) => {
    let result = await LoginService(req,res)
    return res.json(result)
}



export const ReadProfile = async (req, res) => {
    let result = await ReadProfileService(req)
    return res.json(result)
}


export const UpdateProfile = async (req, res) => {
    let result = await UpdateProfileService(req)
    return res.json(result)
}