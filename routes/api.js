const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('unauthorized Request');
    } else {
        let token = req.headers.authorization.split(' ')[0].slice(6);
        if (token == 'null') {
            return res.status(401).send("unauthorized Request");
        } else {
            try {
                let payload = jwt.verify(token, "secretKey");
                req.userId = payload.subject;
                next();
            } catch (err) {
                return res.status(401).send(err);
            }
        }
    }
}

router.get('/', (req, res, next) => {
    res.send('From API Routes'); 
});

router.post('/register', (req, res) => {
    let userData = new userModel({
        email: req.body.email,
        password: req.body.password
    });
    userData.save((error, registeredUser) => {
        if (error) {
            console.log(error);
        } else {
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretKey')

            res.status(200).send({token});
        }
    });
});

router.post('/login', (req, res) => {
    let userData = req.body;
    userModel.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error);
        } else {
            if (!user) {
                res.status(401).send( 'Invalid User' );
            } else {
                if (user.password !== userData.password) {
                    res.status(401).send('password Doesn\'t matched');
                } else {
                    let payload = { subject: user._id };
                    const token = jwt.sign(payload,'secretKey')
                    res.status(200).send({token});
                }
            }
        }
    })
});

router.get('/events', (req, res) => {
    let events = [
        {
            '_id': 1,
            "name": "Auto Expo",
            "description": "lorem Ipsum",
            "date": "2012-04-23"
        },
        {
            '_id': 1,
            "name": "Auto Expo",
            "description": "lorem Ipsum",
            "date": "2012-04-23"
        },
        {
            '_id': 1,
            "name": "Auto Expo",
            "description": "lorem Ipsum",
            "date": "2012-04-23"
        },
        {
            '_id': 1,
            "name": "Auto Expo",
            "description": "lorem Ipsum",
            "date": "2012-04-23"
        }
    ]
    res.json(events);
});

router.get('/special',verifyToken, (req, res) => {
    let events = [
        {
            '_id': 1,
            "name": "Auto Expo",
            "description": "lorem Ipsum",
            "date": "2012-04-23"
        },
        {
            '_id': 1,
            "name": "Auto Expo",
            "description": "lorem Ipsum",
            "date": "2012-04-23"
        },
        {
            '_id': 1,
            "name": "Auto Expo",
            "description": "lorem Ipsum",
            "date": "2012-04-23"
        },
        {
            '_id': 1,
            "name": "Auto Expo",
            "description": "lorem Ipsum",
            "date": "2012-04-23"
        }
    ]
    res.json(events);
});



module.exports = router;