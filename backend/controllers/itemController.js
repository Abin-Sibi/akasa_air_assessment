const FoodItem = require('../models/foodItemModel');

// Function to add a new food item
const addFoodItem = async (req, res) => {
  const { foodName, price, description, category, stock } = req.body;
  console.log('helll',req.body)

  // Validate required fields
  if (!foodName || !price || !description || !category || !stock) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Create a new food item
    const newFoodItem = new FoodItem({
      foodName,
      price,
      description,
      category,
      stock,
    });

    // Save the food item to the database
    await newFoodItem.save();
    
    res.status(201).json({ message: 'Food item added successfully', foodItem: newFoodItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


const updateItem = (req,res)=>{
    res.send('updating intem')
}

const getAllfood = async (req, res) => {
    try {
      const foodItems = await FoodItem.find(); // Fetch all food items from the database
      res.status(200).json(foodItems); // Send back the food items as JSON
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

module.exports = {addFoodItem,updateItem,getAllfood}