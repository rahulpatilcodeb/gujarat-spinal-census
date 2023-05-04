// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Contact from "@/models/ContactModel";
import admin from "@/models/AdminLoginModel";
import type { NextApiRequest, NextApiResponse } from "next";
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const url = process.env.NEXT_PUBLIC_DATABASE_URL;

const setcretKey = "loginapi";
mongoose.connect(url);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET":
      // const verified = jwt.verify(req.headers.authorization, setcretKey);
      // const admins = await admin.find({ email: verified.email });

      // if (admins[0].email != undefined) {
      // const posts = await Contact.aggregate([
      //   {
      //     $group: {
      //       _id: "total",
      //       count: {
      //         $sum: +1,
      //       },
      //     },
      //   },
      // ]);
      // return res.json({
      //   data: posts,
      // });
      // }
      // return res.send("Session expired");
      // break;
      case "POST":
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        const verified = jwt.verify(token, setcretKey);
        const admins = await admin.find({ email: verified.email });
        if (admins[0].email != undefined) {
          const limit = req.body.reqObj.limit;
          const page = req.body.reqObj.page;
          const skip = (page - 1) * limit;
          const post = await Contact.find()
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit)
            .lean();
          const count = await Contact.count();
          return res.send({ post, count });
        }
    }
  } catch (error: any) {
    console.log("this is ", error.message);
    return res.status(400).json(error.message);
  }
}
