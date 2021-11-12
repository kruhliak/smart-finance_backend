const { Schema, model } = require("mongoose");
const Joi = require("joi");

const transactionSchema = Schema(
  {
    category: {
      type: String,
      required: [true, "category is required"],
    },
    operation: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "operation is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    value: {
      type: Number,
      required: [true, "value is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    day: {
      type: Number,
    },
    month: {
      type: Number,
    },
    year: {
      type: Number,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  category: Joi.string().required(),
  operation: Joi.string().required(),
  description: Joi.string().required(),
  value: Joi.number().required(),
  date: Joi.string(),
});

const Transaction = model("transaction", transactionSchema);

module.exports = {
  joiSchema,
  Transaction,
};
