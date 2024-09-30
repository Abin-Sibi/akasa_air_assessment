const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {type:String,required:true},
    email: { type: String, unique: true },
    password: {type:String,required:true},
    cart: [
        {
          productId: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem' },
          foodName: String,
          quantity: Number,
          price: Number,
          image:String,
          addedAt: { type: Date, default: Date.now }
        }
      ],
      orders: [
        {
          orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
          total: Number,
          createdAt: { type: Date, default: Date.now },
          items: [
            {
              productId: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem' },
              foodName: String,
              quantity: Number,
              price: Number
            }
          ]
        }
      ]
})

module.exports = mongoose.model('User', userSchema);