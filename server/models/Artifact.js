const mongoose = require('mongoose');

const ArtifactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  era: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number
  },
  origin: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['pottery', 'weapon', 'jewelry', 'document', 'sculpture', 'painting', 'clothing', 'tool', 'other']
  },
  images: [{
    type: String,
    required: true
  }],
  model3D: {
    type: String
  },
  historicalSignificance: {
    type: String,
    required: true
  },
  stories: [{
    title: String,
    content: String,
    image: String
  }],
  timelineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Timeline',
    required: true
  },
  relatedArtifacts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artifact'
  }],
  minigames: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  }],
  educationalContent: {
    facts: [String],
    quizzes: [{
      question: String,
      options: [String],
      correctAnswer: Number
    }]
  },
  isUnlocked: {
    type: Boolean,
    default: false
  },
  pointsToUnlock: {
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

module.exports = mongoose.model('Artifact', ArtifactSchema); 