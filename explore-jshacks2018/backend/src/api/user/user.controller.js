const BaseController = require('../common/base.controller');
const User = require('../../models/user').model;
const PythonShell = require('python-shell').PythonShell;

const findByCb = function (req) {
    return { email: req.params.email }
};

const userController = new BaseController(User, findByCb);

function getUserWithToken (req, res) {
    res.json(req.user);
}

function getRecommendedEvents (req, res) {
    const scriptPath = 'scripts/helloworld.py';

    let pyshell = new PythonShell(scriptPath);

    pyshell.on('message', function (data) {
        res.write(data);
        res.end('end');
    });
}

module.exports = {
    get: userController.get(),
    getOne: userController.getOne(),
    create: userController.create(),
    update: userController.update(),
    remove: userController.remove(),
    getUserWithToken: getUserWithToken,
    getRecommendedEvents: getRecommendedEvents,
};