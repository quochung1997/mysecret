const express = require('express');
const router = express.Router();
const { getMany, getOne, register, login, update} = require('../repositories/AccountRepo');
const {verifyMiddleWare, getToken} = require('./JWTVerification');

router.get('/search/:kw', verifyMiddleWare, (req, res) => {
    getMany(req.params.kw).then(accounts => {
        res.send(accounts);
    }, err => {
        res.status(400).send(err);
    });
});


router.get('/all', verifyMiddleWare, (req, res) => {
    getMany("").then(accounts => {
        res.send(accounts);
    }, err => {
        res.status(400).send(err);
    });
});

router.get('/id/:id', verifyMiddleWare, (req, res) => {
    getOne(req.params.id).then(accounts => {
        res.send(accounts);
    }, err => {
        res.status(400).send(err);
    });
});

router.post('/register', (req, res) => {
    register(req.body).then(account => {
        res.header('auth-token', getToken(account._id))
            .send(account);
    },err => {
        res.status(400).send(err);
    });
});

router.post('/login', (req, res) => {
    const {email, password} = req.body;
    login(email, password).then(account => {
        res.header('auth-token', getToken(account._id))
            .send(account);
    },err => {
        res.status(400).send(err);
    });
});

router.put('/', verifyMiddleWare, (req, res) => {
    update(req._id, req.body).then(account => {
        res.send(account);
    },err => {
        res.status(400).send(err);
    });
});


module.exports = router;
