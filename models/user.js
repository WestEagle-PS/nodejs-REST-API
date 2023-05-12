const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const subscriptionList = ['starter', 'pro', 'business'];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.post('save', handleMongooseError);

const userRegisterSchema = Joi.object({
  email: Joi.string().required().messages({
    'any.required': `missing required field "email"`,
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': `missing required field "password"`,
  }),
  subscription: Joi.string().valid(...subscriptionList),
});

const userLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid(...subscriptionList),
});

const userSubscriptionUpdateSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});

// const userSubscriptionUpdateSchema = Joi.object({
//   subscription: Joi.string()
//     .valid(...subscriptionList)
//     .required(),
// });

const schemas = {
  userRegisterSchema,
  userLoginSchema,
  userSubscriptionUpdateSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
