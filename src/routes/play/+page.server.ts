import type { Actions } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		console.log(data);
	}
} satisfies Actions;
