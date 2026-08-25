const mongoose = require('mongoose');

const { Schema } = mongoose;

const websiteSettingsSchema = new Schema(
  {
     
  logo: String,
  address1: String,
  address2: String,
  address3: String,
  phone: String,
  whatsapp: String,
  email: String,

  facebook: String,
  instagram: String,
  linkedin: String,
  twitter: String,
  youtube: String

  
  },

  {
    timestamps: true
  }
);

module.exports = mongoose.model('websiteSettings', websiteSettingsSchema);