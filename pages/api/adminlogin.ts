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
      const user = await admin.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        bcrypt.compare(Admin.password, user.password).then(() => {
          let useris, Payload;
          try {
            if (user) {
              console.log("in the try block");
              // const secret = new TextEncoder().encode(
              //     'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
              //   );
              //   const alg = 'HS256';
              // const secret =

              const jtoken = jwt.sign({ email: user.email }, secretKey, {
                expiresIn: "1h",
              });
              useris = {
                name: user.email,
                key: jtoken,
              };

              Payload = useris;
              console.log(Payload);
            }

            return res.send(Payload);
          } catch (error) {
            console.log("in catch block");
            return error;
          }
          // return console.log("loged in");
          // result == true
        });
        // return console.error("not matched");
      } else {
        return console.log("not matched");
      }
      console.log("in api", user);
    //   await Admin.save();
    //   console.log("admin", Admin);
    // return res.send(user);
    // let useris, Payload;
    // try {
    //   if (user) {
    //     console.log("in the try block");
    //     // const secret = new TextEncoder().encode(
    //     //     'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
    //     //   );
    //     //   const alg = 'HS256';
    //     // const secret =

    //     const token = jwt.sign({ email: user.email }, { expiresIn: '1h' });
    //     useris = {
    //       name: user.email,
    //       key: token,
    //     };

    //     Payload = useris;
    //     console.log(Payload);
    //   }

    //   return res.send(Payload);
    // } catch (error) {
    //   console.log("in catch block");
    //   return error;
    // }

    // const jwt = await new jose.EncryptJWT({})
  }
}
