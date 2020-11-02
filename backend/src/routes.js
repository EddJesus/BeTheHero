const express = require("express");
const { celebrate, Segments, Joi } = require('celebrate')

const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();


//ROTAS 

    //ROTA sessions

    routes.post('/sessions', SessionController.create)


    //ROTA ongs

    routes.post('/ongs' , celebrate({ //chamada da função celebrate para fazer as validações
        //por receber um objeto javascript é necessário declarar dentro de colchetes e passar o parms q vc quer, no caso BODY
        [Segments.BODY]: Joi.object().keys({  //chamada da função object() por ser um objeto. E chamada da função keys() passando o parâmetros que essa vai receber em formato de objeto
            name: Joi.string().required(), //validações pelas chamadas string() que diz q ele deve ser uma string, pela required() que diz q ele é obrigatório e pela min(n) que fala o número minimo de caracteres dessa string
            email: Joi.string().required().email(), // ##      ##       ##     ...   ##  e pela chamada email() que diz que ele deve ter o formato de email
            whatsapp: Joi.number().required().min(10).max(11),
            city: Joi.string().required(),
            uf: Joi.string().required().length(2), // ##        ##       ##     .... ## e pela chamada length(n) que diz que ele deve ter n numéro de caracteres
        })
    }), OngController.create);

    routes.get('/ongs', OngController.index);


    //ROTA profile

    routes.get('/profile', celebrate({
        //por receber um objeto javascript é necessário declarar dentro de colchetes e passar o parms q vc quer, no caso HEADERS
        [Segments.HEADERS]: Joi.object({ //chamada da função object é diferente no HEADERS pois não se passa a key, mas sim o objeto dentro do object ...
            authorization: Joi.string().required()
        }).unknown() // ... e passa a função unknown

    }), ProfileController.index);


    //ROTA incidents

    routes.get('/incidents', celebrate({
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number()
        })
    }), IncidentController.index);

    routes.get('/incidents/:id', celebrate({
        [Segments.QUERY]: Joi.object().keys({
            id: Joi.number()
        })
    }), IncidentController.get);

    routes.post('/incidents', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required
        }), 
        [Segments.BODY]: Joi.object().keys({  
            title: Joi.string().required(), 
            description: Joi.string().required(), 
            value: Joi.number().required(),
        }),
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
        }).unknown()
    }),IncidentController.create);

    routes.delete('/incidents/:id', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        })
    }), IncidentController.delete);

    module.exports = routes;