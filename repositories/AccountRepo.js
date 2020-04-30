const Account = require('../models/Account');
const bcrypt = require('bcrypt');
const salt = 10;

module.exports.getMany = kw => new Promise( async (resolve, reject) => {
    try {
        const accounts = await Account.find({
            $or: [
                {
                    email: kw
                },
                {
                    fullName: {
                        $regex: kw,
                        $options: 'i'
                    }
                }
            ]
        }).select('-password');


        resolve(accounts);
    } catch(err) {
        reject(err);
    }
});

module.exports.getOne = _id => new Promise( async (resolve, reject) => {
    try {
        const account = await Account.findOne({_id}).select("-password");

        if (account) {
            resolve(account);
        } else {
            reject("No Account found");
        }
    } catch(err) {
        reject("Wrong id");
    }
});

module.exports.register = account => new Promise( async (resolve, reject) => {
    try {
        account.password = bcrypt.hashSync(account.password, salt);
        const createdAccount = await Account.create(account);

        if (createdAccount) {
            resolve(createdAccount);
        } else {
            reject("Fail to create");
        }
    } catch(err) {
        reject("Email has been taken");
    }
});

module.exports.login = (email, password) => new Promise( async (resolve, reject) => {
    try {
        const account = await Account.findOne({email});

        if (account) {
            if (bcrypt.compareSync(password, account.password)) {
                resolve(account);
            } else {
                reject("Wrong password!");
            }
        } else {
            reject("Wrong email!");
        }
    } catch(err) {
        reject(err);
    }
    
});

module.exports.update = (_id, data) => new Promise( async (resolve, reject) => {
    try {
        if (data.password) {
            if (data.newPassword) {
                const hashPassword = (await Account.findById({_id})).password;
                if (bcrypt.compareSync(data.password, hashPassword)) {
                    data.password = bcrypt.hashSync(data.newPassword, salt);
                } else {
                    return reject("Confirm password failed");
                }
            } else {
                return reject("Confirm password failed");
            }
        }
        
        const account = await Account.findOneAndUpdate({_id}, {$set: data}, {new: true});

        if (account) {
            resolve(account);
        } else {
            reject("Can not find account");
        }
    } catch(err) {
        reject(err);
    }
});
