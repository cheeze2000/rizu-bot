import type { Message, Snowflake } from "discord.js";

import type Event from "#types/Event";
import type Rizu from "#classes/Rizu";

export default class implements Event {
	name = "messageCreate";

	async run(client: Rizu, arg0: unknown): Promise<void> {
		const message = arg0 as Message;
		if (message.author.id != "402027995021443073") return;

		const { content } = message;
		if (!content.startsWith(".deploy")) return;

		const guildId = content.split(" ")[1] as Snowflake;
		const guild = client.guilds.cache.get(guildId);
		guild?.commands.set([...client.commands.values()]);
	}
}
