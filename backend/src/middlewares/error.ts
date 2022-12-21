import { ErrorRequestHandler } from 'express';
import { ErrorTypes, errorCatalog } from '../errors/catalog';

const errorHandler: ErrorRequestHandler = (error: Error, _req, res, _next) => {
  
  const messageErrorType = error.message as ErrorTypes;
  const errorCatalogEntry = errorCatalog[messageErrorType];

  if (errorCatalogEntry) {
    const { message, status } = errorCatalogEntry;
    return res.status(status).json({ message });
  }

  return res.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;