const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const registerUsers = require('../Model/register');
const loginUsers = require('../Model/login');
const eventModel = require('../Model/events');

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('unauthorized Request');
    } else {
        let token = req.headers.authorization.split(' ')[1];
        if (token === '') {
            return res.status(401).send("unauthorized Request");
        } else {
            try {
                let payload = jwt.verify(token, "secretKey");
                req.userId = payload.subject;
                next();
            } catch (err) {
                return res.status(401).send('unauthorized');
            }
        }
    }
}


router.get('/register',(req,res)=>{
    registerUsers.find({}).exec()
    .then(data=>{
        res.status(200).json({
            count: data.length,
            user:data
        })
    })
});

router.post('/register', (req,res)=>{
    const userData = registerUsers.findOne({email: req.body.email}).exec()
    .then(async (data)=>{
        if(data == null){
        const hashedPass = await bcrypt.hash(req.body.password,10);
           const user = new registerUsers({
               fname: req.body.fname,
               lname: req.body.lname,
               uname: req.body.uname,
               email: req.body.email,
               password: hashedPass
           });
           user.save((error,registeredUser)=>{
               if(error){
                   res.status(500).send('Wrong Input');
               }else{
                   const payload = {subject: registeredUser._id};
                   const token = jwt.sign(payload,'secretKey');
                    res.status(201).send({token});
               }
           })
        }
        else{
            res.status(500).send('Already Registered');
        }
    })
    .catch(err=>{
        console.log(err);
    })
});

router.post('/login', (req,res)=>{
    const userData = registerUsers.findOne({email: req.body.email}).exec()
    .then(async data=>{
        if(data == null){
            res.status(500).send('You have to Register First');
        }else{
            hashedPassword = await bcrypt.hash(req.body.password,10);
            const user = new loginUsers({
                email : req.body.email,
                password: hashedPassword
            });
            bcrypt.compare(req.body.password, data.password, (error,response)=>{
                if(response){
                    const payload = {subject: userData._id};
                    const token = jwt.sign(payload,'secretKey');
                    res.status(200).send({token});
                }else{
                    res.status(500).send('password does not matched');
                }
            });
        }
    });
});

router.get('/events',(req,res)=>{
    eventModel.find({}).exec()
    .then(data=>{
        res.status(200).send(data);
    })
    .catch(err=>{
        res.status(500).send('No Event Found');
    })
})

router.post('/events',verifyToken,(req,res)=>{
    const event = new eventModel({
        EventDate: Date.now(),
        EventName: req.body.ename,
        EventDesc: req.body.edesc
    });
    event.save()
    .then(eventDetail=>{
        res.status(201).send(eventDetail);
    })
    .catch(err=>{
        res.status(500).send('Enter Valid Event Details');
    });
})

router.delete('/events/:id',(req,res)=>{
    eventModel.findByIdAndDelete(req.params.id).exec()
    .then(deletedData=>{
        res.status(200).json({message: 'Event got Deleted'});
    })
    .catch(err=>{
        res.status(500).json({message:'Cannot Delete this Item'});
    })
});

router.get('/events/:id',verifyToken, (req,res)=>{
    eventModel.findById(req.params.id).exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err=>{
        res.status(500).json({message: 'Error while getting the data'})
    })
})

module.exports = router;