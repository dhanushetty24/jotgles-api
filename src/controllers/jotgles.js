const mongoose = require('mongoose');
const Joi = require('joi');

//Create a new jotgle
exports.createJotgle = async (req, res) => {
  try {
    const { title, content } = req.body;

    const schema = Joi.object().keys({
      title: Joi.string()
        .min(5)
        .max(50)
        .required()
        .error(
          new Error(
            'Input must be a string between 5 and 50 characters long, and cannot be empty.'
          )
        ),
      content: Joi.string()
        .max(500)
        .error(
          new Error('Input must be a string less than 500 characters long.')
        ),
    });

    const result = schema.validate({
      title,
      content,
    });

    if (result.error) {
      return res.status(400).send({
        error: result.error.message,
      });
    }

    const JotgleModel = mongoose.model('jotgle');
    const jotgle = new JotgleModel({
      title,
      content,
    });
    await jotgle.save();

    return res.status(201).send({
      jotgle,
      message: 'Jotgle created successfully.',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Internal Server Error.' });
  }
};

//Fetch all jotgles
exports.getJotgles = async (req, res) => {
  try {
    const JotgleModel = mongoose.model('jotgle');
    const data = await JotgleModel.find({}, { title: 1, content: 1 }).lean();
    return res.status(200).send({ data });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Internal Server Error.' });
  }
};

//Fetch a specific jotgles
exports.getAJotgle = async (req, res) => {
  try {
    const { id } = req.params;
    const JotgleModel = mongoose.model('jotgle');
    const data = await JotgleModel.findById(id)
      .select({ title: 1, content: 1 })
      .lean();
    if (!data) {
      return res.status(404).send({ message: 'Jotgle not found' });
    }

    return res.status(200).send({ data });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};

//Update a jotgle
exports.updateJotgle = async (req, res) => {
  try {
    const { title, content } = req.body;

    const { id } = req.params;

    const schema = Joi.object()
      .keys({
        title: Joi.string()
          .min(5)
          .max(50)
          .error(
            new Error(
              'Input must be a string between 5 and 50 characters long.'
            )
          ),
        content: Joi.string()
          .max(500)
          .error(
            new Error('Input must be a string less than 500 characters long.')
          ),
      })
      .or('title', 'content') // Ensures at least one is required.
      .error(
        new Error("At least one of 'title' or 'content' must be provided.")
      );

    const result = schema.validate({
      title,
      content,
    });

    if (result.error) {
      return res.status(400).send({
        error: result.error.message,
      });
    }

    const JotgleModel = mongoose.model('jotgle');

    // Fetch the item to ensure it exists
    const existingItem = await JotgleModel.findById(id)
      .select({ _id: 1 })
      .lean();
    if (!existingItem) {
      return res.status(404).send({ message: 'Jotgle not found.' });
    }

    const updatedData = await mongoose.model('jotgle').findByIdAndUpdate(
      id,
      {
        ...(title ? { title } : {}),
        ...(content ? { content } : {}),
      },
      { new: true }
    );

    return res.status(200).send({
      data: updatedData,
      message: 'Jotgle updated successfully.',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Internal Server Error.' });
  }
};

//Delete a specific jotgles
exports.deleteJotgle = async (req, res) => {
  try {
    const { id } = req.params; // Assuming ID is passed as a route parameter

    const JotgleModel = mongoose.model('jotgle');

    // Check if the item exists
    const existingItem = await JotgleModel.findById(id)
      .select({ _id: 1 })
      .lean();
    if (!existingItem) {
      return res.status(404).send({ message: 'Jotgle not found.' });
    }

    // Delete the item
    await JotgleModel.findByIdAndDelete(id);

    return res.status(200).send({
      message: 'Jotgle deleted successfully.',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Internal Server Error.' });
  }
};
