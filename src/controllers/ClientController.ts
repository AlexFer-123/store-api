import { Request, Response, NextFunction } from 'express';
import { ClientModel } from '../models/Client';
import { Client, ApiResponse, PaginationQuery } from '../types';

export class ClientController {
  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const clientData: Omit<Client, 'id' | 'created'> = req.body;
      
      const existingClient = await ClientModel.findByEmail(clientData.email);
      if (existingClient) {
        res.status(409).json({
          success: false,
          error: 'Email já está em uso'
        });
        return;
      }
      
      const id = await ClientModel.create(clientData);
      const client = await ClientModel.findById(id);
      
      if (!client) {
        res.status(500).json({
          success: false,
          error: 'Erro ao criar cliente'
        });
        return;
      }
      
      const response: ApiResponse<Client> = {
        success: true,
        data: client,
        message: 'Cliente criado com sucesso'
      };
      
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page = 1, limit = 10, search }: PaginationQuery = req.query;
      
      const clients = await ClientModel.findAll(Number(page), Number(limit), search);
      const total = await ClientModel.count(search);
      
      const response: ApiResponse<{
        clients: Client[];
        pagination: {
          page: number;
          limit: number;
          total: number;
          pages: number;
        };
      }> = {
        success: true,
        data: {
          clients,
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
      const { id } = req.params;
      if (!id) {
        res.status(400).json({
          success: false,
          error: 'ID é obrigatório'
        });
        return;
      }
      
      const client = await ClientModel.findById(id);
      
      if (!client) {
        res.status(404).json({
          success: false,
          error: 'Cliente não encontrado'
        });
        return;
      }
      
      const response: ApiResponse<Client> = {
        success: true,
        data: client
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({
          success: false,
          error: 'ID é obrigatório'
        });
        return;
      }
      
      const clientData: Partial<Omit<Client, 'id' | 'created'>> = req.body;
      
      const existingClient = await ClientModel.findById(id);
      if (!existingClient) {
        res.status(404).json({
          success: false,
          error: 'Cliente não encontrado'
        });
        return;
      }
      
      if (clientData.email && clientData.email !== existingClient.email) {
        const emailExists = await ClientModel.findByEmail(clientData.email);
        if (emailExists) {
          res.status(409).json({
            success: false,
            error: 'Email já está em uso'
          });
          return;
        }
      }
      
      await ClientModel.update(id, clientData);
      const updatedClient = await ClientModel.findById(id);
      
      if (!updatedClient) {
        res.status(500).json({
          success: false,
          error: 'Erro ao atualizar cliente'
        });
        return;
      }
      
      const response: ApiResponse<Client> = {
        success: true,
        data: updatedClient,
        message: 'Cliente atualizado com sucesso'
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({
          success: false,
          error: 'ID é obrigatório'
        });
        return;
      }
      
      const existingClient = await ClientModel.findById(id);
      if (!existingClient) {
        res.status(404).json({
          success: false,
          error: 'Cliente não encontrado'
        });
        return;
      }
      
      await ClientModel.delete(id);
      
      const response: ApiResponse<null> = {
        success: true,
        message: 'Cliente removido com sucesso'
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}
