import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: 'password',
  database: 'todosdb',
  port: 5432,
});
