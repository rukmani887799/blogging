import Hyperbee from 'hyperbee';
import Hypercore from 'hypercore';

const core = new Hypercore('./.db');
core.ready().then(() => {
	console.log({ dbKey: core.key });
});

export const db = new Hyperbee(core, {
	keyEncoding: 'utf-8',
	valueEncoding: 'json'
});

export const state = async () => {
	let state = [];
	for await (const {
		key,
		value: { title }
	} of db.createReadStream()) {
		state.push({ pathname: key, title });
	}
	console.log({ db: state });
	return state || [];
};

export const put = async (title: string, body: string) => {
	const content = { title, body };
	const matches = title.match(/[\w]+/g);
	if (!matches) return;
	const pathname = matches.join('-');
	await db.put(pathname, content);
	return pathname;
};
export const get = async (title: string) => {
	const item = await db.get(title);
	if (!item) return;
	return { content: item.value.body, title: item.value.title, pathname: item.key };
};
const del = async (title: string) => {
	await db.del(title);
};
