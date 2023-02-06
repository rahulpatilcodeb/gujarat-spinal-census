// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from '@/models/UserModel';
import type { NextApiRequest, NextApiResponse } from 'next'
const mongoose = require("mongoose");

const url =process.env.NEXT_PUBLIC_DATABASE_URL
    

mongoose.connect(url);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'GET':
            const posts = await User.find();
            res.json({
                data: posts,
            });
            break;
        case 'POST':
            const user = new User({
                fname: req.body.fname,
                lname: req.body.lname,
                dob: req.body.dob,
                gender: req.body.gender,
                address: req.body.address,
                district: req.body.district,
                contact: req.body.contact,
                email: req.body.email,
                qualification: req.body.qualification,
                bpl: req.body.bpl,
                description: req.body.description,

                injuryYear: req.body.injuryYear,
                injuryReason: req.body.injuryReason,
                injuryType: req.body.injuryType,
                injuryLevel: req.body.injuryLevel,
                implantFixation: req.body.implantFixation,
                injuryStatus: req.body.injuryStatus,
                physicalStatus: req.body.physicalStatus,
                financialStatus: req.body.financialStatus,
            });
            await user.save();
            console.log("User", user);
            return res.send("data saved");
    }
}
