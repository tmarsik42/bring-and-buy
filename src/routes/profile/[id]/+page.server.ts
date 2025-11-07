import mariadb from 'mariadb';
import { error } from '@sveltejs/kit';

const pool = mariadb.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

export const load = async ({ params }) => {
	const userId = params.id;

	const conn = await pool.getConnection();
	try {
		const user = await conn.query(`SELECT contact_email FROM users WHERE id = ?`, [userId]);

		if (user.length === 0) throw error(404, 'User not found');

		const products = await conn.query(
			`SELECT name, category, defects, created_at
             FROM products
             WHERE user_id = ?
             ORDER BY created_at`,
			[userId]
		);

		return {
			user: user[0],
			products
		};
	} finally {
		conn.release();
	}
};
