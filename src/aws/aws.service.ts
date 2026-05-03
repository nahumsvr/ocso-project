import { Injectable } from "@nestjs/common";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

@Injectable()
export class AwsService {
  private s3 = new S3Client({
    region: "us-east-2",
    credentials: {
      accessKeyId: process.env.ACCESSKEY_S3 ?? "",
      secretAccessKey: process.env.SECRETKEY_S3 ?? "",
    },
  });

  async uploadFile(file: Express.Multer.File) {
    const key = file.originalname;
    const bucket = "nest-ocso-curso";
    const photoUrl = `https://${bucket}.s3.us-east-2.amazonaws.com/${key}`;

    const command = new PutObjectCommand({
      Key: key,
      Body: file.buffer,
      Bucket: bucket,
    });

    await this.s3.send(command);

    return photoUrl;
  }
}
