import { relative, resolve } from "path";

import {
	EVENT_ERROR,
	IMPORT_FAILURE,
	IMPORT_SUCCESS
} from "#responses/handlers";
import type Rizu from "#classes/Rizu";
import traverse from "#utils/misc/traverse";

export default async function (dir: string, client: Rizu): Promise<void> {
	const parentDir = resolve(dir, "..");

	for (const file of traverse(dir)) {
		try {
			const event = new (await import(file)).default;

			client.on(event.name, async function (...args) {
				try {
					await event.run(client, ...args);
				} catch (err) {
					client.logger.ng(EVENT_ERROR, event.name);
					client.logger.err(err);
				}
			});

			client.logger.ok(IMPORT_SUCCESS, relative(parentDir, file));
		} catch (err) {
			client.logger.ng(IMPORT_FAILURE, relative(parentDir, file));
		}
	}
}
