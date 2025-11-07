import { fail } from '@sveltejs/kit';
import mariadb from 'mariadb';
import { randomUUID } from 'crypto';

const pool = mariadb.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const email = data.get('email')?.toString().trim();
		const phone = data.get('phone')?.toString().trim() || null;
		const productName = data.get('productName')?.toString().trim();
		const category = data.get('category')?.toString();
		const defects = data.get('defects')?.toString().trim() || null;

		if (!email || !productName || !category) {
			return fail(400, { error: 'Missing required fields.' });
		}

		const conn = await pool.getConnection();

		try {
			let userId;
			const user = await conn.query(`SELECT id FROM users WHERE contact_email = ?`, [email]);

			if (user.length === 0) {
				userId = randomUUID();
				await conn.query(
					`INSERT INTO users (id, contact_email, contact_phone)
                     VALUES (?, ?, ?)`,
					[userId, email, phone]
				);
			} else {
				userId = user[0].id;

				if (phone) {
					await conn.query(`UPDATE users SET contact_phone = ? WHERE id = ?`, [phone, userId]);
				}
			}

			if (category === 'clothing') {
				const count = await conn.query(
					`SELECT COUNT(*) as c
                     FROM products
                     WHERE user_id = ? AND category = 'clothing'`,
					[userId]
				);

				if (count[0].c >= 3) {
					return fail(400, { error: 'You have reached the clothing item limit.' });
				}
			}

			await conn.query(
				`INSERT INTO products (name, category, defects, user_id, created_at)
                 VALUES (?, ?, ?, ?, NOW())`,
				[productName, category, defects, userId]
			);
		} finally {
			conn.release();
		}

		return { success: true };
	}
};
