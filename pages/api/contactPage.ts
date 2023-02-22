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
        console.log("thisi starting of get");
        const posts = await Contact.aggregate([
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
        // break;
      case "POST":
        console.log(req.body, "this is boyd of post");
        const limit = 10;
        const skeeper = req.body.page;
        const skip = (skeeper - 1) * limit;
        const post = await Contact.find().sort({ _id: -1 }).skip(skip).limit(limit).lean();
        console.log(skeeper, skip, "limit contact", limit);
        return res.send(post);
    }
  } catch (error) {
    console.error(error);
  }
}