import type { ApplicationCommandData, Interaction } from "discord.js";

import type Rizu from "#classes/Rizu";

export default interface RizuCommand extends ApplicationCommandData {
	run: (client: Rizu, interaction: Interaction) => Promise<void>;
}
