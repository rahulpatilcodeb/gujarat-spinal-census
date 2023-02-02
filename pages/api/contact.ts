// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Contact from "@/models/ContactModel";
import type { NextApiRequest, NextApiResponse } from "next";
const mongoose = require("mongoose");

const url = process.env.NEXT_PUBLIC_DATABASE_URL;

mongoose.connect(url);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const posts = await Contact.find();
      res.json({
        data: posts,
      });
    case "POST":
      const contact = new Contact({
        contact: req.body.contact,
        email: req.body.email,
        description: req.body.description
      });
      await contact.save();
      console.log("Contact", contact);
      return res.send("data saved");
  }
}

// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   name: string
// }

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: 'John Doe' })
// }
