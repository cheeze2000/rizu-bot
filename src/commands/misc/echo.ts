import type { Interaction } from "discord.js";

import type Command from "#types/Command";
import type Rizu from "#classes/Rizu";

export default class implements Command {
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
		if (interaction.isCommand()) {
			const message = interaction.options.getString("message");
			await interaction.reply(message!);
		}
	}
}
