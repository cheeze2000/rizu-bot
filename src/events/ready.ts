import type Rizu from "#classes/Rizu";
import type RizuEvent from "#types/RizuEvent";

export default class implements RizuEvent {
	name = "ready";

	async run(client: Rizu): Promise<void> {
		client.logger.ok(`${client.user?.tag} is online!`);
	}
}
