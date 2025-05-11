import  {envSchema}  from "../schema/envSchema.js"

export const envConfig = {
    confKey: 'config', // optional, default: 'config'
    schema: envSchema,
    data: process.env, // optional, default: process.env,
    dotenv: true
  }

