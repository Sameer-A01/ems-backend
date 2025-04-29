// models/location.js

import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },
    lat: {
      type: Number,
      required: true
    },
    lon: {
      type: Number,
      required: true
    },
    accuracy: Number,
    altitude: Number,
    ipAddress: String,
    deviceInfo: {
      type: Object,
      default: {}
    },
    photoPath: {
      type: String,
      required: true
    },
    photoUrl: {
      type: String
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    remarks: {
      type: String
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  });
const Location = mongoose.model('Location', LocationSchema);

export default Location;
