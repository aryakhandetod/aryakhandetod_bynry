
const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  skills: {
    type: [String], 
    required: true,
  },
  certifications: {
    type: [String], 
    required: true,
  },
  interests: {
    type: [String], 
    required: true,
  },
});


module.exports = mongoose.model('Profile', ProfileSchema);
