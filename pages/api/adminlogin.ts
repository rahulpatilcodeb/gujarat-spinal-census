// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import admin from "@/models/AdminLoginModel";
import type { NextApiRequest, NextApiResponse } from "next";
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const url = process.env.NEXT_PUBLIC_DATABASE_URL;

const secretKey = "loginapi";

mongoose.connect(url);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const posts = await admin.find();
      console.log(posts);
      res.json({
        data: posts,
      });
      break;
    case "POST":
      const Admin = new admin({
        email: req.body.email,
        password: req.body.password,
      });
      console.log(req.body.email, req.body.password);
      const user = await admin.findOne({ email: req.body.email });
      console.log(user);
      const valid = await bcrypt.compare(Admin.password, user.password);
      console.log(valid);

      if (req.body.email != undefined && user !== null && valid) {
        let useris, Payload;
        try {
          if (user) {
            console.log("in the try block");

            const jtoken = jwt.sign({ email: user.email }, secretKey, {
              expiresIn: "1h",
            });
            useris = {
              name: user.email,
              key: jtoken,
            };

            Payload = useris;
            console.log(Payload);

            return res.json({
              payload: Payload,
              msg: `welcome ${Payload.name}`,
            });
          }
        } catch {
          console.log("in catch block");
          return res.json({ msg: "not valid user" });
        }
        // return console.log("loged in");
        // result == true

        // return console.error("not matched");
      } else {
        return res.json({ msg: "not matched" });
      }
    // console.log("in api", user);
  }
}
