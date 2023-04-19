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
      // console.log(verified.email);
      // const admins = await admin.find({ email: verified.email });
      // console.log(admins);

      // if (admins[0].email != undefined) {
      // console.log("thisi starting of get");
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
      // console.log(posts[0].count, "this is posts");
      // return res.json({
      //   data: posts,
      // });
      // }
      // return res.send("Session expired");
      // break;
      case "POST":
        // console.log("this s token", req.headers);
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        // console.log("this is token", token);
        const verified = jwt.verify(token, setcretKey);
        // console.log(verified.email);
        const admins = await admin.find({ email: verified.email });
        // console.log(admins);
        if (admins[0].email != undefined) {
          // console.log(req.body, "this is boyd of post");
          const limit = req.body.reqObj.limit;
          const page = req.body.reqObj.page;
          const skip = (page - 1) * limit;
          const post = await Contact.find()
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit)
            .lean();
          // console.log(page, skip, "limit contact", limit);
          const count = await Contact.count();
          // console.log(count);
          return res.send({ post, count });
        }
    }
  } catch (error: any) {
    console.log("this is ", error.message);
    return res.status(400).json(error.message);
  }
}
