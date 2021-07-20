import { join } from "path";
import { readdirSync } from "fs";

export default function* traverse(dir: string): Generator<string> {
	const contents = readdirSync(dir, { withFileTypes: true });

	for (const x of contents) {
		const url = join(dir, x.name);
		if (x.isDirectory()) yield* traverse(url);
		else if (x.isFile()) yield url;
	}
}
