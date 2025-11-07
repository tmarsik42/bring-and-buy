import { fail, redirect } from '@sveltejs/kit';
import mariadb from 'mariadb';
import crypto from 'crypto';

const pool = mariadb.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
const COOKIE_SECRET = process.env.COOKIE_SECRET!;

function sign(value: string) {
	const hmac = crypto.createHmac('sha256', COOKIE_SECRET);
	hmac.update(value);
	return `${value}.${hmac.digest('hex')}`;
}

function verify(signed: string) {
	const parts = signed.split('.');
	if (parts.length !== 2) return null;
	const [value, sig] = parts;
	const hmac = crypto.createHmac('sha256', COOKIE_SECRET);
	hmac.update(value);
	if (sig === hmac.digest('hex')) return value;
	return null;
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const password = data.get('password')?.toString();

		if (password !== ADMIN_PASSWORD) {
			return fail(401, { error: 'Invalid password' });
		}

		const signed = sign('admin');
		cookies.set('admin', signed, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
			maxAge: 60 * 60 * 2
		});

		throw redirect(303, '/prehled');
	}
};

export const load = async ({ cookies }) => {
	const signed = cookies.get('admin');
	const value = signed ? verify(signed) : null;

	if (value !== 'admin') return { loggedIn: false };

	const conn = await pool.getConnection();
	try {
		const users = await conn.query(`
            SELECT p.user_id, u.contact_email AS email, p.name AS product, p.category, p.defects
            FROM users u
                     LEFT JOIN products p ON u.id = p.user_id
            ORDER BY u.contact_email, p.created_at
        `);

		const grouped = users.reduce((acc: Record<string, unknown[]>, row) => {
			if (!acc[row.email]) acc[row.email] = [];
			if (row.product) acc[row.email].push(row);
			return acc;
		}, {});

		return { loggedIn: true, grouped };
	} finally {
		conn.release();
	}
};
