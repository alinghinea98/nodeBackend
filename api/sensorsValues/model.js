import mongoose from '../../services/mongoose'

export const schema =
  {
    create: {
      value: {
        type: String,
        required: true
      }
    },
    query: {
      value: {
        type: String
      }
    }
  }

const entitySchema = new mongoose.Schema(schema.create, {
  timestamps: true,
  collection: 'sensorsValues'
})
// entitySchema.virtual('numMembers', {
//   ref: 'sensors', // The model to use
//   localField: 'sensor', // Find people where `localField`
//   foreignField: 'values' // is equal to `foreignField`
// })
export const model = mongoose.model('sensorsValues', entitySchema)
