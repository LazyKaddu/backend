import express from 'express';
import connectDB from '../../db/connect.js';
import FoodPost from '../../models/user.model.js';
import { dummyFoodPosts } from '../../models/dummy.data.js';

connectDB();

const app = express();
app.use(express.json());


app.post('/nearby', async (req, res) => {
    try {
      const { latitude, longitude } = req.body;
  
      if (!latitude || !longitude) {
        return res.status(400).json({ error: "Latitude and Longitude are required." });
      }
  
      // Search for posts within 100km (100000 meters)
      const posts = await FoodPost.find({
        location: {
          $nearSphere: {
            $geometry: {
              type: "Point",
              coordinates: [longitude, latitude]
            },
            $maxDistance: 100000 // 100 km
          }
        },
        isAvailable: true // Only show available posts
      });
  
      res.status(200).json(dummyFoodPosts);
  
    } catch (error) {
      console.error('Error fetching nearby food posts:', error);
      res.status(500).json({ error: "Server Error" });
    }
  });
  app.post('/submit', async (req, res) => {
    try {
      const {
        name,
        description,
        foodType,
        servings,
        foodItems,
        cookedTime,
        bestBefore,
        pickupTime,
        contact,
        phoneNumber,
        landmark,
        location,
        needHelp,
        specialInstructions,
        agreement,
        postedBy,
        expiryTime,
        image,
        isAvailable
      } = req.body;
  
      // Validate required fields
      if (!name || !contact || !location || !postedBy || !expiryTime) {
        return res.status(400).json({ error: "Missing required fields." });
      }
  
      // Create new food post object
      const newFoodPost = new FoodPost({
        name,
        description,
        foodType,
        servings,
        foodItems,
        cookedTime: cookedTime ? new Date(cookedTime) : null,
        bestBefore: bestBefore ? new Date(bestBefore) : null,
        pickupTime,
        phoneNumber: phoneNumber || contact,
        contact,
        landmark,
        location,
        needHelp,
        specialInstructions,
        agreement,
        postedBy,
        expiryTime: new Date(expiryTime),
        image: image, // Assuming `image` is base64 or URL
        isAvailable: isAvailable ?? true
      });
  
      await newFoodPost.save();
  
      res.status(201).json({ message: "Food post submitted successfully!", post: newFoodPost });
  
    } catch (error) {
      console.error('Error submitting food post:', error);
      res.status(500).json({ error: "Server Error" });
    }
  });
  