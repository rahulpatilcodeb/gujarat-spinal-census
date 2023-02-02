const mongoose = require("mongoose");

const contactSchema = {
  contact: Number,
  email: String,
  description: String
};

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);
