export default class {
	err(...values: unknown[]): void {
		// eslint-disable-next-line
		console.error(...values);
	}

	ng(...values: unknown[]): void {
		// eslint-disable-next-line
		console.error("[NG]", ...values);
	}

	ok(...values: unknown[]): void {
		// eslint-disable-next-line
		console.log("[OK]", ...values);
	}
}
