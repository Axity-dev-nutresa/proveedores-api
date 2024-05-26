import env from 'dotenv'
import path from 'path'

const nodeEnv = process.env.NODE_ENV

env.config({
  path: path.resolve(process.cwd(), `.env.${nodeEnv}`)
})

export default {
  nodeEnv,
  host: String(process.env.DOMAIN),
  port: Number(process.env.PORT),
  dbName: String(process.env.DB_NAME),
  dbUser: String(process.env.DB_USER),
  dbHost: String(process.env.DB_HOST),
  dbPass: String(process.env.DB_PASSWORD),
  dbPort: Number(process.env.DB_PORT),
  awsS3: {
    accessKeyId: String(process.env.AWS_S3_ACCESS_KEY_ID),
    secretAccessKey: String(process.env.AWS_S3_SECRET_ACCESS_KEY),
    bucket: String(process.env.AWS_S3_BUCKET_FILS)
  }
} as const
