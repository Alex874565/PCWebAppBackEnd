import { NextFunction, Request, Response } from "express";
const UserModel = require('../models/userModel')
const UserController = require('../controllers/userController')

const jwt = require('jsonwebtoken')
var nodemailer = require('nodemailer');

function mailCode(req : Request, res : Response){
    const {email, code} = req.body;
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
           auth: {
                user: process.env.HOST_EMAIL,
                pass: process.env.HOST_PASSWORD
             },
        secure: true,
        });

    const mailData = {
        from: 'love4games@gmail.com',
        to: email,
        subject: 'Love4Games Verification Code',
        text: code.toString()
        };

    transporter.sendMail(mailData, function (err : any, info : any) {
        if(err)
            res.status(400).json({message: err.message})
        else
            res.status(200).json(info)
        });
}

function loginUser(req : Request, res : Response){
    const email = req.body.email;
    let password = req.body.password;
    UserModel.User.findOne({email : email}).then(
        async function(user : any, err : any) {
            if(user){
                const res = await user.validatePassword(password)
                return [res, user.password, user.role]
            }else{
                res.status(401).json({message: "Wrong email"})
                return "Wrong email"
            }
        }).then(
            async function (response : any) {
                const [valid_pass, password, role] = response
                if (valid_pass == true){
                    const user = await UserModel.User.findOne({email: email}, 'name role _id');
                    const token = generateAccessToken(email, password, role);
                    res.status(200).json({user: user, token : token});   
                }else if (valid_pass == false){
                    res.status(401).json({message: "Wrong pasword"});
                }
        }).catch(function(err : any) {
            res.status(400).json({message: err.message})
        }
    )
}

// function authGoogle(req : Request, res : Response){
//     const {name, email, password} = req.body;
//     if(password != undefined && password != ""){
//         UserModel.User.updateOne({email : email}, {email : email, password : password, name: name, role : "Client" }, {upsert: true, new: true}, function (err : any, result : any){
//             if(err){
//                 return res.status(400).json({message: err.message})
//             }
//             return res.status(200).json(result)
//         })
//     }else{
//         return res.status(400).json({message: "Password not provided"})
//     }
// }

function authGoogle(req : Request, res : Response){
    const {name, email, password} = req.body;
    if(password != undefined && password != ""){
        UserModel.User.findOne({email : email}).then(async function (user : any){
            if(!user){
                user = new UserModel.User({
                    name: name,
                    email: email,
                    password: password,
                    role: "Client"
                  });
                    await user.save();
                }
            const token = await generateAccessToken(user.email, user.password, user.role)
            res.status(200).json({user: {_id: user._id, name: user.name, role: user.role}, token: token})
        }).catch((err : any) => res.status(400).json({message: err.message}))
    }else{
        return res.status(400).json({message: "Password not provided"})
    }
}


function registerUser(req : Request, res : Response){
    const email = req.body.email;
    UserModel.User.findOne({email:email}).then(
        function (user : any){
            if(user){
                res.status(409).json({message: "Email already in use"})
            }else{
                UserController.createUser(req, res)
            }
        }
    )
}

function checkEmail(req : Request, res : Response){
    const email = req.body.email;
    UserModel.User.count({email : email}, function(err : any, count : any){
        if (err) { res.status(400).json({message: err.message}) }
        res.status(200).json(count)
    })
}

function generateAccessToken(email : string, password : string, role : string){
    console.log(role)
    return jwt.sign({email : email, password : password, role : role}, process.env.TOKEN_SECRET, {noTimestamp : true});
}

function authClientPrivileges(req : Request, res : Response, next : NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    
    if(token == null){
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        console.log(err);
    
        if (err) return res.sendStatus(403);
        next();
    })
}

function authDistributorPrivileges(req : Request, res : Response, next : NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    
    if(token == null){
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        console.log(err);
    
        if (err) return res.sendStatus(403);
        if (user.role == "Client"){
            return res.sendStatus(401);
        }
        next();
    })
}

function authAdminPrivileges(req : Request, res : Response, next : NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    
    if(token == null){
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        console.log(err);
        if (err) return res.sendStatus(403);
        if (user.role != "Admin"){
            return res.sendStatus(401)
        }
        next();
    })
}

export = { generateAccessToken, authClientPrivileges, authAdminPrivileges, authDistributorPrivileges, loginUser, registerUser, authGoogle, mailCode, checkEmail }