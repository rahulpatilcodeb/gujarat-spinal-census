// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from '@/models/UserModel';
import type { NextApiRequest, NextApiResponse } from 'next'
const mongoose = require("mongoose");

const url =
    "mongodb://afrin:code-b@ac-l0ameik-shard-00-00.kijruwx.mongodb.net:27017,ac-l0ameik-shard-00-01.kijruwx.mongodb.net:27017,ac-l0ameik-shard-00-02.kijruwx.mongodb.net:27017/posts?ssl=true&replicaSet=atlas-z70j6v-shard-0&authSource=admin&retryWrites=true&w=majority";

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
