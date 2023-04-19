import User from "@/models/UserModel";
import type { NextApiRequest, NextApiResponse } from "next";
const mongoose = require("mongoose");

const url = process.env.NEXT_PUBLIC_DATABASE_URL;

mongoose.connect(url);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const Id = mongoose.Types.ObjectId(req.body.id);
  // console.log(req.body.id);
  switch (req.method) {
    case "POST":
      const posts = await User.find({ _id: Id });
      res.json({
        data: posts,
      });
      // console.log("post data",posts);
      break;
  }
}
