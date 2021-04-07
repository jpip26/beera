import { Service } from 'moleculer';
import ApiGateway from 'moleculer-web';
import { ApolloService } from 'moleculer-apollo-server';
import SocketIOService from 'moleculer-io';

class GatewayService extends Service {
	constructor(broker) {
		super(broker);

		this.parseServiceSchema({
			name: 'api',
			mixins: [
				ApiGateway,
				SocketIOService,
				ApolloService({
					typeDefs: ``,
					resolvers: {},
					routeOptions: {
						path: '/graphql',
						mappingPolicy: 'all',
					},
					serverOptions: {
						tracing: true,
						engine: { apiKey: process.env.APOLLO_ENGINE_KEY },
					},
				}),
			],
			settings: {
				cors: {
					origin: process.env.CLIENT_URL,
				},
				port: process.env.PORT || 3002,
				ip: '0.0.0.0',
				routes: [{
					path: '/api',
					whitelist: ['**'],
					bodyParsers: {
						json: {
							strict: false,
							limit: '1MB',
						},
						urlencoded: {
							extended: true,
							limit: '1MB',
						},
					},
				}],
				assets: {
					folder: 'public',
					options: {},
				},
			},
			started: this.serviceStarted,
		});
	}

	serviceStarted() {
		this.logger.info('GatewayService has started.');
	}
}

module.exports = GatewayService;
