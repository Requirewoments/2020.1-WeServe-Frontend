const requireDir = require('require-dir');
const {getClient} = require('./../utils/getClient');
const mongoose = require('mongoose');
requireDir('./../models');
const User = mongoose.model('User');
let client, db;

getClient().then(onfulfilled => { 
    client = onfulfilled;
    db = client.db('WeServe');
});

module.exports = {
    firstMessage(request, response) {
        return response.json('You are welcome!');
    },
    async read(request, response) {
        const user = await User.findById(request.params.id);
        return response.json(user);
    },
    async create(request, response) {
        const user = new User(request.body);
        
        try {
            await user.save();
            return response.send(`${user.name} created!\nData: ${user}`);
        } catch(error) {
            console.log(error);
        }
        //const user = await User.create(request.body);
        //return response.json(`${user.name} created!\nData: ${user}`);
    },
    async update(request, response) {
        const user = await User.findByIdAndUpdate(request.params.id, request.body, { new: true });
        return response.json(`User ${user.name} updated!`);
    },
    async delete(request, response){
        const user = await User.findByIdAndDelete(request.params.id);
        return response.json('User deleted!');
    }
}