// eslint-disable-next-line import/no-unresolved
import { AWS_S3_BUCKET, AWS_S3_BUCKET_REGION, AWS_S3_ACCESS_KEY, AWS_S3_SECRET_KEY } from '@env';
import AWS from 'aws-sdk';


const s3bucket = new AWS.S3({
  accessKeyId: AWS_S3_ACCESS_KEY,
  secretAccessKey: AWS_S3_SECRET_KEY,
  Bucket: AWS_S3_BUCKET,
  signatureVersion: 'v4',
  region: AWS_S3_BUCKET_REGION,
});

export const uploadFileAws = async (fileData) => {
  return new Promise((resolve, reject) => {
    const { name: fileName, type: contentType, arrayBuffer } = fileData;
    const contentDisposition = 'inline;filename="' + fileName + '"';
    s3bucket.createBucket(() => {
      const params = {
        Bucket: AWS_S3_BUCKET,
        Key: fileName,
        Body: arrayBuffer,
        ContentDisposition: contentDisposition,
        ContentType: contentType,
      };
      s3bucket.upload(params, (err, data) => {
        if (err) reject(err);
        else resolve(data.Location);
      });
    });
  });
};
