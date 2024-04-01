import AWS from 'aws-sdk'
import fs from 'fs'
import path from 'path'
import 'dotenv/config.js'
import envVars from '@config/envVars'

const s3 = new AWS.S3({
  accessKeyId: envVars.awsS3.accessKeyId,
  secretAccessKey: envVars.awsS3.secretAccessKey
})

export const saveFileS3 = async (file: Express.Multer.File, filPath: string) => {
  const blob = fs.readFileSync(file.path)

  const uploaded = await s3
    .upload({
      Bucket: envVars.awsS3.bucket,
      Key: filPath + path.extname(file.originalname),
      Body: blob
    })
    .promise()

  return uploaded.Location
}
