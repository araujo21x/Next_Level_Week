import knex from 'knex';
import path from 'path';

const connection = knex({
    client: 'sqlit3',
    connection:{
        filename: path.resolve(__dirname, 'datavase.sqlite'),
    },
});

export default connection