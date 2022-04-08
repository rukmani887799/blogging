
export default {
	actions: {
		startConnectome({ commit, dispatch, state }) {
			const port: number = import.meta.env.VITE_PORT || 7780;
			//@ts-ignore
			const endpoint: string =
				import.meta.env.VITE_ENDPOINT ||
				(location.protocol.includes('https') && location.port
					? `wss://${location.hostname}:${port}`
					: undefined);
			const protocol = 'dmtapp/meet';

			
			commit('socket', new Socket());
		}
	}
};
