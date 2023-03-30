import { invalid, redirect } from '@sveltejs/kit';
import { createUser } from '$lib/user.model';

export const actions = {
	default: async (event) => {
		const formData = Object.fromEntries(await event.request.formData());

		// Verify that we have an email and a password
		if (!formData.email || !formData.password) {
			return invalid(400, {
				error: 'Missing email or password'
			});
		}

		const { email, password } = formData;

		// Create a new user
		const { error } = await createUser(email, password);

		// If there was an error, return an invalid response
		if (error) {
			return invalid(500, {
				error
			});
		}

		// Redirect to the login page
		throw redirect(302, '/login');
	}
};
