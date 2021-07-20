import type Rizu from "#classes/Rizu";

export default interface RizuEvent {
	name: string;
	run: (client: Rizu, ...args: unknown[]) => Promise<void>;
}
