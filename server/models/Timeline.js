const mongoose = require('mongoose');

const TimelineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  period: {
    type: String,
    required: true,
    trim: true
  },
  startYear: {
    type: Number,
    required: true
  },
  endYear: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  backgroundImage: {
    type: String
  },
  mapLocation: {
    coordinates: {
      lat: Number,
      lng: Number
    },
    zoom: Number
  },
  environmentSettings: {
    skybox: String,
    lighting: String,
    weather: String,
    soundscape: String
  },
  keyEvents: [{
    title: String,
    year: Number,
    description: String,
    image: String
  }],
  keyFigures: [{
    name: String,
    role: String,
    biography: String,
    image: String
  }],
  artifacts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artifact'
  }],
  buildings: [{
    name: String,
    description: String,
    model3D: String,
    image: String
  }],
  costumes: [{
    name: String,
    description: String,
    image: String,
    model3D: String
  }],
  isUnlocked: {
    type: Boolean,
    default: false
  },
  pointsToUnlock: {
    type: Number,
    default: 0
  },
  order: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Timeline', TimelineSchema); 