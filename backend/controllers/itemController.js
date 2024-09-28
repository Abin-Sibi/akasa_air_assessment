

const addFoodItem = (req,res)=>{
res.send('adding food')
}

const updateItem = (req,res)=>{
    res.send('updating intem')
}

const getAllfood = (req,res)=>{
    res.send('getting all')
}

module.exports = {addFoodItem,updateItem,getAllfood}