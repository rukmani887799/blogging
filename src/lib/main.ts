import { writable } from 'svelte/store';

function createSnackStore() {
	const { subscribe, update, set } = writable(null);

	return {
		subscribe,
		show: (value: string, timeout = 3000) =>
			update(() => {
				setTimeout(() => set(null), timeout);
				return value;
			})
	};
}

export default {
	noStore: ['snack'],
	state: {
		content: '',
		title: '',
		snack: createSnackStore()
	}
};
