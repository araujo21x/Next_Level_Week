import express from 'express';

const app = express();

app.get('/user', (request,response)=>{
    response.status(200).json('Ola Mundo / Hello World');
});

app.listen(3000);