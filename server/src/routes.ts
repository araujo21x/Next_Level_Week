import express from 'express';
const routes = express.Router();

routes.get('/', (request, response)=> {
    return response.send('Hello World');
});

export default routes;