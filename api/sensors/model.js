import mongoose from '../../services/mongoose'

export const schema =
  {
    create: {
      name: {
        type: String,
        required: true
      },
      type: { type: String, required: true },
      values: [{
        type: mongoose.Types.ObjectId,
        ref: 'sensorsValues'
      }]
    },
    query: {
      name: {
        type: String
      },
      type: { type: String },
      values: [{
        type: mongoose.Types.ObjectId,
        ref: 'sensorsValues'
      }]
    }
  }

const entitySchema = new mongoose.Schema(schema.create, {
  timestamps: true,
  collection: 'sensors'
})

export const model = mongoose.model('sensors', entitySchema)
