import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Irrigation System API',
      version: '1.0.0',
      description: 'API documentation for the Irrigation System'
    },
    servers: [
      {
        url: 'https://irrigation-system-be.onrender.com',
        description: 'Production server'
      }
    ]
  },
  apis: ['./src/routes/*.ts']
}

const swaggerSpec = swaggerJsdoc(options)
export default swaggerSpec
