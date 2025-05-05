// Example of how to include images directly in JSON
const foodImages = {
  curry: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=", // Replace with your actual base64 string
  cookies: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=", // Replace with your actual base64 string
  pizza: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=" // Replace with your actual base64 string
};

const dummyFoodPost = {
  name: "John Doe",
  description: "Homemade fresh vegetable curry with rice",
  foodType: "Indian Cuisine",
  servings: "4-5",
  foodItems: "Vegetable Curry, Steamed Rice, Naan Bread",
  cookedTime: new Date(), // Current time as cooking time
  bestBefore: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
  pickupTime: "6:00 PM - 8:00 PM",
  contact: "John Doe",
  phoneNumber: "+1234567890",
  landmark: "Near Central Park, Building 7",
  location: {
    type: "Point",
    coordinates: [77.5946, 12.9716] // [longitude, latitude] for example location
  },
  needHelp: false,
  specialInstructions: "Please bring your own containers. Ring doorbell twice.",
  agreement: true,
  postedBy: "john.doe@example.com",
  createdAt: new Date(),
  expiryTime: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours from now
  image: foodImages.curry, // Using the image from our foodImages object
  isAvailable: true
};

// Array of multiple dummy food posts
const dummyFoodPosts = [
  dummyFoodPost,
  {
    name: "Alice Smith",
    description: "Fresh baked chocolate chip cookies",
    foodType: "Dessert",
    servings: "20 pieces",
    foodItems: "Chocolate Chip Cookies",
    cookedTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    bestBefore: new Date(Date.now() + 72 * 60 * 60 * 1000), // 72 hours from now
    pickupTime: "2:00 PM - 4:00 PM",
    contact: "Alice Smith",
    phoneNumber: "+1987654321",
    landmark: "Blue Building, Next to City Library",
    location: {
      type: "Point",
      coordinates: [77.6117, 12.9762]
    },
    needHelp: true,
    specialInstructions: "Please call before coming",
    agreement: true,
    postedBy: "alice.smith@example.com",
    createdAt: new Date(),
    expiryTime: new Date(Date.now() + 96 * 60 * 60 * 1000), // 96 hours from now
    image: foodImages.cookies, // Using the image from our foodImages object
    isAvailable: true
  },
  {
    name: "Bob Wilson",
    description: "Homemade Pizza",
    foodType: "Italian",
    servings: "8 slices",
    foodItems: "Margherita Pizza with extra cheese",
    cookedTime: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    bestBefore: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
    pickupTime: "7:00 PM - 9:00 PM",
    contact: "Bob Wilson",
    phoneNumber: "+1122334455",
    landmark: "Red Apartment Complex, Gate 3",
    location: {
      type: "Point",
      coordinates: [77.6412, 12.9279]
    },
    needHelp: false,
    specialInstructions: "Parking available in front",
    agreement: true,
    postedBy: "bob.wilson@example.com",
    createdAt: new Date(),
    expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    image: foodImages.pizza, // Using the image from our foodImages object
    isAvailable: true
  }
];

export { dummyFoodPost, dummyFoodPosts }; 