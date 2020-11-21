const requireDir = require('require-dir');
requireDir('./../models');

const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
    firstMessage(request, response) {
        return response.json('You are welcome!');
    },
    async read(request, response) {
        const user = await User.findById(request.params.id);
        return response.json(user);
    },
    async create(request, response) {
        const user = await User.create(request.body);
        return response.json(`${user.name} created!`);
    },
    async update(request, response) {
        const user = await User.findByIdAndUpdate(request.params.id, request.body, { new: true });
        return response.json(`User ${user.name} updated!`);
    },
    async delete(request, response){
        const user = await User.findByIdAndRemove(request.params.id);
        return response.json('User deleted!');
    }
}