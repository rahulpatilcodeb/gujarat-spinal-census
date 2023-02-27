// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "@/models/UserModel";
import type { NextApiRequest, NextApiResponse } from "next";
const mongoose = require("mongoose");
import S3 from "aws-sdk/clients/s3";

const url = process.env.NEXT_PUBLIC_DATABASE_URL;

mongoose.connect(url);

const s3 = new S3({
  region: "us-east-1",
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_SECRET_KEY,
  signatureVersion: "v4",
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb",
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    {
      console.log(req.body);
      let { name, type, email } = req.body;

      const fileParams = {
        Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
        Key: `${email}/${name}`,
        ContentType: type,
      };

      const url = await s3.getSignedUrlPromise("putObject", fileParams);
      res.status(200).json({ url });
    }
  } catch (error) {
    console.log(error);
  }
}
