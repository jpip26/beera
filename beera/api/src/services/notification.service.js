import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Service } from 'moleculer';

dayjs.extend(relativeTime);

const BEER_NOTIFICATION_INTERVAL = 60000;

class NotificationService extends Service {
  constructor(broker) {
    super(broker);

    this.parseServiceSchema({
      name: 'notification',
      version: 1,
      settings: {
        $dependencyTimeout: 30000,
      },
      dependencies: [
        { name: 'beer', version: 1 },
      ],
      started: this.serviceStarted,
      stopped: this.serviceStopped,
    });
  }

  serviceStarted() {
    this.intervalHandler = setInterval(async () => {
      const overdueBeers = await this.findOverdueBeers();
      overdueBeers.map((beer) => {
        const beerDueTime = dayjs(beer.drinkByDate).from(dayjs());
        this.sendBroadcast('overdueBeer', {
          beerId: beer.id,
          message: `${beer.name} was meant to be drunk ${beerDueTime}`,
        });
      });
    }, BEER_NOTIFICATION_INTERVAL);
  }

  serviceStopped() {
    clearInterval(this.intervalHandler);
  }

  sendBroadcast(event, data) {
    this.broker.call('api.broadcast', {
      namespace: '/',
      event,
      args: [data],
    });
  }

  async findOverdueBeers() {
    const beers = await this.broker.call('v1.beer.find', {});
    const beersWithExpiry = beers.filter((beer) => beer.drinkByDate && beer.status !== 'DRUNK');
    return beersWithExpiry.filter((beer) => dayjs(beer.drinkByDate).isBefore(dayjs()));
  }
}

module.exports = NotificationService;
