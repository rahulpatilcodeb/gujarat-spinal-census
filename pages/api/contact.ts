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
    console.log(req.headers.authorization);
    const verified = jwt.verify(req.headers.authorization, setcretKey);
    console.log(verified.email);
    switch (req.method) {
      case "GET":
        const admins = await admin.find({ email: verified.email });
        console.log(admins);
        if (verified) {
        }
        if (admins[0].email != undefined) {
        const posts = await Contact.find();
        res.json({
          data: posts,
        });
        console.log("messasge")
        } else {
          res.send({ msg: "not valid user" });
        }
        res.send("Session expired");
        break;
      case "POST":
        const contact = new Contact({
          contact: req.body.contact,
          email: req.body.email,
          description: req.body.description,
        });
        await contact.save();
        // console.log("Contact", contact);
        return res.send("data saved");
    }
  } catch (error) {
    console.error(error);
  }
}
