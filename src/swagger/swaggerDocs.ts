export const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Bitcoin',
      version: '1.0.0',
      description: 'API para consultar o preço do Bitcoin',
    },
    servers: [{ url: 'http://localhost:3000/getbitcoinprice' }],
  },
  apis: ['./Controller/routes.ts', './dist/Controller/routes.js'],
};
