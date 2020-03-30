const { Dev } = require('./../model');
const axios = require('axios');
require('dotenv').config();

const save = async (req, res) => {

    try {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if (dev) return res.status(400).send('Dev já existe no banco de dados');

        const resp = await axios.get(`https://api.github.com/users/${github_username}`);

        const { avatar_url, bio, name = login } = resp.data;
        const techsArray = techs.split(',').map(tech => tech.trim());
        const geolocation = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        dev = await Dev.create({
            name, github_username, avatar_url, bio, techs: techsArray, geolocation
        });

        return res.json(dev);
    } catch (error) {
        return res.send(error.message);
    }

}

const list = async (req, res) => {
    try {
        const devs = await Dev.find();
        return res.json(devs);

    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}

const search = async (req, res) => {
    try {
        const { techs, longitude, latitude } = req.query;
        const techsArray = stringToArray(techs);
        const maxDistance = process.env.MAX_DISTANCE;

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            geolocation: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: maxDistance
                },
            }
        });

        return res.json(devs);
    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}

const stringToArray = str => str.split(',').map(item => item.trim());

module.exports = {
    save, list, search
}