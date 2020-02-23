const User = require('../models/User');
const handler = require('../errorHandler');

module.exports.getAll = async function(req, res) {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (e) {
        handler.catch(res, e);
    }
};

module.exports.getById = async function(req, res) {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (e) {
        handler.catch(res, e);
    }
};

module.exports.update = async function(req, res) {
    try {
        const updated = req.body;

        const user = await User.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: updated
        }, {
            new: true
        })
        res.status(200).json(user)


    } catch (e) {
        handler.catch(res, e);
    }
};

module.exports.getTopSponsors = async function(req, res) {
    try {
        const user = await User.find();
        const sponsors = user.totalDonations.sort((a, b) => (a - b));

        res.status(200).json(sponsors);
    } catch (e) {
        handler.catch(res, e);
    }
};

module.exports.delete = async function(req, res) {
    try {
        await User.remove({
            _id: req.params.id,
        });
        res.status(200).json({
            message: 'user was deleted',
        });
    } catch (e) {
        handler.catch(res, e);
    }
};