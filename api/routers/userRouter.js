const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const User = require('../models/userModel');

router.post('/signup', (req,res,next)=> {
    console.log('=====', req.body)
    User.find({email:req.body.email})
    .exec()
    .then(user=> {
        if(user.length >= 1){
            return res.status(409).json({
                status: "failed",
                message: "User already exist"
            })
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    })
                }else{
                    const new_user = new Admin({
                        name:req.body.name,
                        email:req.body.email,
                        password:hash,
                        role:req.body.role
                    })
                    new_user.save()
                    .then(result=> {
                        res.status(201).json({
                            status: "success",
                            message: "User successfully created"
                        })
                    })
                    .catch(err=> {
                        res.status(500).json({
                            error:err
                        })
                    })
                }
            })
        }
    })
})

router.post('/login', (req, res, next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        console.log('user', user)
        if(user.length < 1){
            return res.status(401).json({
                message:"eamil to try to login not found"
            })
        }
        bycrypt.compare(req.body.password, user[0].password, (err, result)=>{
            if(err){
                return res.status(401).json({
                    message:"Auth failed"
                })
            }
            if(result){
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id,
                    role: user[0].role
                },
                    'secret'
                );
                return res.status(200).json({
                    message: "Auth successful",
                    token:token
                })
            }
            res.status(401).json({
                message:"Password does not match"
            })
        })
    })
    .catch(err =>{
        res.status(500).json({
            error:err
        })
    })
})


module.exports = router;