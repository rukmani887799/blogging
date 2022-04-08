import * as db from '$lib/db';

export async function get() {
	const blogs = await db.state();

	return {
		body: { blogs }
	};
}
