export const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Bitcoin',
      version: '1.0.0',
      description: 'Api documentation',
    },
    servers: [{ url: 'http://localhost:3000/' }],
  },
  apis: ['./Controller/routes.ts', './dist/Controller/routes.js'],
};
