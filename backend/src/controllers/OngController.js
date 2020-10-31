const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

    async create(req, res) {
        const name = req.body.name;
        const email = req.body.email;
        const city = req.body.city;
        const whatsapp = req.body.whatsapp;
        const uf = req.body.uf;
    
        const id = crypto.randomBytes(4).toString('HEX');
    
        await connection('ongs').insert({
            id,
            name,
            email,
            city,
            whatsapp,
            uf
        })
    
        return res.json({ id });
    },

    async index(req, res){
        const ongs = await connection('ongs').select('*');
    
        return res.json({ ongs })
    }
}