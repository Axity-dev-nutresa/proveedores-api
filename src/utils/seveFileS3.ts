import {S3} from '@aws-sdk/client-s3'
import {Upload} from '@aws-sdk/lib-storage'
import envVars from '@config/envVars'
import fs from 'fs'
import path from 'path'

const s3 = new S3({
  region: 'us-east-1',
  credentials: {
    accessKeyId: envVars.awsS3.accessKeyId,
    secretAccessKey: envVars.awsS3.secretAccessKey
  }
})

export const saveFileS3 = async (file: Express.Multer.File, filPath: string) => {
  const blob = fs.readFileSync(file.path)

  const uploaded = await new Upload({
    client: s3,
    params: {
      Bucket: envVars.awsS3.bucket,
      Key: filPath + path.extname(file.originalname),
      Body: blob
    }
  }).done()
  return uploaded.Location
}
