// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "@/models/UserModel";
import type { NextApiRequest, NextApiResponse } from "next";
const mongoose = require("mongoose");
import S3 from "aws-sdk/clients/s3";
import admin from "@/models/AdminLoginModel";
import { count } from "console";
const jwt = require("jsonwebtoken");
const url = process.env.NEXT_PUBLIC_DATABASE_URL;

const setcretKey = "loginapi";
mongoose.connect(url);

const s3 = new S3({
  region: "ap-south-1",
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
    // console.log(req.headers.authorization);
    switch (req.method) {
      case "GET":
        // const verified = jwt.verify(req.headers.authorization, setcretKey);
        // console.log(verified.email);
        // const admins = await admin.find({ email: verified.email });
        // console.log(admins);

        // if (admins[0].email != undefined) {
        console.log("thisi starting of get");
        const posts = await User.aggregate([
          {
            $group: {
              _id: "total",
              count: {
                $sum: +1,
              },
            },
          },
        ]);
        console.log(posts[0].count, "this is posts");
        return res.json({
          data: posts,
        });
        // }
        // return res.send("Session expired");
        break;
      case "POST":
        console.log(req.body, "this is boyd of post");
        const limit = 8;
        const skeeper = req.body.page;
        const skip = (skeeper - 1) * limit;
        const post = await User.find().skip(skip).limit(limit).lean();
        console.log(skeeper, skip, "limit", limit);
        return res.send(post);
    }
  } catch (error) {
    console.error(error);
  }
}
