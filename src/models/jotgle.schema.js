const mongoose = require('mongoose');
const { Schema } = mongoose;

const jotgleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: String,
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

exports.default = mongoose.model('jotgle', jotgleSchema);
