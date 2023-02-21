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
    console.log(req.headers.authorization);
    switch (req.method) {
      case "GET":
        try {
          const verified = jwt.verify(req.headers.authorization, setcretKey);
          console.log(verified.email);
          const admins = await admin.find({ email: verified.email });
          console.log(admins);
          if (admins[0].email != undefined) {
            const posts = await Contact.find();
            return res.json({
              data: posts,
            });
          } else {
            return res.send({ msg: "not valid user" });
          }
        } catch {
          res.send({ msg: "Session expired" });
        }
        break;
      case "POST":
        const contact = new Contact({
          contact: req.body.contact,
          email: req.body.email,
          description: req.body.description,
        });
        await contact.save();
        return res.send("data saved");
    }
  } catch (error) {
    console.error(error);
  }
}
