import type { Message, Snowflake } from "discord.js";

import type Rizu from "#classes/Rizu";
import type RizuEvent from "#types/RizuEvent";

export default class implements RizuEvent<"messageCreate"> {
	name = "messageCreate";

	async run(client: Rizu, message: Message): Promise<void> {
		if (message.author.id != "402027995021443073") return;

		const { content } = message;
		if (!content.startsWith(".deploy")) return;

		const guildId = content.split(" ")[1] as Snowflake;
		const guild = client.guilds.cache.get(guildId);
		guild?.commands.set([...client.commands.values()]);
	}
}
