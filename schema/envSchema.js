export const envSchema = {
    type: 'object',
    required: ['PORT'],
    properties: {
      PORT: {
        type: 'string',
        default: 3000
      },
      DB_HOST: {
        type: 'string'
      },
      DB_NAME: {
        type: 'string'
      },
      DB_USER: {
        type: 'string'
      },
      DB_PASSWORD: {
        type: 'string'
      },
      DB_CONN_STRING: {
        type: 'string'
      }

    }
  }


  

