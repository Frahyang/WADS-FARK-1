import swaggerJsdoc from 'swagger-jsdoc';
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
        title: 'My API',
        version: '1.0.0',
        description: 'TypeScript Express API with Swagger',
        },
        servers: [
        {
            url: 'http://e2425-wads-l4bcg3-server.csbihub.id',
        },
        ],
    },
    apis: ['./src/routes/*.ts'], // Point to your route files
};

export const swaggerSpec = swaggerJsdoc(options);
