import type Rizu from "#classes/Rizu";

export default interface Event {
	name: string;
	run: (client: Rizu, ...args: unknown[]) => Promise<void>;
}
