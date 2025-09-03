import { body, param, query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      error: 'Dados inválidos',
      details: errors.array()
    });
    return;
  }
  next();
};

export const validateProduct = [
  body('nome')
    .notEmpty()
    .withMessage('Nome é obrigatório')
    .isLength({ min: 1, max: 255 })
    .withMessage('Nome deve ter entre 1 e 255 caracteres'),
  body('preco')
    .isFloat({ min: 0 })
    .withMessage('Preço deve ser um número positivo'),
  body('estoque')
    .isInt({ min: 0 })
    .withMessage('Estoque deve ser um número inteiro não negativo'),
  handleValidationErrors
];

export const validateClient = [
  body('nome')
    .notEmpty()
    .withMessage('Nome é obrigatório')
    .isLength({ min: 1, max: 255 })
    .withMessage('Nome deve ter entre 1 e 255 caracteres'),
  body('email')
    .isEmail()
    .withMessage('Email deve ter um formato válido')
    .normalizeEmail(),
  handleValidationErrors
];

export const validateId = [
  param('id')
    .isUUID(4)
    .withMessage('ID deve ser um UUID válido'),
  handleValidationErrors
];

export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Página deve ser um número inteiro positivo'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit deve ser um número entre 1 e 100'),
  query('search')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Busca deve ter no máximo 255 caracteres'),
  handleValidationErrors
];
