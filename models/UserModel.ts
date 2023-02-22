const mongoose = require("mongoose");

const userSchema = {
    image: String,
    fname: String,
    lname: String,
    dob: Date,
    gender: String,
    address: String,
    district: String,
    contact: String,
    email: String,
    qualification: String,
    bpl: String,
    description: String,

    injuryYear: String,
    injuryReason: String,
    injuryType: String,
    injuryLevel: String,
    implantFixation: String,
    injuryStatus: String,
    physicalStatus: String,
    financialStatus: String,
    independent: String,
};

export default mongoose.models.User || mongoose.model('User', userSchema)