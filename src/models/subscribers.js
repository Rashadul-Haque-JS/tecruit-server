const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, 
    trim: true, 
    lowercase: true, 
    validate: {
      validator: function(v) {
        // Simple regex for email validation
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  
  subscribedAt: {
    type: Date,
    default: Date.now 
  }
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);
module.exports = Subscriber;
