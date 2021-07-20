import { relative, resolve } from "path";

import {
	COMMAND_ERROR,
	IMPORT_FAILURE,
	IMPORT_SUCCESS
} from "#responses/handlers";
import type Rizu from "#classes/Rizu";
import traverse from "#utils/misc/traverse";

export default async function (dir: string, client: Rizu): Promise<void> {
	const parentDir = resolve(dir, "..");

	for (const file of traverse(dir)) {
		try {
			const command = new (await import(file)).default;
			client.commands.set(command.name, command);
			client.logger.ok(IMPORT_SUCCESS, relative(parentDir, file));
		} catch (err) {
			client.logger.ng(IMPORT_FAILURE, relative(parentDir, file));
		}
	}

	client.on("interactionCreate", async interaction => {
		if (!interaction.isCommand()) return;

		const name = interaction.commandName;
		try {
			await client.commands.get(name)?.run(client, interaction);
		} catch (err) {
			client.logger.ng(COMMAND_ERROR, name);
			client.logger.err(err);
		}
	});
}
