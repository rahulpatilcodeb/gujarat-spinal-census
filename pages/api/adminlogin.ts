// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import admin from "@/models/AdminLoginModel";
import type { NextApiRequest, NextApiResponse } from "next";
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jose = require("jose");

const url = process.env.NEXT_PUBLIC_DATABASE_URL;

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
          return console.log("loged in");
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
      let useris, Payload;
      try {
        if (user) {
          console.log("in the try block");
          // const secret = new TextEncoder().encode(
          //     'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
          //   );
          //   const alg = 'HS256';
          const secret = jose.base64url.decode(
            "zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI"
          );
          const jwt = await new jose.EncryptJWT({ "urn:example:claim": true })
            .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
            .setIssuedAt()
            .setIssuer("urn:example:issuer")
            .setAudience("urn:example:audience")
            .setExpirationTime("60s")
            .encrypt(secret);
          useris = {
            name: user.email,
            key: jwt,
          };

          Payload = useris;
          console.log(Payload);
        }

        return res.send(Payload);
      } catch (error) {
        error;
        console.log("in catch block");
      }

    // const jwt = await new jose.EncryptJWT({})
  }
}
