export const swaggerJson = {
  definition: {
    info: {
      "description": "Volunteer Sharing Grocery",
      "version": "1.0.0",
      "title": "Swagger",
      "contact": {
        "email": "victor.malai@endava.com"
      }
    },
    securityDefinitions: {
      "bearer": {
        "name": "Authorization",
        "in": "header",
        "type": "apiKey"
      }
    },
    "definitions": {
      'User': {
        'type': 'object',
        'required': ['name', 'surname', 'latitude', 'longitude'],
        'properties': {
          'name': { 'type': 'string' },
          'available': { 'type': 'boolean' },
          'surname': { 'type': 'string' },
          'email': { 'type': 'string' },
          'phone': { 'type': 'string' },
          'action_perimeter': { 'type': 'number' },
          'password': { 'type': 'string' },
          'latitude': { 'type': 'number' },
          'longitude': { 'type': 'number' },
        },
      },
      'Order': {
        'type': 'object',
        'required': ['title', 'address', 'description', 'expires_at', 'latitude', 'longitude'],
        'properties': {
          'title': { 'type': 'string' },
          'address': { 'type': 'string' },
          'description': { 'type': 'string' },
          'expires_at': { 'type': 'string', example: "2020-02-02 11:11" },
          'status': { 'type': 'string', "example": "'open', 'in progress', 'done', 'canceled'" },
          'latitude': { 'type': 'number' },
          'longitude': { 'type': 'number' },
        },
      },
      "ApiResponse": {
        "type": "object",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32"
          },
          "type": {
            "type": "string"
          },
          "message": {
            "type": "string"
          }
        }
      },
    },
    "schemes": [
      "https",
      "http",
    ],
    "basePath": "/",
  },

  // Path to the API docs
  apis:  [
    process.cwd()+'/src/**/*.controller.ts',
  ]

}
