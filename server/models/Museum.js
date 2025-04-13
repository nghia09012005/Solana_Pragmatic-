const mongoose = require('mongoose');

const MuseumSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  theme: {
    type: String,
    enum: ['modern', 'classical', 'minimalist', 'traditional', 'futuristic', 'custom'],
    default: 'modern'
  },
  customizationOptions: {
    wallColor: {
      type: String,
      default: '#FFFFFF'
    },
    floorType: {
      type: String,
      default: 'wood'
    },
    lighting: {
      type: String,
      default: 'natural'
    },
    musicTheme: {
      type: String,
      default: 'ambient'
    }
  },
  layout: {
    floors: {
      type: Number,
      default: 1
    },
    rooms: [{
      name: String,
      theme: String,
      floor: Number,
      position: {
        x: Number,
        y: Number
      },
      size: {
        width: Number,
        height: Number
      }
    }]
  },
  exhibits: [{
    name: String,
    description: String,
    artifactIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artifact'
    }],
    roomId: String,
    position: {
      x: Number,
      y: Number,
      z: Number
    },
    rotation: {
      x: Number,
      y: Number,
      z: Number
    }
  }],
  isPublic: {
    type: Boolean,
    default: true
  },
  visitors: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    visitedAt: {
      type: Date,
      default: Date.now
    }
  }],
  likes: {
    type: Number,
    default: 0
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

module.exports = mongoose.model('Museum', MuseumSchema); 