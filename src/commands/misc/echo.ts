import type { Interaction } from "discord.js";

import type Rizu from "#classes/Rizu";
import type RizuCommand from "#types/RizuCommand";

export default class implements RizuCommand {
	name = "echo";
	description = "echoes the message back";
	options = [
		{
			type: "STRING" as const,
			name: "message",
			description: "echoes the message back",
			required: true
		}
	];

	async run(client: Rizu, interaction: Interaction): Promise<void> {
		if (!interaction.isCommand()) return;

		const message = interaction.options.getString("message");
		await interaction.reply(message!);
	}
}
