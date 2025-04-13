const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['puzzle', 'quiz', 'scavenger', 'memory', 'matching', 'adventure', 'other']
  },
  description: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  timeLimit: {
    type: Number, // in seconds, 0 means no time limit
    default: 0
  },
  image: {
    type: String
  },
  artifactId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artifact'
  },
  timelineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Timeline'
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  rewards: {
    points: {
      type: Number,
      default: 0
    },
    unlockArtifact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artifact'
    },
    unlockTimeline: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Timeline'
    }
  },
  completionCriteria: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
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

module.exports = mongoose.model('Game', GameSchema); 