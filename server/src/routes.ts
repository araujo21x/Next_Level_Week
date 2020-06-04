import express from 'express';
import PointsController from './controller/pointsController';
import ItemsController from './controller/ItemsController';

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

routes.post('/points', pointsController.creat);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

export default routes;