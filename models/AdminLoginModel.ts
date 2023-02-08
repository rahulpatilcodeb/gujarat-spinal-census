const mongoose = require("mongoose");

const AdminSchema = {
    email: String,
    password: String,
   
};

export default mongoose.models.admin || mongoose.model('admin', AdminSchema)