const { S3 } = require('aws-sdk')
const uuid = require('uuid').v4

exports.s3Upload = async (files) => {
  //   const { name } = file.image
  //   console.log('ye hai name', file.image)
  const s3 = new S3()

  const params = files.map((file) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `upload/${uuid()}-${file.originalname}`,
      Body: file.buffer,
    }
  })

  const result = await Promise.all(
    params.map((param) => s3.upload(param).promise())
  )

  return result.map((item) => {
    return { url: item.Location }
  })
}
