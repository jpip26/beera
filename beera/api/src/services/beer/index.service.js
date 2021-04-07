import { Service } from 'moleculer';
import DbService from 'moleculer-db';
import SqlAdapter from 'moleculer-db-adapter-sequelize';

import dbConfig from '../../constants';
import types from './types';
import model from './model';

class BeerService extends Service {
  constructor(broker) {
    super(broker);

    this.parseServiceSchema({
      name: 'beer',
      mixins: [DbService],
      adapter: new SqlAdapter(dbConfig.NAME, dbConfig.USER, dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: 'postgres',
        ssl: dbConfig.SSL,
        dialectOptions: {
          ssl: dbConfig.SSL,
        },
      }),
      version: 1,
      settings: {
        graphql: {
          type: types,
        },
      },
      model,
      actions: {
        createBeer: {
          params: {
            name: 'string',
            drinkByDate: 'string',
          },
          graphql: {
            mutation: 'createBeer(name: String!, drinkByDate: String): Beer',
          },
          handler: this.createBeer,
        },
        find: {
          graphql: {
            query: 'beers: [Beer]',
          }
        },
        get: {
          graphql: {
            query: 'beer(id: String!): Beer',
          },
        },
        edit: {
          params: {
            beer: 'object',
          },
          graphql: {
            mutation: 'editBeer(beer: BeerInput!): Beer',
          },
          handler: this.editBeer,
        },
      },
      started: this.serviceStarted,
    });
  }

  async createBeer(context) {
    const brewdogBeer = await this.broker.call('v1.brewdog.find', {});
    return context.call('v1.beer.create', {
      name: context.params.name,
      drinkByDate: context.params.drinkByDate,
      description: brewdogBeer.description,
      imageUrl: brewdogBeer.image_url,
    });
  }

  editBeer(context) {
    return context.call('v1.beer.update', context.params.beer);
  }

  serviceStarted() {
    this.logger.info('Started Beer Service.');
  }
}

module.exports = BeerService;
