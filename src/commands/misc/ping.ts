import type { Interaction } from "discord.js";

import type Command from "#types/Command";
import type Rizu from "#classes/Rizu";

export default class implements Command {
	name = "ping";
	description = "replies with pong";

	async run(client: Rizu, interaction: Interaction): Promise<void> {
		if (interaction.isCommand()) {
			await interaction.reply("pong");
		}
	}
}
