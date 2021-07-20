import { Client } from "discord.js";
import type { ClientOptions } from "discord.js";

import Logger from "#classes/Logger";
import type RizuCommand from "#types/RizuCommand";

export default class extends Client {
	commands: Map<string, RizuCommand>;
	logger: Logger;

	constructor(opts: ClientOptions) {
		super(opts);
		this.commands = new Map();
		this.logger = new Logger();
	}
}
