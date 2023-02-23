import User from "@/models/UserModel";
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
    // console.log(req.headers.authorization);
    switch (req.method) {
      case "GET":
        // const verified = jwt.verify(req.headers.authorization, setcretKey);
        // console.log(verified.email);
        // const admins = await admin.find({ email: verified.email });
        // console.log(admins);
        // if (admins[0].email != undefined) {
        // console.log("thisi starting of get");
        // const posts = await User.find();
        // const users = posts[0].count;
        // console.log(posts[0].count, "this is posts");
        // return res.json({
        //   data: users,
        // });
      // }
      // return res.send("Session expired");
      // break;
      case "POST":
        console.log("this s token", req.headers);
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        console.log("this is token", token);
        const verified = jwt.verify(token, setcretKey);
        // const verified = jwt.verify(req.headers.authorization, setcretKey);
        console.log(verified.email);
        const admins = await admin.find({ email: verified.email });
        console.log(admins);
        if (admins[0].email != undefined) {
          const limit = req.body.body.limit;
          const skeeper = req.body.body.page;
          const skip = (skeeper - 1) * limit;
          console.log(req);
          const post = await User.find(req.body.body.filter)
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit)
            .lean();
          const totalCount = await User.count(req.body.body.filter);
          console.log(skeeper, skip, "limit", limit);
          return res.send({ data: post, totalCount });
        }
    }
  } catch (error: any) {
    console.error("this is ", error.message);
    return res.status(400).json(error.message);
  }
}
