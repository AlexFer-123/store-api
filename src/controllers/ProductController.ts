import { Request, Response, NextFunction } from 'express';
import { ProductModel } from '../models/Product';
import { Product, ApiResponse, PaginationQuery } from '../types';

export class ProductController {
  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productData: Omit<Product, 'id' | 'data_criacao'> = req.body;
      const id = await ProductModel.create(productData);
      
      const product = await ProductModel.findById(id);
      
      if (!product) {
        res.status(500).json({
          success: false,
          error: 'Erro ao criar produto'
        });
        return;
      }
      
      const response: ApiResponse<Product> = {
        success: true,
        data: product,
        message: 'Produto criado com sucesso'
      };
      
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page = 1, limit = 10, search }: PaginationQuery = req.query;
      
      const products = await ProductModel.findAll(Number(page), Number(limit), search);
      const total = await ProductModel.count(search);
      
      const response: ApiResponse<{
        products: Product[];
        pagination: {
          page: number;
          limit: number;
          total: number;
          pages: number;
        };
      }> = {
        success: true,
        data: {
          products,
          pagination: {
            page: Number(page),
            limit: Number(limit),
            total,
            pages: Math.ceil(total / Number(limit))
          }
        }
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  static async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const product = await ProductModel.findById(id);
      
      if (!product) {
        res.status(404).json({
          success: false,
          error: 'Produto não encontrado'
        });
        return;
      }
      
      const response: ApiResponse<Product> = {
        success: true,
        data: product
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const productData: Partial<Omit<Product, 'id' | 'data_criacao'>> = req.body;
      
      const existingProduct = await ProductModel.findById(id);
      if (!existingProduct) {
        res.status(404).json({
          success: false,
          error: 'Produto não encontrado'
        });
        return;
      }
      
      await ProductModel.update(id, productData);
      const updatedProduct = await ProductModel.findById(id);
      
      if (!updatedProduct) {
        res.status(500).json({
          success: false,
          error: 'Erro ao atualizar produto'
        });
        return;
      }
      
      const response: ApiResponse<Product> = {
        success: true,
        data: updatedProduct,
        message: 'Produto atualizado com sucesso'
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      
      const existingProduct = await ProductModel.findById(id);
      if (!existingProduct) {
        res.status(404).json({
          success: false,
          error: 'Produto não encontrado'
        });
        return;
      }
      
      await ProductModel.delete(id);
      
      const response: ApiResponse<null> = {
        success: true,
        message: 'Produto removido com sucesso'
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}
