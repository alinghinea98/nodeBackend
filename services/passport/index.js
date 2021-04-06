import passport from 'passport'
import { model as userData, roles as userRoles } from '../../api/users/model'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { BasicStrategy } from 'passport-http'
import bcrypt from 'bcryptjs'

export const password = () => (req, res, next) => passport.authenticate('basic', { session: false }, (err, user, msg) => {
  if (err && err.param) {
    return res.status(400).json(err)
  } else if (err || !user) {
    return res.status(401).end()
  }
  req.logIn(user, { session: false }, err => {
    if (err) {
      return res.status(401).end()
    }

    next()
  })
})(req, res, next)
export const token = ({ required, roles = userRoles } = {}) => (req, res, next) => passport.authenticate('token', { session: false }, (err, user) => {
  if (err || (required && !user) || (required && !~roles.indexOf(user.role))) {
    return res.status(401).end()
  }

  req.logIn(user, { session: false }, err => {
    if (err) {
      return res.status(401).end()
    }

    next()
  })
})(req, res, next)

passport.use(new BasicStrategy(async (email, password, done) => {
  const user = await userData.findOne({ username: email.toLowerCase() })
  if (!user) {
    return done(null, false)
  }
  bcrypt.compare(password, user.password, (err, suc) => {
    if (err || !suc) {
      return done(null, false)
    }
    return done(null, user)
  })
}))

passport.use(
  'token',
  new JwtStrategy(
    {
      secretOrKey: 'jwtSecret',
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromUrlQueryParameter('access_token'),
        ExtractJwt.fromBodyField('access_token'),
        ExtractJwt.fromAuthHeaderWithScheme('Bearer')
      ])
    },
    ({ id }, done) => {
      userData.findById(id).populate([{
        path: 'kit',
        model: 'kits',
        populate: {
          path: 'sensorsIds',
          model: 'sensors',
          populate: { path: 'values', model: 'sensorsValues', options: { limit: 5 } }
        }
      }]).exec()
        .then(user => {
          user.view().then(() => {
            done(null, user)
            return null
          })
          return null
        })
        .catch(done)
    }
  )
)

export default passport
