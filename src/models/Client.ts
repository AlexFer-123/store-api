import { runQuery, getQuery, allQuery } from '../database/connection';
import { Client } from '../types';

export class ClientModel {
  static async create(client: Omit<Client, 'id' | 'data_criacao'>): Promise<number> {
    const sql = 'INSERT INTO clientes (nome, email) VALUES (?, ?)';
    await runQuery(sql, [client.nome, client.email]);
    
    const lastInsert = await getQuery<{ id: number }>('SELECT last_insert_rowid() as id');
    return lastInsert?.id || 0;
  }

  static async findById(id: number): Promise<Client | undefined> {
    const sql = 'SELECT * FROM clientes WHERE id = ?';
    return await getQuery<Client>(sql, [id]);
  }

  static async findByEmail(email: string): Promise<Client | undefined> {
    const sql = 'SELECT * FROM clientes WHERE email = ?';
    return await getQuery<Client>(sql, [email]);
  }

  static async findAll(page: number = 1, limit: number = 10, search?: string): Promise<Client[]> {
    const offset = (page - 1) * limit;
    let sql = 'SELECT * FROM clientes';
    const params: unknown[] = [];

    if (search) {
      sql += ' WHERE nome LIKE ? OR email LIKE ?';
      params.push(`%${search}%`, `%${search}%`);
    }

    sql += ' ORDER BY data_criacao DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    return await allQuery<Client>(sql, params);
  }

  static async count(search?: string): Promise<number> {
    let sql = 'SELECT COUNT(*) as total FROM clientes';
    const params: unknown[] = [];

    if (search) {
      sql += ' WHERE nome LIKE ? OR email LIKE ?';
      params.push(`%${search}%`, `%${search}%`);
    }

    const result = await getQuery<{ total: number }>(sql, params);
    return result?.total || 0;
  }

  static async update(id: number, client: Partial<Omit<Client, 'id' | 'data_criacao'>>): Promise<void> {
    const fields = Object.keys(client).map(key => `${key} = ?`).join(', ');
    const values = Object.values(client);
    
    const sql = `UPDATE clientes SET ${fields} WHERE id = ?`;
    await runQuery(sql, [...values, id]);
  }

  static async delete(id: number): Promise<void> {
    const sql = 'DELETE FROM clientes WHERE id = ?';
    await runQuery(sql, [id]);
  }
}
