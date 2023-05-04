import admin from "@/models/AdminLoginModel";
import type { NextApiRequest, NextApiResponse } from "next";
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const url = process.env.NEXT_PUBLIC_DATABASE_URL;
const secretKey = "loginapi";
import { toast } from "react-toastify";

mongoose.connect(url);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET":
        const posts = await admin.find();
        res.json({
          data: posts,
        });
        break;
      case "POST":
        const Admin = new admin({
          email: req.body.email,
          password: req.body.password,
        });
        const user = await admin.findOne({ email: req.body.email });
        let valid
        if(user){
          valid = await bcrypt.compare(Admin.password, user.password);
        }

        if (req.body.email != undefined && user !== null && valid) {
          let useris, Payload;
          try {
            if (user) {
              const jtoken = jwt.sign({ email: user.email }, secretKey, {
                expiresIn: "18000000",
              });
              useris = {
                name: user.email,
                key: jtoken,
              };

              Payload = useris;

              return res.json({
                payload: Payload,
                msg: `welcome ${Payload.name}`,
              });
            }
          } catch {
            // console.log("in catch block");
            return res.json({ msg: "not valid user" });
          }
        } else {
          return res.json({ msg: "not matched" });
        }
    }
  } catch (error) {
    console.error(error);
  }
}
