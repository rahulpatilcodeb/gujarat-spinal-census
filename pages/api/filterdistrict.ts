import User from "@/models/UserModel";
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
    // console.log(req.headers.authorization);
    switch (req.method) {
      case "GET":
        // const verified = jwt.verify(req.headers.authorization, setcretKey);
        // console.log(verified.email);
        // const admins = await admin.find({ email: verified.email });
        // console.log(admins);
        // if (admins[0].email != undefined) {
        console.log("thisi starting of get");
        const posts = await User.find();
        const users = posts[0].count;
        console.log(posts[0].count, "this is posts");
        return res.json({
          data: users,
        });
        // }
        // return res.send("Session expired");
        break;
      case "POST":
        console.log(req.body, "this is boyd of post");
        const limit = 8;
        const skeeper = req.body.page;
        const skip = (skeeper - 1) * limit;
        const post = await User.find({ district: req.body.search })
          .skip(skip)
          .limit(limit)
          .lean();
        console.log(skeeper, skip, "limit", limit);
        return res.send(post);
    }
  } catch (error) {
    console.error(error);
  }
}
