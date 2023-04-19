// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "@/models/UserModel";
import type { NextApiRequest, NextApiResponse } from "next";
const mongoose = require("mongoose");
import S3 from "aws-sdk/clients/s3";
import admin from "@/models/AdminLoginModel";
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
        if (!req.headers.authorization) {
          throw Error("jwt expired");
        }
        const verified = jwt.verify(req.headers.authorization, setcretKey);
        // console.log(verified.email);
        const admins = await admin.find({ email: verified.email });
        // console.log(admins);

        if (admins[0].email != undefined) {
          const posts = await User.find();
          return res.json({
            data: posts,
          });
        }
        // return res.send("Session expired");
        break;
      case "POST":
        const user = new User({
          image: req.body.avatar,
          fname: req.body.fname,
          lname: req.body.lname,
          dob: req.body.dob,
          gender: req.body.gender,
          address: req.body.address,
          district: req.body.district,
          contact: req.body.contact,
          email: req.body.email,
          qualification: req.body.qualification,
          bpl: req.body.bpl,
          description: req.body.description,
          injuryYear: req.body.injuryYear,
          injuryReason: req.body.injuryReason,
          injuryType: req.body.injuryType,
          injuryLevel: req.body.injuryLevel,
          implantFixation: req.body.implantFixation,
          injuryStatus: req.body.injuryStatus,
          physicalStatus: req.body.physicalStatus,
          financialStatus: req.body.financialStatus,
          independent: req.body.independent,
        });
        await user.save();
        // console.log("User", user);
        return res.send("data saved");
    }
  } catch (error) {
    console.error(error);
  }
}
