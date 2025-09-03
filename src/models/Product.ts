import { runQuery, getQuery, allQuery } from '../database/connection';
import { Product } from '../types';
import { v4 as uuidv4 } from 'uuid';

export class ProductModel {
  static async create(product: Omit<Product, 'id' | 'data_criacao'>): Promise<string> {
    const id = uuidv4();
    const sql = 'INSERT INTO produtos (id, nome, preco, estoque) VALUES (?, ?, ?, ?)';
    await runQuery(sql, [id, product.nome, product.preco, product.estoque]);
    
    return id;
  }

  static async findById(id: string): Promise<Product | undefined> {
    const sql = 'SELECT * FROM produtos WHERE id = ?';
    return await getQuery<Product>(sql, [id]);
  }

  static async findAll(page: number = 1, limit: number = 10, search?: string): Promise<Product[]> {
    const offset = (page - 1) * limit;
    let sql = 'SELECT * FROM produtos';
    const params: unknown[] = [];

    if (search) {
      sql += ' WHERE nome LIKE ?';
      params.push(`%${search}%`);
    }

    sql += ' ORDER BY data_criacao DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    return await allQuery<Product>(sql, params);
  }

  static async count(search?: string): Promise<number> {
    let sql = 'SELECT COUNT(*) as total FROM produtos';
    const params: unknown[] = [];

    if (search) {
      sql += ' WHERE nome LIKE ?';
      params.push(`%${search}%`);
    }

    const result = await getQuery<{ total: number }>(sql, params);
    return result?.total || 0;
  }

  static async update(id: string, product: Partial<Omit<Product, 'id' | 'data_criacao'>>): Promise<void> {
    const fields = Object.keys(product).map(key => `${key} = ?`).join(', ');
    const values = Object.values(product);
    
    const sql = `UPDATE produtos SET ${fields} WHERE id = ?`;
    await runQuery(sql, [...values, id]);
  }

  static async delete(id: string): Promise<void> {
    const sql = 'DELETE FROM produtos WHERE id = ?';
    await runQuery(sql, [id]);
  }
}
