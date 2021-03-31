import _ from 'lodash'
import mongoose from '../../services/mongoose'

export const roles = ['end-user', 'care-giver', 'admin']

export const schema = {
  create: {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
      trim: true,
      lowercase: true
    },
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minlength: 4
    },
    role: {
      type: String,
      enum: roles,
      default: 'end-user'
    },
    phone: {
      type: String,
      required: true
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    gender: {
      type: String,
      default: 'unknown'
    },
    deleted: {
      type: Boolean,
      default: false
    },
    pin: {
      type: String
    },
    kit: {
      type: mongoose.Types.ObjectId,
      ref: 'kits'
    }
  },
  query: {
    username: {
      type: String,
      unique: true,
      trim: true,
      minlength: 4,
      lowercase: true
    },
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      minlength: 4
    },
    role: {
      type: String,
      enum: roles
    },
    phone: {
      type: String
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    gender: {
      type: String
    },
    deleted: {
      type: Boolean
    },
    pin: {
      type: String
    },
    kit: {
      type: mongoose.Types.ObjectId,
      ref: 'kits'
    }
  },
  update: {
    username: {
      type: String,
      unique: true,
      trim: true,
      minlength: 4,
      lowercase: true
    },
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      minlength: 4
    },
    role: {
      type: String,
      enum: roles
    },
    phone: {
      type: String
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    gender: {
      type: String
    },
    deleted: {
      type: Boolean
    },
    pin: {
      type: String
    },
    kit: {
      type: mongoose.Types.ObjectId,
      ref: 'kits'
    }
  }
}
const entitySchema = new mongoose.Schema(schema.create, {
  timestamps: true,
  collection: 'users'
})
entitySchema.methods._view = function (select, querystring, options = {}) {
  const plainObj = this.toObject({ virtuals: false })

  return new Promise((resolve, reject) => resolve(_.omit(plainObj, 'password')))
}
entitySchema.methods.view = entitySchema.methods._view
export const model = mongoose.model('users', entitySchema)
