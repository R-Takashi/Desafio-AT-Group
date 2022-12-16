"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catalog_1 = require("../errors/catalog");
const errorHandler = (error, _req, res, _next) => {
    const messageErrorType = error.message;
    const errorCatalogEntry = catalog_1.errorCatalog[messageErrorType];
    if (errorCatalogEntry) {
        const { message, status } = errorCatalogEntry;
        return res.status(status).json({ error: message });
    }
    return res.status(500).json({ message: 'Internal server error' });
};
exports.default = errorHandler;
