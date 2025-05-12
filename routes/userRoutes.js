import express from 'express';
import FoodPost from '../models/items.model.js';
import recommendForUser from '../utils/recomendation.js';
import { sendWhatsAppMessage } from '../utils/msg.js';
const router = express.Router();


// GET all users
router.post('/nearby', async (req, res) => {
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

    res.status(200).json(posts);

  } catch (error) {
    console.error('Error fetching nearby food posts:', error);
    res.status(500).json({ error: "Server Error" });
  }
});
router.post('/submit', async (req, res) => {
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
    console.log(req.body);
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
      image: image, 
      isAvailable: isAvailable ?? true
    });
    console.log(newFoodPost);
    await newFoodPost.save();
    console.log("Food post saved:", newFoodPost._id);

    res.status(201).json({ message: "Food post submitted successfully!", post: newFoodPost });

  } catch (error) {
    console.error('Error submitting food post:', error);
    res.status(500).json({ error: "Server Error" });
  }
});

router.post('/voluntere', async (req, res) =>{
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
      needHelp: true  // Only show voluntere posts
    });

    res.status(200).json(posts);

  } catch (error) {
    console.error('Error fetching nearby food posts:', error);
    res.status(500).json({ error: "Server Error" });
  }
})


router.post('/changeStatus', async (req, res) => {
  try {
    const { id, user } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Food post ID is required' });
    }

    const updatedPost = await FoodPost.findByIdAndUpdate(
      id,
      { isVoluntered: true },
      { new: true }
    );

    sendWhatsAppMessage(`your food is being voluntered by ${user.name} by the contact detail ${user.phoneNumber}`, updatedPost.contact);

    if (!updatedPost) {
      return res.status(404).json({ error: 'Food post not found' });
    }

    res.status(200).json({
      message: 'Status updated successfully',
      data: updatedPost
    });

  } catch (error) {
    console.error('Error changing status:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;