import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {

    async creat(request: Request, response: Response) {

        const { name, email, whatsapp,
            latitude, longitude, city,
            uf, items
        } = request.body;

        const point = {
            image: request.file.filename, name,
            email, whatsapp, latitude,
            longitude, city, uf
        };

        const trx = await knex.transaction();

        const insertedIds = await trx('points').insert(point);

        const id_point = insertedIds[0];

        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((id_item: number) => {
                return {
                    id_item,
                    id_point
                }
            });
        await trx('point_items').insert(pointItems);

        await trx.commit();

        return response.json({
            id: id_point,
            ...point
        });
    };

    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.id_point')
            .whereIn('point_items.id_item', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        const serializedPoints = points.map(element => {
            return {
                ...element,
                image_url: `http://192.168.0.105:3000/uploads/${element.image}`,
            };
        });

        response.status(200).json(serializedPoints)


    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if (!point) return response.status(400).json({ message: 'POint not Found!' });

        const serializedPoints = {
            ...point,
            image_url: `http://192.168.0.105:3000/uploads/${point.image}`,
        };

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.id_item')
            .where('point_items.id_point', id).select('title');

        

        return response.status(200).json({ serializedPoints, items });
    }

}

export default PointsController;