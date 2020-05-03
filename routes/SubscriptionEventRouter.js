const express = require('express');
const router = express.Router();
const SubscriptionEventRepo = require('../repositories/SubscriptionEventRepo');
const { verifyMiddleWare } = require('./JWTVerification');


router.get('/all', verifyMiddleWare, (req, res) => {
    SubscriptionEventRepo.getMany('').then(subsciptions => {
        res.send(subsciptions);
    }, err => {
        res.status(400).send(err);
    });
})

router.get('/search/:kw', verifyMiddleWare, (req, res) => {
    SubscriptionEventRepo.getMany(req.params.kw).then(subscriptionEvents => {
        res.send(subscriptionEvents);
    }, err => {
        res.status(400).send(err);
    });
});

router.get('/subscription/:id', verifyMiddleWare, (req, res) => {
    SubscriptionEventRepo.getManyBySubscription(req.params.id).then(subscriptionEvents => {
        res.send(subscriptionEvents);
    }, err => {
        res.status(400).send(err);
    });
});

router.get('/id/:id', verifyMiddleWare, (req, res) => {
    SubscriptionEventRepo.getOne(req.params.id).then(subscriptionEvent => {
        res.send(subscriptionEvent);
    }, err => {
        res.status(400).send(err);
    });
});

router.post('/', verifyMiddleWare, (req, res) => {
    SubscriptionEventRepo.create(req._id, req.body).then(subscriptionEvent => {
        res.send(subscriptionEvent);
    }, err => {
        res.status(400).send(err);
    });
});

router.put('/:id', verifyMiddleWare, (req, res) => {
    SubscriptionEventRepo.update(req._id, req.params.id, req.body).then(subscriptionEvent => {
        res.send(subscriptionEvent);
    }, err => {
        res.status(400).send(err);
    });
});

router.delete('/:id', verifyMiddleWare, (req, res) => {
    SubscriptionEventRepo.remove(req._id, req.params.id).then(subscriptionEvent => {
        res.send(subscriptionEvent);
    }, err => {
        res.status(400).send(err);
    });
});

module.exports = router;
