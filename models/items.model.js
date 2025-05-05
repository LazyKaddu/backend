import mongoose from 'mongoose';

const FoodPostSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  foodType: {
    type: String,
    required: true,
    trim: true
  },
  servings: {
    type: String,
    required: true
  },
  foodItems: {
    type: String,
    required: true,
    trim: true
  },
  cookedTime: {
    type: Date,
    required: true
  },
  bestBefore: {
    type: Date,
    required: true
  },
  pickupTime: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  landmark: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  needHelp: {
    type: Boolean,
    default: false
  },
  specialInstructions: {
    type: String,
    trim: true
  },
  agreement: {
    type: Boolean,
    default: false
  },
  postedBy: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiryTime: {
    type: Date,
    required: true,
    index: { expireAfterSeconds: 48*60*60 } // TTL Index
  },
  image: {
    type: String, // Will store base64 string
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
});

// Create 2dsphere index for location search
FoodPostSchema.index({ location: '2dsphere' });

const FoodPost = mongoose.model('FoodPost', FoodPostSchema);

export default FoodPost;
