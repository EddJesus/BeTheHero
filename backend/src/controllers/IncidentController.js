const connection = require('../database/connection');

module.exports = {
    async create(req, res){
        const title = req.body.title;
        const description = req.body.description;
        const value = req.body.value;
        const ong_id = req.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return res.json({ id });
    },

    async index(req, res){
        const { page = 1 } = req.params;

        const totalincidents = await connection('incidents')
        .count();

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1 ) * 5)
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf']);

        res.header('X-Total-Count', totalincidents['count(*)']);

        return res.json(incidents);
    },

    async delete(req, res){
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        if(ong_id != incident.ong_id ){
            res.status(401).json({ error: 'Operation not permitted'});
        }else{
            await connection('incidents').where('id', id).delete();
            return res.status(204).send();
        }
        

        

    }
}