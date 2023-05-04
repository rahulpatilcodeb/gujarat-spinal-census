import User from "@/models/UserModel";
import admin from "@/models/AdminLoginModel";
import type { NextApiRequest, NextApiResponse } from "next";
import { remove } from "lodash";
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
      
      case "POST":
        console.log("this is filete", req.body.body.filter);

        // let { fname, injuryType, district } = req.body.body.filter;
        // console.log("this is me", fname, injuryType, district);
        if(req.body.body.filter.district=="")
        {
          delete req.body.body.filter.district;
        }
        if(req.body.body.filter.injuryType=="")
        {
          delete req.body.body.filter.injuryType;
        }
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        // console.log("this is token", token);
        const verified = jwt.verify(token, setcretKey);
        // const verified = jwt.verify(req.headers.authorization, setcretKey);
        const admins = await admin.find({ email: verified.email });
        // console.log(admins);
        if (admins[0].email != undefined) {
          const limit = req.body.body.limit;
          const skeeper = req.body.body.page;
          const skip = (skeeper - 1) * limit;
          // console.log(req);
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
