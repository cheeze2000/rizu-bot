import type Event from "#types/Event";
import type Rizu from "#classes/Rizu";

export default class implements Event {
	name = "ready";

	async run(client: Rizu): Promise<void> {
		client.logger.ok(`${client.user?.tag} is online!`);
	}
}
