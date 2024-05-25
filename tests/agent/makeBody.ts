import fs from 'fs'
import FormData from 'form-data'
import type {Data} from '../types'

async function createMultipartFormData(data: Data) {
  const form = new FormData()
  Object.entries(data).forEach(([key, value]) => form.append(key, value))

  const boundary = form.getBoundary()

  const formData = await new Promise<string>((resolve, reject) => {
    form
      .pipe(fs.createWriteStream('/tmp/output.txt'))
      .on('finish', () => {
        const data = fs.readFileSync('/tmp/output.txt', {encoding: 'base64'})
        resolve(data)
      })
      .on('error', reject)
  })

  return {base64: formData, boundary}
}

export const getBodyAndHeaders = async (data: any, header: string) => {
  if (!data) {
    return {
      isBase64Encoded: false,
      body: null,
      headers: {
        'content-type': 'application/json'
      }
    }
  }

  if (header === 'application/json') {
    return {
      isBase64Encoded: false,
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json; charset=utf-8'
      }
    }
  }

  if (header === '') {
    return {
      isBase64Encoded: false,
      body: JSON.parse(data),
      headers: {
        'content-type': 'application/json'
      }
    }
  }

  if (header === 'multipart/form-data') {
    const {base64, boundary} = await createMultipartFormData(data)
    return {
      isBase64Encoded: true,
      body: base64,
      headers: {
        'content-type': `multipart/form-data; boundary=${boundary}`
      }
    }
  }
  throw Error(`header: ${header} is nor supported`)
}
