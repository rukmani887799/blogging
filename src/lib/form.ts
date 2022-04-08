
export function enhance(
	form: HTMLFormElement,
	{
		pending,
		error,
		result
	}: {
		pending?: (payload: FormData, form?: HTMLFormElement) => void | boolean;
		error?: (error: string, form?: HTMLFormElement) => void;
		result: (data, payload?: FormData, form?: HTMLFormElement) => void;
	},
	submitNow = false
) {
	let current_token: {};

	async function handle_submit(e?: Event) {
		e?.preventDefault();
		const token = (current_token = {});
		let canContinue = true;

		let body: any = new FormData(form);

		form.querySelectorAll('[mutiple-select]').forEach((select: HTMLInputElement) => {
			const name = select.dataset.name;
			const value = select.dataset.value;
			body.append(name, value);
		});

		const method = form.method.toLowerCase();

		if (form.dataset.type == 'json') {
			body = Object.fromEntries(body);
		}
		//@ts-ignore
		if (pending) canContinue = pending(body, form);
		if (canContinue === false) return;
		console.log('method', method);

		try {
			const res = await fetch(form.dataset.action, {
				method: method,
				headers: {
					accept: 'application/json'
				},
				body
			});
			console.log('res', res);

			if (token !== current_token) return;
			const data = await res.json();
			if (res.ok) {
				result(data, body, form);
			} else if (error) {
				error(data, null);
			} else {
				console.error(await res);
			}
		} catch (e) {
			if (error) {
				error(null, e);
			} else {
				throw e;
			}
		}
	}

	if (submitNow) {
		handle_submit();
	} else form.addEventListener('submit', handle_submit);

	return {
		destroy() {
			if (!submitNow) form.removeEventListener('submit', handle_submit);
		}
	};
}
