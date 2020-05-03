const SubscriptionEvent = require('../models/SubscriptionEvent');
const { checkEventWrite, checkEventCreate } = require('./PermissionHelper');


module.exports.getMany = kw => new Promise(async (resolve, reject) => {
    try {
        const subscriptionEvents = await SubscriptionEvent.find({
            $or: [
                {
                    title: {
                        $regex: kw,
                        $options: 'i'
                    }
                },
                {
                    location: {
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

        resolve(subscriptionEvents);
    } catch (err) {
        reject(err);
    }
});

module.exports.getOne = _id => new Promise(async (resolve, reject) => {
    try {
        const subscriptionEvent = await SubscriptionEvent.findOne({ _id });

        if (subscriptionEvent) {
            resolve(subscriptionEvent);
        } else {
            reject("No Subscription Event found");
        }
    } catch (err) {
        reject("Wrong id");
    }
});

module.exports.getManyBySubscription = subscriptionId => new Promise(async (resolve, reject) => {
    try {
        const subscriptionEvent = await SubscriptionEvent.find({
            ownerSubscriptionId: subscriptionId
        });

        if (subscriptionEvent) {
            resolve(subscriptionEvent);
        } else {
            reject("No Subscription Event found");
        }
    } catch (err) {
        reject("Wrong id");
    }
});

module.exports.create = (accountId, event) => new Promise(async (resolve, reject) => {
    try {
        if (event.ownerSubscriptionId) {
            if (await checkEventCreate(event.ownerSubscriptionId, accountId)) {
                const createdEvent = await SubscriptionEvent.create(event);

                return resolve(createdEvent);
            }
        }

        return reject('Can not create event');

    } catch (err) {
        console.log(err);
        return reject("Can not create event");
    }
});

module.exports.update = (accountId, _id, data) => new Promise(async (resolve, reject) => {
    try {
        if (await checkEventWrite(_id, accountId)) {
            const subscriptionEvent = await SubscriptionEvent.findOneAndUpdate({ _id }, { $set: data }, { new: true });
            return resolve(subscriptionEvent);
        } else {
            return reject('Event does not belong to account to delete');
        }
    } catch (err) {
        return reject("Can not update");
    }
});

module.exports.remove = (accountId, _id) => new Promise(async (resolve, reject) => {
    try {
        if (await checkEventWrite(_id, accountId)) {
            const subscriptionEvent = await SubscriptionEvent.findByIdAndRemove({ _id });
            return resolve(subscriptionEvent);
        } else {
            return reject('Event not belong to account to delete');
        }
    } catch (err) {
        return reject("Can not delete");
    }
});