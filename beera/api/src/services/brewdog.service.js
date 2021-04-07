import axios from 'axios';
import { Service } from 'moleculer';

class BrewdogService extends Service {
  constructor(broker) {
    super(broker);

    this.parseServiceSchema({
      name: 'brewdog',
      version: 1,
      actions: {
        find: {
          params: {},
          handler: this.findRandomBeer,
        },
      },
      started: this.serviceStarted,
    });
  }

  serviceStarted() {
    this.logger.info('Started Brewdog Service.');
  }

  async findRandomBeer() {
    const { data } = await axios.get('https://api.punkapi.com/v2/beers/random');
    return data[0];
  }
}

module.exports = BrewdogService;
