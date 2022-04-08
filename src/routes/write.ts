import * as db from '$lib/db';
import type { RequestEvent } from '@sveltejs/kit';
export async function get(event: RequestEvent) {
	// const blogs = await db.state();
	return {
		body: {}
	};
}

export async function post(event: RequestEvent) {
	const data = await event.request.json();
	console.log(data);
	const pathname = await db.put(data.title, data.content);
	return {
		body: { pathname }
	};
}
