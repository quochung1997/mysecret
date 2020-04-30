const express = require('express');
const router = express.Router();
const SubscriptionRepo = require('../repositories/SubscriptionRepo');
const {verifyMiddleWare} = require('./JWTVerification')

router.get('/all', verifyMiddleWare, (req, res) => {
    SubscriptionRepo.getMany('').then(subsciptions => {
        res.send(subsciptions);
    }, err => {
        res.status(400).send(err);
    });
});

router.get('/search/:kw', verifyMiddleWare, (req, res) => {
    SubscriptionRepo.getMany(req.params.kw).then(subscriptions => {
        res.send(subscriptions);
    }, err => {
        res.status(400).send(err);
    });
});

router.get('/account/:id', verifyMiddleWare, (req, res) => {
    SubscriptionRepo.getMany(req.params.id).then(subscriptions => {
        res.send(subscriptions);
    }, err => {
        res.status(400).send(err);
    });
});

router.get('/id/:id', verifyMiddleWare, (req, res) => {
    SubscriptionRepo.getOne(req.params.id).then(subscription => {
        res.send(subscription);
    }, err => {
        res.status(400).send(err);
    });
});

router.post('/add', verifyMiddleWare, (req, res) => {
    SubscriptionRepo.createOne(req._id, req.body).then(subscription => {
        res.send(subscription);
    }, err => {
        res.status(400).send(err);
    });
});

router.put('/:id', verifyMiddleWare, (req, res) => {
    SubscriptionRepo.update(req._id, req.params.id, req.body).then(subscription => {
        res.send(subscription);
    }, err => {
        res.status(400).send(err);
    });
});

router.delete('/:id', verifyMiddleWare, (req, res) => {
    SubscriptionRepo.remove(req._id, req.params.id).then(subscription => {
        res.send(subscription);
    }, err => {
        res.status(400).send(err);
    });
});

module.exports = router;
