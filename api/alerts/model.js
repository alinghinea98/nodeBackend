import _ from 'lodash'
import mongoose from '../../services/mongoose'

export const roles = ['end-user', 'care-giver', 'admin']

export const schema = {
  create: {
    description: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    sensorValue: {
      type: String,
      required: true
    },
    seen: {
      type: Boolean,
      default: false
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'users'
    }
  },
  query: {
    description: {
      type: String,
      trim: true,
      lowercase: true
    },
    sensorValue: {
      type: String
    },
    seen: {
      type: Boolean
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'users'
    }
  },
  update: {
    description: {
      type: String,
      trim: true,
      lowercase: true
    },
    sensorValue: {
      type: String
    },
    seen: {
      type: Boolean
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'users'
    }
  }
}
const entitySchema = new mongoose.Schema(schema.create, {
  timestamps: true,
  collection: 'alerts',
  toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  toObject: { virtuals: true }
})

export const model = mongoose.model('alerts', entitySchema)
