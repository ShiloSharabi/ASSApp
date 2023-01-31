import { Pool } from 'pg';
import { DB_CONFIGURATION } from 'src/configuration/db.configuration';

/**
 * initializing db instance
 */
const pool = new Pool(DB_CONFIGURATION.db);

/**
 * executing singl query
 * @param query query string
 * @param param query param
 * @returns found record
 */
export const query = async (query: string, param) => {
    const { rows, fields } = await pool.query(query, param);

    return rows;
}