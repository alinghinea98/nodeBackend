import mongoose from '../../services/mongoose'

export const schema =
  {
    create: {
      sensorsIds: [{
        type: mongoose.Types.ObjectId,
        ref: 'sensors'
      }]
    },
    query: {
      sensorsIds: [{
        type: mongoose.Types.ObjectId,
        ref: 'sensors'
      }]
    }
  }

const entitySchema = new mongoose.Schema(schema.create, {
  timestamps: true,
  collection: 'kits',
  toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  toObject: { virtuals: true }
})

export const model = mongoose.model('kits', entitySchema)
