export interface Product {
  id?: string;
  nome: string;
  preco: number;
  estoque: number;
  data_criacao?: string;
}

export interface Client {
  id?: string;
  nome: string;
  email: string;
  data_criacao?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
}
