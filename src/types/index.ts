export interface Product {
  id?: string;
  nome: string;
  preco: number;
  estoque: number;
  created?: string;
}

export interface Client {
  id?: string;
  nome: string;
  email: string;
  created?: string;
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
