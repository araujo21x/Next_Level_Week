import express from 'express';
import PointsController from './controller/pointsController';
import ItemsController from './controller/ItemsController';
import multer from 'multer';
import configMulter from './config/multer';
import { celebrate, Joi } from 'celebrate';


const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

routes.post('/points',
    multer(configMulter).single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required()
        })
    },{
        abortEarly: false
    }
    ),
    pointsController.creat
);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

export default routes;