import { Client } from "discord.js";
import type { ClientOptions } from "discord.js";

import type Command from "#types/Command";
import Logger from "#classes/Logger";

export default class extends Client {
	commands: Map<string, Command>;
	logger: Logger;

	constructor(opts: ClientOptions) {
		super(opts);
		this.commands = new Map();
		this.logger = new Logger();
	}
}
