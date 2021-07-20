import type { Interaction } from "discord.js";

import type Rizu from "#classes/Rizu";
import type RizuCommand from "#types/RizuCommand";

export default class implements RizuCommand {
	name = "ping";
	description = "replies with pong";

	async run(client: Rizu, interaction: Interaction): Promise<void> {
		if (interaction.isCommand()) {
			await interaction.reply("pong");
		}
	}
}
