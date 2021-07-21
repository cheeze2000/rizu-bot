import type { ClientEvents } from "discord.js";

import type Rizu from "#classes/Rizu";

export default interface RizuEvent<K extends keyof ClientEvents> {
	name: string;
	run: (client: Rizu, ...args: ClientEvents[K]) => Promise<void>;
}
