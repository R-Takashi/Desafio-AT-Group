import { ErrorRequestHandler } from 'express';
import { ErrorTypes, errorCatalog } from '../errors/catalog';

const errorHandler: ErrorRequestHandler = (error: Error, _req, res, _next) => {

  console.log('Error: ', error.message);
  
  const messageErrorType = error.message as ErrorTypes;
  const errorCatalogEntry = errorCatalog[messageErrorType];

  if (errorCatalogEntry) {
    const { message, status } = errorCatalogEntry;
    return res.status(status).json({ error: message });
  }

  return res.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;