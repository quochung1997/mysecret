const Subscription = require('../models/Subscription');

module.exports.getMany = kw => new Promise(async (resolve, reject) => {
    try {
        const subscriptions = await Subscription.find({
            $or: [
                {
                    title: {
                        $regex: kw,
                        $options: 'i'
                    }
                },
                {
                    desciption: {
                        $regex: kw,
                        $options: 'i'
                    }
                },
            ]
        });

        resolve(subscriptions);
    } catch (err) {
        reject(err);
    }
});

module.exports.getOne = _id => new Promise(async (resolve, reject) => {
    try {
        const subscription = await Subscription.findOne({ _id });

        if (subscription) {
            resolve(subscription);
        } else {
            reject("No Subscription found");
        }
    } catch (err) {
        reject("Wrong id");
    }
});

module.exports.getManyByAccount = accountId => new Promise(async (resolve, reject) => {
    try {
        const subscriptions = await Subscription.find({ ownerAccountId: accountId });

        if (subscriptions) {
            resolve(subscriptions);
        } else {
            reject("No Subscription found");
        }
    } catch (err) {
        reject("Wrong id");
    }
});

module.exports.getListSubscribes = listId => new Promise(async (resolve, reject) => {
    try {
        const query = listId.map(_id => {
            return { _id }
        });

        const subscriptions = await Subscription.find({ $or: query });

        if (subscriptions) {
            resolve(subscriptions);
        } else {
            reject("No Subscription found");
        }
    } catch (err) {
        reject("Wrong id");
    }
});

module.exports.createOne = (_id, subscription) => new Promise(async (resolve, reject) => {
    try {
        subscription.ownerAccountId = _id;

        const createdSubscription = await Subscription.create(subscription);

        return resolve(createdSubscription);

    } catch (err) {
        return reject("Can not create subscription");
    }
});

module.exports.update = (accountId, _id, data) => new Promise(async (resolve, reject) => {
    try {
        const { ownerAccountId } = await Subscription.findById({ _id });

        if (ownerAccountId != accountId) {
            return reject("Permission denied");
        }
    } catch (err) {
        return reject("Wrong subscription id");
    }

    try {
        const subscription = await Subscription.findOneAndUpdate({ _id }, { $set: data }, { new: true });

        return resolve(subscription);
    } catch (err) {
        return reject("Can not update");
    }
});

module.exports.remove = (accountId, _id) => new Promise(async (resolve, reject) => {
    try {
        const { ownerAccountId } = await Subscription.findById({ _id });

        if (ownerAccountId != accountId) {
            return reject("Permission denied");
        }
    } catch (err) {
        return reject("Wrong subscription id");
    }

    try {
        const subscription = await Subscription.findByIdAndRemove({ _id });
        return resolve(subscription);
    } catch (err) {
        return reject("Can not delete");
    }
});
