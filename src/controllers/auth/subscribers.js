const Subscriber = require('../../models/subscribers');

const createSubscriber = async (req, res) => {
  const { email } = req.body;
  try {
    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      return res.status(400).json({ message: "You have already subscribed." });
    }
    const newSubscriber = new Subscriber({ email });

    await newSubscriber.save();

    res.status(201).json({ message: "You have successfully subscribed!", subscriber: newSubscriber });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createSubscriber };
