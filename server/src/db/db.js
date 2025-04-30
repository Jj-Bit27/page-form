import { createPool } from 'mysql2/promise'

export const pool = createPool({
  host: 'ba0pzerufpmjswfcg0u6-mysql.services.clever-cloud.com',
  port: 3306,
  user: 'ux4walvyucwbqv7t',
  password: 'KVtTRI2HZaZCLXvqCTc6',
  database: 'ba0pzerufpmjswfcg0u6'
})