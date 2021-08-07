import { Intents } from "discord.js";
import { join } from "path";

import Rizu from "#classes/Rizu";
import handleCommands from "#handlers/command";
import handleEvents from "#handlers/event";

const client = new Rizu({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES
	]
});

(async function (): Promise<void> {
	await handleCommands(join(__dirname, "commands"), client);
	await handleEvents(join(__dirname, "events"), client);
	await client.login(process.env.TOKEN);
})();
